import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { PAGES, NAV_ITEMS, FEATURES } from './constants';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState(PAGES.HOME);
  const [account, setAccount] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Wallet connection (simplified)
  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });
        setAccount(accounts[0]);
        setIsConnected(true);
      } else {
        // Demo mode
        setAccount('0xd8da6bf...6c7e');
        setIsConnected(true);
      }
    } catch (error) {
      console.error('Connection failed:', error);
    }
  };

  // Render current page
  const renderPage = () => {
    switch (currentPage) {
      case PAGES.FEATURES:
        return <FeaturesPage />;
      case PAGES.DOCS:
        return <DocsPage />;
      case PAGES.CONTACT:
        return <ContactPage />;
      default:
        return <HomePage />;
    }
  };

// App.jsx mein HomePage component ko replace karo
const HomePage = () => {
  const [shadowAccounts, setShadowAccounts] = useState([
    {
      id: 'shadow-1',
      address: '0x7a3b...c89d',
      limit: '50 USDC',
      status: 'Active',
      created: '2 hours ago'
    }
  ]);
  const [loading, setLoading] = useState(false);

  // Create Shadow Account Function
  const createShadowAccount = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newAccount = {
        id: `shadow-${Date.now()}`,
        address: `0x${Math.random().toString(16).substr(2, 8)}...${Math.random().toString(16).substr(2, 4)}`,
        limit: `${Math.floor(Math.random() * 100) + 10} USDC`,
        status: 'Active',
        created: 'Just now'
      };
      
      setShadowAccounts(prev => [newAccount, ...prev]);
      
      alert(`🎉 Shadow Account Created!\n\n📍 Address: ${newAccount.address}\n💳 Limit: ${newAccount.limit}\n🔄 Status: ${newAccount.status}`);
      
    } catch (error) {
      alert('❌ Failed to create account: ' + error.message);
    }
    setLoading(false);
  };

  // Send Transaction Function
  const sendTransaction = async (accountId) => {
    try {
      alert(`🚀 Transaction Initiated!\n\nFrom: ${accountId}\nAmount: 0.1 ETH\n\nThis would be a gasless private transaction on Arc Network`);
    } catch (error) {
      alert('Transaction failed: ' + error.message);
    }
  };

  return (
    <div className="home-page">
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Privacy-First
            <span className="gradient-text"> Blockchain Experience</span>
          </h1>
          <p className="hero-subtitle">
            Create invisible accounts, send gasless transactions, and experience complete privacy 
            on the blockchain with Arc IAN.
          </p>
          <div className="hero-actions">
            {!isConnected ? (
              <button className="cta-button primary" onClick={connectWallet}>
                🚀 Connect Wallet to Start
              </button>
            ) : (
              <div className="connected-actions">
                <button 
                  className="cta-button primary" 
                  onClick={createShadowAccount}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <div className="spinner"></div>
                      Creating...
                    </>
                  ) : (
                    '🕵️ Create Shadow Account'
                  )}
                </button>
                <button className="cta-button success">
                  ✅ Connected: {account.slice(0, 8)}...
                </button>
              </div>
            )}
            <button className="cta-button secondary" onClick={() => setCurrentPage(PAGES.FEATURES)}>
              📖 Learn More
            </button>
          </div>

          {/* Quick Actions Section - Only show when connected */}
          {isConnected && (
            <div className="quick-actions-section">
              <h3>Quick Actions</h3>
              <div className="quick-actions-grid">
                <button 
                  className="action-card"
                  onClick={createShadowAccount}
                  disabled={loading}
                >
                  <div className="action-icon">✨</div>
                  <h4>Create Account</h4>
                  <p>Generate new invisible account</p>
                </button>
                
                <button 
                  className="action-card"
                  onClick={() => sendTransaction('shadow-account')}
                >
                  <div className="action-icon">💸</div>
                  <h4>Send Transaction</h4>
                  <p>Gasless private transfer</p>
                </button>
                
                <button className="action-card">
                  <div className="action-icon">👥</div>
                  <h4>Create Circle</h4>
                  <p>Shared spending group</p>
                </button>
                
                <button className="action-card">
                  <div className="action-icon">📊</div>
                  <h4>View Analytics</h4>
                  <p>Privacy metrics</p>
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="hero-visual">
          <div className="floating-cards">
            <div className="card floating-1">
              <div className="card-icon">🕵️</div>
              <h3>Invisible</h3>
              <p>Untraceable accounts</p>
            </div>
            <div className="card floating-2">
              <div className="card-icon">⚡</div>
              <h3>Gasless</h3>
              <p>Zero fees</p>
            </div>
            <div className="card floating-3">
              <div className="card-icon">🔒</div>
              <h3>Secure</h3>
              <p>Military grade</p>
            </div>
          </div>
        </div>
      </div>

      {/* Active Accounts Section - Only show when connected */}
      {isConnected && shadowAccounts.length > 0 && (
        <div className="accounts-section">
          <div className="container">
            <div className="section-header">
              <h2>Your Shadow Accounts</h2>
              <span className="account-count">{shadowAccounts.length} active</span>
            </div>
            
            <div className="accounts-grid">
              {shadowAccounts.map(account => (
                <div key={account.id} className="account-card">
                  <div className="account-header">
                    <div className="account-info">
                      <h4>{account.id}</h4>
                      <span className={`status-badge ${account.status.toLowerCase()}`}>
                        {account.status}
                      </span>
                    </div>
                    <div className="account-meta">
                      Created {account.created}
                    </div>
                  </div>
                  
                  <div className="account-details">
                    <div className="detail-item">
                      <span className="label">Address:</span>
                      <span className="value">{account.address}</span>
                    </div>
                    <div className="detail-item">
                      <span className="label">Spending Limit:</span>
                      <span className="value highlight">{account.limit}</span>
                    </div>
                  </div>
                  
                  <div className="account-actions">
                    <button 
                      className="btn-primary"
                      onClick={() => sendTransaction(account.id)}
                    >
                      Send Transaction
                    </button>
                    <button className="btn-secondary">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat">
              <div className="stat-number">10K+</div>
              <div className="stat-label">Active Users</div>
            </div>
            <div className="stat">
              <div className="stat-number">50K+</div>
              <div className="stat-label">Transactions</div>
            </div>
            <div className="stat">
              <div className="stat-number">99.9%</div>
              <div className="stat-label">Uptime</div>
            </div>
            <div className="stat">
              <div className="stat-number">$0</div>
              <div className="stat-label">Gas Fees</div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Preview */}
      <div className="features-preview">
        <div className="container">
          <div className="section-header">
            <h2>Why Choose Arc IAN?</h2>
            <p>Experience the future of private blockchain transactions</p>
          </div>
          
          <div className="features-grid-mini">
            <div className="feature-mini">
              <div className="feature-icon">🔒</div>
              <h4>Complete Anonymity</h4>
              <p>No links between your main wallet and transactions</p>
            </div>
            <div className="feature-mini">
              <div className="feature-icon">⚡</div>
              <h4>Gasless Operations</h4>
              <p>Zero gas fees with our sponsor network</p>
            </div>
            <div className="feature-mini">
              <div className="feature-icon">🔄</div>
              <h4>Auto-Rotation</h4>
              <p>Accounts change automatically for maximum privacy</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

  // Features Page Component
  const FeaturesPage = () => (
    <div className="features-page">
      <div className="page-header">
        <h1>Powerful Features</h1>
        <p>Everything you need for private blockchain interactions</p>
      </div>
      
      <div className="features-grid">
        {FEATURES.map((feature, index) => (
          <div key={index} className="feature-card">
            <div className="feature-icon">{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
            <button className="feature-button">Learn More →</button>
          </div>
        ))}
      </div>
    </div>
  );

  // Documentation Page Component
  const DocsPage = () => (
    <div className="docs-page">
      <div className="page-header">
        <h1>Documentation</h1>
        <p>Learn how to use Arc IAN for maximum privacy</p>
      </div>
      
      <div className="docs-content">
        <div className="docs-sidebar">
          <h3>Quick Start</h3>
          <ul>
            <li>Getting Started</li>
            <li>Wallet Connection</li>
            <li>First Shadow Account</li>
            <li>Gasless Transactions</li>
          </ul>
          
          <h3>Advanced</h3>
          <ul>
            <li>API Reference</li>
            <li>Smart Contracts</li>
            <li>Security Best Practices</li>
            <li>Troubleshooting</li>
          </ul>
        </div>
        
        <div className="docs-main">
          <div className="doc-section">
            <h2>Getting Started with Arc IAN</h2>
            <p>Welcome to Arc Invisible Account Network! Follow these simple steps to start using private, gasless transactions.</p>
            
            <div className="step">
              <h3>Step 1: Connect Your Wallet</h3>
              <p>Click the "Connect Wallet" button and authorize the connection in your wallet provider.</p>
            </div>
            
            <div className="step">
              <h3>Step 2: Create Shadow Account</h3>
              <p>Generate your first invisible account with custom spending limits and duration.</p>
            </div>
            
            <div className="step">
              <h3>Step 3: Start Transacting</h3>
              <p>Send transactions through your shadow accounts - completely private and gasless!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Contact Page Component
  const ContactPage = () => (
    <div className="contact-page">
      <div className="page-header">
        <h1>Get In Touch</h1>
        <p>We'd love to hear from you about your privacy needs</p>
      </div>
      
      <div className="contact-content">
        <div className="contact-info">
          <div className="contact-item">
            <div className="contact-icon">📧</div>
            <div>
              <h3>Email Us</h3>
              <p>hello@arc-ian.com</p>
            </div>
          </div>
          
          <div className="contact-item">
            <div className="contact-icon">🐙</div>
            <div>
              <h3>GitHub</h3>
              <p>github.com/arc-ian</p>
            </div>
          </div>
          
          <div className="contact-item">
            <div className="contact-icon">🐦</div>
            <div>
              <h3>Twitter</h3>
              <p>@arc_ian</p>
            </div>
          </div>
          
          <div className="contact-item">
            <div className="contact-icon">💬</div>
            <div>
              <h3>Discord</h3>
              <p>Join our community</p>
            </div>
          </div>
        </div>
        
        <div className="contact-form">
          <h3>Send us a Message</h3>
          <form>
            <div className="form-group">
              <label>Name</label>
              <input type="text" placeholder="Your name" />
            </div>
            
            <div className="form-group">
              <label>Email</label>
              <input type="email" placeholder="your@email.com" />
            </div>
            
            <div className="form-group">
              <label>Message</label>
              <textarea placeholder="Tell us about your project..." rows="5"></textarea>
            </div>
            
            <button type="submit" className="submit-button">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );

  return (
    <div className="app">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-brand">
            <div className="logo">🕵️</div>
            <span className="brand-name">Arc IAN</span>
          </div>
          
          <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
            {NAV_ITEMS.map(item => (
              <button
                key={item.id}
                className={`nav-item ${currentPage === item.id ? 'active' : ''}`}
                onClick={() => setCurrentPage(item.id)}
              >
                <span className="nav-icon">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>
          
          <div className="nav-actions">
            {!isConnected ? (
              <button className="connect-btn" onClick={connectWallet}>
                Connect Wallet
              </button>
            ) : (
              <div className="wallet-info">
                <span className="wallet-address">
                  {account.slice(0, 6)}...{account.slice(-4)}
                </span>
              </div>
            )}
            
            <button 
              className="menu-toggle"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        {renderPage()}
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <span className="logo">🕵️</span>
              <span className="brand-name">Arc IAN</span>
            </div>
            <p>Privacy-first blockchain experience with invisible accounts and gasless transactions.</p>
          </div>
          
          <div className="footer-section">
            <h4>Product</h4>
            <ul>
              <li>Features</li>
              <li>Documentation</li>
              <li>API</li>
              <li>Pricing</li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Company</h4>
            <ul>
              <li>About</li>
              <li>Blog</li>
              <li>Careers</li>
              <li>Contact</li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Legal</h4>
            <ul>
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
              <li>Cookie Policy</li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2024 Arc IAN. All rights reserved. Built with ❤️ for privacy.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
