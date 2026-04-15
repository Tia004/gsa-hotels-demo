"use client";

import React from 'react';
import { UserButton, useClerk } from "@clerk/nextjs";
import Link from "next/link";

const suppliers = [
  {
    id: 1,
    name: "Technogym",
    category: "WELLNESS & PERFORMANCE",
    description: "Leader mondiale in soluzioni fitness di lusso e biomeccanica d'avanguardia per aree wellness d'élite.",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Technogym_Logo.svg/1024px-Technogym_Logo.svg.png"
  },
  {
    id: 2,
    name: "Etro Home",
    category: "LUXURY TEXTILES",
    description: "L'altezza dell'arte tessile italiana per arredi e complementi che definiscono l'estetica delle suite più prestigiose.",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Etro_logo.svg/1024px-Etro_logo.svg.png"
  },
  {
    id: 3,
    name: "Oracle Hospitality",
    category: "TECHNOLOGY & PMS",
    description: "Sistemi gestionali evoluti (Opera) per un'ingegneria dei processi impeccabile e data-driven.",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Oracle_logo.svg/1024px-Oracle_logo.svg.png"
  },
  {
    id: 4,
    name: "Dorelan",
    category: "PREMIUM SLEEP",
    description: "Alchimia perfetta tra comfort e tecnologia per garantire un riposo rigenerante di standard superiore.",
    logo: "https://www.dorelan.it/uploads/media/default/0001/01/5e2ef0d30c5e3f4e8e8e8e8e8e8e8e8e.svg" // Fallback expected
  },
  {
    id: 5,
    name: "Viabizzuno",
    category: "ARCHITECTURAL LIGHT",
    description: "Progettazione della luce come elemento architettonico ed emozionale per atmosfere senza tempo.",
    logo: "https://images.squarespace-cdn.com/content/v1/577bc6f0d1758e576f30d075/1468412630500-Z0I1X1X1X1X1X1X1X1/Viabizzuno_logo.png"
  },
  {
    id: 6,
    name: "Arper",
    category: "CONTRACT FURNITURE",
    description: "Design essenziale e contemporaneo per spazi comuni che fondono funzionalità ed eleganza formale.",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Arper_logo.svg/1024px-Arper_logo.svg.png"
  }
];

export default function SuppliersDashboard({ userName = "Partner" }) {
  const { signOut } = useClerk();

  return (
    <div className="dashboard-wrapper">
      <style jsx global>{`
        :root {
          --gold: #C5A059;
          --bg-dark: #050505;
          --card-bg: rgba(255, 255, 255, 0.03);
          --card-border: rgba(197, 160, 89, 0.15);
        }

        .dashboard-wrapper {
          background-color: var(--bg-dark);
          min-height: 100vh;
          color: white;
          font-family: 'Montserrat', sans-serif;
          display: flex;
        }

        /* Sidebar Sidebar */
        .dashboard-sidebar {
          width: 280px;
          border-right: 1px solid rgba(255, 255, 255, 0.05);
          display: flex;
          flex-direction: column;
          padding: 40px 20px;
          height: 100vh;
          position: sticky;
          top: 0;
        }

        .sidebar-logo {
          width: 120px;
          margin-bottom: 60px;
          padding-left: 20px;
        }

        .sidebar-nav {
          flex: 1;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 15px;
          padding: 15px 20px;
          color: rgba(255, 255, 255, 0.5);
          text-decoration: none;
          font-size: 0.85rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          transition: all 0.3s ease;
          border-radius: 12px;
          margin-bottom: 5px;
        }

        .nav-item.active {
          color: var(--gold);
          background: rgba(197, 160, 89, 0.05);
        }

        .nav-item:hover:not(.active) {
          color: white;
          background: rgba(255, 255, 255, 0.02);
        }

        /* Main Content */
        .dashboard-main {
          flex: 1;
          padding: 40px 60px;
          max-width: 1400px;
        }

        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 80px;
        }

        .welcome-text h1 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 3rem;
          font-weight: 300;
          line-height: 1;
        }

        .welcome-text span {
          color: var(--gold);
        }

        .welcome-text p {
          color: rgba(255, 255, 255, 0.4);
          text-transform: uppercase;
          letter-spacing: 0.2em;
          font-size: 0.75rem;
          margin-top: 10px;
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        /* Suppliers Grid */
        .suppliers-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 30px;
        }

        .supplier-card {
          background: var(--card-bg);
          border: 1px solid var(--card-border);
          border-radius: 1px; /* Maschile / Editoriale */
          padding: 40px;
          display: flex;
          flex-direction: column;
          aspect-ratio: 4/5;
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
          overflow: hidden;
        }

        .supplier-card:hover {
          border-color: var(--gold);
          background: rgba(197, 160, 89, 0.02);
          transform: translateY(-5px);
        }

        .card-label {
          color: var(--gold);
          font-size: 0.65rem;
          letter-spacing: 0.3em;
          font-weight: 600;
          margin-bottom: 20px;
          text-transform: uppercase;
        }

        .card-logo-box {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 30px;
        }

        .card-logo-box img {
          max-width: 180px;
          max-height: 80px;
          object-fit: contain;
          filter: grayscale(1) brightness(2);
          opacity: 0.8;
          transition: all 0.5s ease;
        }

        .supplier-card:hover .card-logo-box img {
          filter: grayscale(0) brightness(1);
          opacity: 1;
          transform: scale(1.05);
        }

        .card-info h3 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.8rem;
          margin-bottom: 15px;
        }

        .card-info p {
          color: rgba(255, 255, 255, 0.5);
          font-size: 0.9rem;
          line-height: 1.6;
          margin: 0;
        }

        .card-connector {
          position: absolute;
          bottom: 20px;
          right: 30px;
          width: 0%;
          height: 1px;
          background: var(--gold);
          transition: width 0.4s ease;
        }

        .supplier-card:hover .card-connector {
          width: 40px;
        }

        /* Mobile Adjustments */
        @media (max-width: 1024px) {
          .dashboard-sidebar { display: none; }
          .dashboard-main { padding: 40px 20px; }
          .suppliers-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* Sidebar */}
      <aside className="dashboard-sidebar">
        <Link href="/">
          <img src="/assets/logo.png" alt="GSA Hotels" className="sidebar-logo" />
        </Link>
        
        <nav className="sidebar-nav">
          <Link href="/dashboard" className="nav-item active">
            <i className="fas fa-th-large" /> Dashboard
          </Link>
          <Link href="/#fleet" className="nav-item">
            <i className="fas fa-hotel" /> Partner
          </Link>
          <Link href="/#contact" className="nav-item">
            <i className="fas fa-envelope" /> Supporto
          </Link>
        </nav>

        <div className="sidebar-footer">
          <button onClick={() => signOut()} className="nav-item" style={{ background: 'none', border: 'none', width: '100%', cursor: 'pointer' }}>
            <i className="fas fa-sign-out-alt" /> Esci
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="dashboard-main">
        <header className="dashboard-header">
          <div className="welcome-text">
            <p>BENVENUTO NEL PORTALE</p>
            <h1>GSA <span>Network</span></h1>
          </div>
          <div className="header-actions">
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontSize: '0.8rem', fontWeight: 600, color: 'white' }}>{userName}</p>
              <p style={{ fontSize: '0.65rem', color: 'var(--gold)', letterSpacing: '0.1em' }}>PARTNER CERTIFICATO</p>
            </div>
            <UserButton />
          </div>
        </header>

        <section className="suppliers-section">
          <div style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '1.5rem', fontFamily: 'Montserrat', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Fornitori Certificati</h2>
            <div style={{ width: '40px', height: '1px', background: 'var(--gold)', marginTop: '10px' }} />
          </div>

          <div className="suppliers-grid">
            {suppliers.map(s => (
              <div key={s.id} className="supplier-card">
                <span className="card-label">{s.category}</span>
                <div className="card-logo-box">
                  {/* Fallback pattern for missing images */}
                  <img 
                    src={s.logo} 
                    alt={s.name} 
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/assets/logo.png';
                      (e.target as HTMLImageElement).style.opacity = '0.3';
                    }}
                  />
                </div>
                <div className="card-info">
                  <h3>{s.name}</h3>
                  <p>{s.description}</p>
                </div>
                <div className="card-connector"></div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
