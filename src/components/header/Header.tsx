import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './header.css';
import { useAuth } from '../../contexts/AuthContext';


const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const {isAuthenticated, logout} = useAuth();

  const handleSignUp = () => {
    navigate('/signup');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleHome = () => {
    navigate('/');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div
          className="logo"
          role="button"
          tabIndex={0}
          onClick={handleHome}
          aria-label="Go to home"
          style={{ cursor: 'pointer' }}
        >
          <span className="logo-text">Certaxis</span>
        </div>


        <div className="nav-links desktop-nav">
          <button className="nav-link" onClick={handleHome}>
            Home
          </button>
        </div>

        {/* Right Section - Sign Up & Login Buttons */}
        <div className="nav-actions">
          
          <div className="auth-buttons">
  {isAuthenticated ? (
    <>
      <button 
        className="logout-btn" 
        onClick={handleLogout}
      >
        Logout
      </button>
    </>
  ) : (
    <>
      <button className="signup-btn desktop-only" onClick={handleSignUp}>
        Sign Up
      </button>
      <button className="login-btn desktop-only" onClick={handleLogin}>
        Login
      </button>
    </>
  )}
</div>

          
          <button 
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? 'X' : 'Menu'}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="mobile-menu">
          <div className="mobile-nav-links">
            <button className="mobile-nav-link" onClick={handleHome}>
              Home
            </button>
            
           <div className="mobile-auth-buttons">
  {isAuthenticated ? (
    <button 
      className="logout-btn mobile-login"
      onClick={handleLogout}
    >
      Logout
    </button>
  ) : (
    <>
      <button className="signup-btn mobile-signup" onClick={handleSignUp}>
        Sign Up
      </button>
      <button className="login-btn mobile-login" onClick={handleLogin}>
        Login
      </button>
    </>
  )}
</div>

          </div>
        </div>
      )}
    </nav>
  )
}

export default Header;