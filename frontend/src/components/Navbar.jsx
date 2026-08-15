import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        🎬 Movie Booking
      </Link>

      <Link to="/">
        Shows
      </Link>
    </nav>
  );
}

export default Navbar;