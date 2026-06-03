export default function Hero({ user, onReportClick }) {
  return (
    <section className="hero">
      <div className="hero-copy">
        <div className="eyebrow">
          <span className="eyebrow-pill">New</span>
          Campus biodiversity · Real-time reporting
        </div>

        <h1 className="hero-title">
          Help protect campus wildlife with
          <span className="hero-highlight"> BC WildWatch</span>.
        </h1>

        <p className="hero-subtitle">
          Spot a hadeda, Egyptian goose, bunny, or anything wild on campus?
          Log it in seconds. Your reports help map biodiversity, flag risks,
          and keep Belgium Campus a safe shared space for students and
          wildlife.
        </p>

        <div className="hero-metadata">
          <div className="meta-pill">
            <span className="meta-dot" aria-hidden="true"></span>
            Live student sightings
          </div>
          <div className="meta-pill">Scan &amp; report in under 30s</div>
          <div className="meta-pill">Built by BC students</div>
        </div>

        {/* Animal aesthetic strip */}
        <div className="animal-strip" aria-label="Examples of campus wildlife">
          <div className="animal-tag bird">
            <span className="animal-icon">🦆</span>
            <span>Egyptian geese at the lake</span>
          </div>
          <div className="animal-tag owl">
            <span className="animal-icon">🦉</span>
            <span>Owls on tall poles</span>
          </div>
          <div className="animal-tag mammal">
            <span className="animal-icon">🐇</span>
            <span>Rabbits on residence lawns</span>
          </div>
          <div className="animal-tag duck">
            <span className="animal-icon">🦢</span>
            <span>Water birds &amp; herons</span>
          </div>
          <div className="animal-tag fish">
            <span className="animal-icon">🐟</span>
            <span>Fish near the spillway</span>
          </div>
        </div>

        <div className="hero-actions">
          <button type="button" className="btn-primary" onClick={onReportClick}>
            <span>Start Reporting</span>
            <span>→</span>
          </button>
        </div>
      </div>

      {/* QR + Form panel */}
      <aside className="hero-panel" aria-label="BC WildWatch quick access">
        <div className="hero-panel-inner">
          <div className="qr-section">
            <div className="qr-card">
              <img
                src="/BC Wild Watch QRCode.svg"
                alt="Scan to open BC WildWatch on your phone"
              />
            </div>
            <div>
              <div className="qr-copy-title">Scan on campus</div>
              <div className="qr-copy-main">
                Open the WildWatch form instantly on your phone.
              </div>
              <p className="qr-copy-note">
                Look out for this QR code on lab doors, noticeboards, and
                common areas to report a sighting without typing the URL.
              </p>

              <div className="qr-badge-row">
                <span className="qr-badge">Works with BC Wi-Fi</span>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </section>
  )
}
