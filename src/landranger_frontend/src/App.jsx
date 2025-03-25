import React, { useState, useEffect } from 'react';
import { AuthClient } from '@dfinity/auth-client';
import { createActor } from '../../declarations/landranger_backend';
import { canisterId } from '../../declarations/landranger_backend/index.js';

import './App.css';
import Home from './Home';
import { Navbar } from './components/Navbar';
import Footer from './components/Footer';
import Admin from './Admin';
import CreateNFT from './CreateNFT';

const network = process.env.DFX_NETWORK;
const identityProvider =
  network === 'ic'
    ? 'https://identity.ic0.app' // Mainnet
    : 'http://be2us-64aaa-aaaaa-qaabq-cai.localhost:4943'; // Local

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

  // const whoami = async () => {
  //   setState((prev) => ({
  //     ...prev,
  //     principal: 'Loading...',
  //   }));

  //   const result = await state.actor.whoami();
  //   const principal = result.toString();
  //   setState((prev) => ({
  //     ...prev,
  //     principal,
  //   }));
  // };
  return (
    <div data-theme="cerah">
      {/* <Navbar /> */}
      {!state.isAuthenticated ? (
        <button onClick={login}>Login with Internet Identity</button>
      ) : (
        <button onClick={logout}>Logout</button>
      )}

      {/* <button onClick={whoami}>Whoami</button> */}

      {state.principal && (
        <div>
          <h2>Your principal ID is:</h2>
          <h4>{state.principal}</h4>
        </div>
      )}
      <main className="pt-16">
        <Routes>
          <Route index element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/create-nft" element={<CreateNFT />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
