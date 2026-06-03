export default function Footer() {
  return (
    <footer>
      <div className="footer-inner">
        <div>
          &copy; <span id="year">{new Date().getFullYear()}</span> BC WildWatch
          · Student conservation initiative at Belgium Campus iTversity.
        </div>
        <div className="footer-links">
          <span>Inspired by</span>
          <a href="#report">Campus reporting culture</a>
          <a href="#sightings">Data-driven ecology</a>
        </div>
      </div>
    </footer>
  )
}
