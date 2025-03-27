import React, { useState, useEffect } from 'react';
import { Routes, Route, Router } from 'react-router';
import './App.css';
import Home from './Home';
import Footer from './components/Footer';
import Admin from './Admin';
import CreateNFT from './CreateNFT';
import { AuthClient } from '@dfinity/auth-client';
import { createActor } from 'declarations/landranger_backend';
import { canisterId } from 'declarations/landranger_backend/index.js';
import { IconBurger } from '@tabler/icons-react';

const network = process.env.DFX_NETWORK;
const identityProvider =
  network === 'local'
    ? 'https://identity.ic0.app' // Mainnet
    : 'http://bd3sg-teaaa-aaaaa-qaaba-cai.localhost:4943'; // Local
function App() {
  const [state, setState] = useState({
    actor: undefined,
    authClient: undefined,
    isAuthenticated: false,
    principal: 'Click "Whoami" to see your principal ID',
  });

  // Initialize auth client
  useEffect(() => {
    updateActor();
  }, []);

  const updateActor = async () => {
    const authClient = await AuthClient.create();
    const identity = authClient.getIdentity();
    const actor = createActor(canisterId, {
      agentOptions: {
        identity,
      },
    });
    const isAuthenticated = await authClient.isAuthenticated();

    setState((prev) => ({
      ...prev,
      actor,
      authClient,
      isAuthenticated,
    }));
  };

  const login = async () => {
    await state.authClient.login({
      identityProvider,
      onSuccess: updateActor,
    });
  };

  const logout = async () => {
    await state.authClient.logout();
    updateActor();
  };

  return (
    <div data-theme="cerah">
      {/* {state.principal && (
        <div>
          <h2>Your principal ID is:</h2>
          <h4>{state.principal}</h4>
        </div>
      )} */}
      <header className="navbar shadow-sm fixed top-0 bg-white/20 backdrop-blur z-50">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <IconBurger className="size-5" />
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {state.isAuthenticated && (
                <li>
                  <a href="/admin">Admin</a>
                </li>
              )}
            </ul>
          </div>
          <a className="btn btn-ghost text-2xl font-bold">
            Land<span className="text-purple-600 -ml-2">Ranger</span>
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {state.isAuthenticated && (
              <li>
                <a href="/admin">Admin</a>
              </li>
            )}
          </ul>
        </div>
        <div className="navbar-end">
          {!state.isAuthenticated ? (
            <button onClick={login} className="btn btn-primary">
              Login with Internet Identity
            </button>
          ) : (
            <button onClick={logout} className="btn btn-primary">
              Logout
            </button>
          )}
        </div>
      </header>
      <main className="pt-16">
        <Routes>
          {!state.isAuthenticated ? (
            <Route index element={<Home />} />
          ) : (
            <>
              <Route index element={<Home />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/admin/create-nft" element={<CreateNFT />} />
            </>
          )}
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
