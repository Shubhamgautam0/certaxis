import './home.css';
const Home: React.FC = () => {
    return (
         <div className="homepage">
        <section className="hero-section">
          <div className="hero-content">
            <h3 className="subtitle">CERTAXIS CERTIFICATE MANAGER</h3>
            <h1 className="main-title">What we offer</h1>
            
            <div className="features-grid">
              <div className="features-left">
                <div className="feature-item">
                  <div className="feature-number">1</div>
                  <div className="feature-content">
                    <h2 className="feature-title">Enhanced Security and Regulatory Compliance</h2>
                    <ul className="feature-list">
                      <li>Proactively identify vulnerabilities to minimize potential threats</li>
                      <li>Streamline adherence to security and compliance standards</li>
                      <li>Facilitate comprehensive audit trails and reporting capabilities</li>
                      <li>Maintain cryptographic flexibility to adapt to evolving encryption standards</li>
                    </ul>
                  </div>
                </div>

                <div className="feature-item">
                  <div className="feature-number dark">2</div>
                  <div className="feature-content">
                    <h2 className="feature-title">Automation for Efficiency and Cost Optimization</h2>
                  </div>
                </div>

                <div className="feature-item">
                  <div className="feature-number dark">3</div>
                  <div className="feature-content">
                    <h2 className="feature-title">Strengthened Competitiveness and Innovation</h2>
                  </div>
                </div>
              </div>

              <div className="features-right">
                <img 
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop" 
                  alt="Dashboard Preview" 
                  className="dashboard-image"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="clm-section">
          <div className="clm-content">
            <h1 className="clm-title">How does CLM work?</h1>
            <p className="clm-description">
              CertAxis CLM centralizes PKI management with secure certificate issuance, monitoring, and renewal—bringing
              automation, compliance, and control to your entire certificate ecosystem.
            </p>

            <div className="clm-grid">
              <div className="clm-diagram">
                <img 
                  src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=600&fit=crop" 
                  alt="CLM Infrastructure Diagram" 
                  className="diagram-image"
                />
              </div>

              <div className="clm-features">
                <div className="clm-feature-card">
                  <div className="clm-icon">🔍</div>
                  <h3 className="clm-feature-title">Automated Discovery & Compliance</h3>
                  <p className="clm-feature-text">
                    • Continuously scans networks for SSL/TLS certificates • Detects certificates across
                    directories, key stores, and connected assets
                  </p>
                </div>

                <div className="clm-feature-card">
                  <div className="clm-icon">👁️</div>
                  <h3 className="clm-feature-title">Centralized Visibility Across CAs</h3>
                  <p className="clm-feature-text">
                    • Integrates with multiple CAs for unified oversight • Connects with major providers like
                    Let's Encrypt, DigiCert, and Nexus GO
                  </p>
                </div>

                <div className="clm-feature-card">
                  <div className="clm-icon">⚙️</div>
                  <h3 className="clm-feature-title">Smart Automation for Lifecycle Management</h3>
                  <p className="clm-feature-text">
                    • Automates issuance, renewal, and revocation • Manages keys and certificates across
                    systems and devices • Supports event-based and scheduled actions
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
}

export default Home;