export default function Header({ user, onLogout, onReportClick, hidden }) {
  return (
    <header className={hidden ? 'hidden' : ''}>
      <div className="nav-inner">
        <div className="brand">
          <div className="brand-logo">
            <img
              src="/BC Wild Watch Logo.svg"
              alt="Belgium Campus ITversity logo"
            />
          </div>
          <div className="brand-text">
            <div className="brand-title">BC WildWatch</div>
            <div className="brand-subtitle">Belgium Campus iTversity</div>
            <sub>
              <i>Unofficial Student Project</i>
            </sub>
          </div>
        </div>

        <nav aria-label="Main navigation">
          <ul>
            <li>
              <a href="#report">Report Sighting</a>
            </li>
            <li>
              <a href="#sightings">Recent Sightings</a>
            </li>
          </ul>
        </nav>

        <div className="nav-cta">
          <div className="nav-pill">Student-Led Conservation</div>

          {/* Microsoft Login Button (commented out until Entra ID is available) */}
          {/*
          {!user ? (
            <button
              type="button"
              className="btn-primary"
              onClick={handleMicrosoftLogin}
            >
              <span>Login with Microsoft</span>
            </button>
          ) : (
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--gray-700)' }}>
                {user.name}
              </div>
              <button
                type="button"
                className="btn-secondary"
                onClick={onLogout}
              >
                Logout
              </button>
            </div>
          )}
          */}

          <button type="button" className="btn-primary" onClick={onReportClick}>
            <span>Report Now</span>
            <span>↗</span>
          </button>
        </div>
      </div>
    </header>
  )
}
