import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router';
import Home from './Home';
import Footer from './components/Footer';
import Admin from './Admin';
import CreateNFT from './CreateNFT';
import { AuthClient } from '@dfinity/auth-client';
import { createActor } from 'declarations/landranger_backend';
import { canisterId } from 'declarations/landranger_backend/index.js';
import { HttpAgent } from '@dfinity/agent';
import NotFound from './NotFound';
import Alert from './components/Alert';

const shortenPrincipal = (principalId) => {
  if (!principalId) return '';

  const parts = principalId.split('-');
  if (parts.length < 5) return principalId; // If not standard format

  return `${parts[0]}-${parts[1]}...${parts[parts.length - 2]}-${
    parts[parts.length - 1]
  }`;
};

const network = process.env.DFX_NETWORK;
const identityProvider =
  network === 'ic'
    ? 'https://identity.ic0.app' // Mainnet
    : 'http://rdmx6-jaaaa-aaaaa-aaadq-cai.localhost:4943'; // Local

function App() {
  // Alert
  const [alerts, setAlerts] = useState([]);
  // auth
  const [state, setState] = useState({
    actor: undefined,
    authClient: undefined,
    isAuthenticated: false,
    principal: 'Click "Whoami" to see your principal ID',
  });
  const [principal, setPrincipal] = useState('');

  const navigate = useNavigate();

  const addAlert = (type, message) => {
    const id = Date.now();
    setAlerts((prev) => [...prev, { id, type, message }]);
  };

  const removeAlert = (id) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
  };

  // Initialize auth client
  useEffect(() => {
    updateActor();
  }, []);

  const updateActor = async () => {
    try {
      const authClient = await AuthClient.create();
      const identity = authClient.getIdentity();
      setPrincipal(authClient.getIdentity().getPrincipal().toString());

      const host =
        process.env.DFX_NETWORK === 'ic'
          ? 'https://ic0.app'
          : 'http://localhost:4943';

      // Buat agent dengan host yang eksplisit
      const agent = new HttpAgent({
        identity,
        host,
      });

      // Fetch root key di environment lokal
      if (process.env.DFX_NETWORK !== 'ic') {
        console.log('Fetching root key in App component');
        try {
          await agent.fetchRootKey();
          console.log('Root key fetched successfully in App');
        } catch (error) {
          console.error('Error fetching root key in App:', error);
        }
      }

      // Gunakan canisterId yang hardcoded sebagai fallback
      const backendCanisterId = canisterId || 'bkyz2-fmaaa-aaaaa-qaaaq-cai';
      console.log('Using canister ID:', backendCanisterId);

      const actor = createActor(backendCanisterId, {
        agent,
      });

      const isAuthenticated = await authClient.isAuthenticated();
      console.log('Authentication status:', isAuthenticated);

      setState((prev) => ({
        ...prev,
        actor,
        authClient,
        isAuthenticated,
      }));
    } catch (error) {
      console.error('Error in updateActor:', error);
    }
  };

  const login = async () => {
    try {
      await state.authClient.login({
        identityProvider,
        onSuccess: updateActor,
      });
      addAlert('success', 'Logged in successfully!');
    } catch (error) {
      addAlert('error', `Login failed: ${error.message}`);
    }
  };

  const logout = async () => {
    await state.authClient.logout();
    updateActor();
    addAlert('success', 'Logout successfully!');
    navigate('/');
  };

  return (
    <div data-theme="cerah">
      <header className="navbar shadow-sm fixed top-0 bg-white/20 backdrop-blur z-50">
        <div className="navbar-start">
          <a className="btn btn-ghost text-2xl font-bold">
            Land<span className="text-purple-600 -ml-2">Ranger</span>
          </a>
        </div>
        <div className="navbar-end">
          {!state.isAuthenticated ? (
            <button onClick={login} className="btn btn-primary">
              Login with Internet Identity
            </button>
          ) : (
            <div className="flex gap-2 items-center">
              <a href="/admin" className="btn btn-primary btn-sm ">
                Dashboard
              </a>
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS Navbar component"
                      src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                >
                  <li
                    className="py-4 tooltip md:tooltip-left"
                    data-tip={principal}
                  >
                    {shortenPrincipal(principal)}
                  </li>
                  <li>
                    <button onClick={logout} className="btn btn-primary">
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </header>
      <main className="pt-16">
        <Routes>
          {!state.isAuthenticated ? (
            <>
              <Route index element={<Home onLogin={login} />} />
              <Route path="/admin" element={<NotFound />} />
              <Route path="/admin/create-nft" element={<NotFound />} />
            </>
          ) : (
            <>
              <Route index element={<Home />} />
              <Route path="/admin" element={<Admin actor={state.actor} />} />
              <Route
                path="/admin/create-nft"
                element={<CreateNFT addAlert={addAlert} />}
              />
            </>
          )}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />

      <div className="fixed top-18 right-4 z-50 space-y-2">
        {alerts.map((alert) => (
          <Alert
            key={alert.id}
            type={alert.type}
            message={alert.message}
            onClose={() => removeAlert(alert.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
