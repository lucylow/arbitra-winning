import { useState, useEffect, useCallback } from 'react';
import { Principal } from '@dfinity/principal';
import { isAuthenticated, login, logout, getPrincipal, loginWithInternetIdentity, loginWithPlug, isPlugWalletAvailable } from './services/agent';
import { disputeService } from './services/disputeService';
import type { Dispute } from './types';
import './App.css';

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [principal, setPrincipal] = useState<Principal | null>(null);
  const [disputes, setDisputes] = useState<Dispute[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'home' | 'disputes' | 'create'>('home');

  // Form state for creating dispute
  const [newDispute, setNewDispute] = useState({
    respondent: '',
    title: '',
    description: '',
    amount: '',
  });

  const checkAuth = useCallback(async () => {
    try {
      const auth = await isAuthenticated();
      setAuthenticated(auth);
      
      if (auth) {
        const p = await getPrincipal();
        setPrincipal(p);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Check auth on mount and also check if we're returning from Internet Identity
    checkAuth();
    
    // Listen for window focus (e.g., after redirect from Internet Identity)
    const handleFocus = () => {
      checkAuth();
    };
    
    // Also listen for hash changes (some redirects use hash)
    const handleHashChange = () => {
      checkAuth();
    };
    
    window.addEventListener('focus', handleFocus);
    window.addEventListener('hashchange', handleHashChange);
    
    return () => {
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [checkAuth]);

  useEffect(() => {
    if (authenticated) {
      loadDisputes();
    }
  }, [authenticated]);

  const handleLogin = async (authType: 'internet-identity' | 'plug' = 'internet-identity') => {
    try {
      if (authType === 'plug') {
        await loginWithPlug();
        await checkAuth();
      } else {
        // For Internet Identity, the login will redirect to Internet Identity
        // After successful auth, it will redirect back and we'll check auth status
        await loginWithInternetIdentity();
        // After login promise resolves, check auth status
        // If we're still here, the redirect should have happened
        setTimeout(async () => {
          await checkAuth();
        }, 500);
      }
    } catch (error) {
      console.error('Login failed:', error);
      const errorMessage = error instanceof Error ? error.message : 'Login failed. Please try again.';
      alert(errorMessage);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const loadDisputes = async () => {
    try {
      const allDisputes = await disputeService.getAllDisputes();
      setDisputes(allDisputes);
    } catch (error) {
      console.error('Failed to load disputes:', error);
    }
  };

  const handleCreateDispute = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const respondentPrincipal = Principal.fromText(newDispute.respondent);
      const amount = BigInt(newDispute.amount);
      
      const disputeId = await disputeService.createDispute(
        respondentPrincipal,
        newDispute.title,
        newDispute.description,
        amount
      );
      
      alert(`Dispute created successfully! ID: ${disputeId}`);
      setNewDispute({ respondent: '', title: '', description: '', amount: '' });
      setActiveTab('disputes');
      await loadDisputes();
    } catch (error) {
      console.error('Failed to create dispute:', error);
      alert('Failed to create dispute. Please check your inputs.');
    }
  };

  const formatDate = (timestamp: bigint) => {
    const date = new Date(Number(timestamp) / 1000000);
    return date.toLocaleDateString();
  };

  const formatPrincipal = (p: Principal) => {
    const text = p.toString();
    return text.length > 20 ? `${text.slice(0, 10)}...${text.slice(-8)}` : text;
  };

  if (loading) {
    return (
      <div className="app">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  if (!authenticated) {
    const plugAvailable = isPlugWalletAvailable();
    
    return (
      <div className="app">
        <div className="login-container">
          <div className="logo">
            <h1>⚖️ Arbitra</h1>
            <p>Decentralized Legal Dispute Resolution</p>
          </div>
          <div className="login-card">
            <h2>Welcome to Arbitra</h2>
            <p>A blockchain-based platform for fair and transparent dispute resolution powered by Internet Computer Protocol.</p>
            <div className="login-buttons">
              <button 
                onClick={() => handleLogin('internet-identity')} 
                className="btn-primary"
              >
                Login with Internet Identity
              </button>
              {plugAvailable ? (
                <button 
                  onClick={() => handleLogin('plug')} 
                  className="btn-primary btn-plug"
                >
                  Login with Plug Wallet
                </button>
              ) : (
                <a 
                  href="https://plugwallet.ooo/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-secondary btn-plug-install"
                >
                  Install Plug Wallet
                </a>
              )}
            </div>
          </div>
          <div className="features">
            <div className="feature">
              <h3>🔒 Secure</h3>
              <p>Evidence stored on-chain with cryptographic verification</p>
            </div>
            <div className="feature">
              <h3>🤖 AI-Powered</h3>
              <p>Intelligent analysis to support arbitration decisions</p>
            </div>
            <div className="feature">
              <h3>₿ Bitcoin Escrow</h3>
              <p>Automated fund management with ICP Bitcoin integration</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <h1>⚖️ Arbitra</h1>
          <div className="user-info">
            <span className="principal">{principal && formatPrincipal(principal)}</span>
            <button onClick={handleLogout} className="btn-secondary">Logout</button>
          </div>
        </div>
        <nav className="nav">
          <button 
            className={activeTab === 'home' ? 'active' : ''} 
            onClick={() => setActiveTab('home')}
          >
            Home
          </button>
          <button 
            className={activeTab === 'disputes' ? 'active' : ''} 
            onClick={() => setActiveTab('disputes')}
          >
            All Disputes
          </button>
          <button 
            className={activeTab === 'create' ? 'active' : ''} 
            onClick={() => setActiveTab('create')}
          >
            Create Dispute
          </button>
        </nav>
      </header>

      <main className="main">
        {activeTab === 'home' && (
          <div className="home">
            <h2>Dashboard</h2>
            <div className="stats">
              <div className="stat-card">
                <h3>{disputes.length}</h3>
                <p>Total Disputes</p>
              </div>
              <div className="stat-card">
                <h3>{disputes.filter(d => d.status === 'Pending').length}</h3>
                <p>Pending</p>
              </div>
              <div className="stat-card">
                <h3>{disputes.filter(d => d.status === 'Decided').length}</h3>
                <p>Decided</p>
              </div>
            </div>
            <div className="welcome-text">
              <h3>Welcome to Arbitra</h3>
              <p>
                Arbitra is a decentralized dispute resolution platform built on the Internet Computer Protocol.
                Create disputes, submit evidence, and let qualified arbitrators make fair decisions backed by
                AI analysis and secured by Bitcoin escrow.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'disputes' && (
          <div className="disputes">
            <h2>All Disputes</h2>
            {disputes.length === 0 ? (
              <p className="empty-state">No disputes found. Create your first dispute to get started.</p>
            ) : (
              <div className="dispute-list">
                {disputes.map(dispute => (
                  <div key={dispute.id} className="dispute-card">
                    <div className="dispute-header">
                      <h3>{dispute.title}</h3>
                      <span className={`status status-${dispute.status.toLowerCase()}`}>
                        {dispute.status}
                      </span>
                    </div>
                    <p className="dispute-description">{dispute.description}</p>
                    <div className="dispute-meta">
                      <div>
                        <strong>ID:</strong> {dispute.id}
                      </div>
                      <div>
                        <strong>Amount:</strong> {dispute.amount.toString()} sats
                      </div>
                      <div>
                        <strong>Created:</strong> {formatDate(dispute.createdAt)}
                      </div>
                    </div>
                    <div className="dispute-parties">
                      <div>
                        <strong>Claimant:</strong> {formatPrincipal(dispute.claimant)}
                      </div>
                      <div>
                        <strong>Respondent:</strong> {formatPrincipal(dispute.respondent)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'create' && (
          <div className="create-dispute">
            <h2>Create New Dispute</h2>
            <form onSubmit={handleCreateDispute} className="dispute-form">
              <div className="form-group">
                <label htmlFor="title">Dispute Title</label>
                <input
                  id="title"
                  type="text"
                  value={newDispute.title}
                  onChange={(e) => setNewDispute({ ...newDispute, title: e.target.value })}
                  placeholder="e.g., Payment dispute for services rendered"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  value={newDispute.description}
                  onChange={(e) => setNewDispute({ ...newDispute, description: e.target.value })}
                  placeholder="Provide detailed information about the dispute..."
                  rows={5}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="respondent">Respondent Principal ID</label>
                <input
                  id="respondent"
                  type="text"
                  value={newDispute.respondent}
                  onChange={(e) => setNewDispute({ ...newDispute, respondent: e.target.value })}
                  placeholder="Enter the respondent's principal ID"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="amount">Amount (in satoshis)</label>
                <input
                  id="amount"
                  type="number"
                  value={newDispute.amount}
                  onChange={(e) => setNewDispute({ ...newDispute, amount: e.target.value })}
                  placeholder="e.g., 100000"
                  min="0"
                  required
                />
              </div>

              <button type="submit" className="btn-primary">Create Dispute</button>
            </form>
          </div>
        )}
      </main>

      <footer className="footer">
        <p>Arbitra - Built on Internet Computer Protocol | LegalHack 2025</p>
      </footer>
    </div>
  );
}

export default App;
