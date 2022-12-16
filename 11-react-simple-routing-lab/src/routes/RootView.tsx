import { Link, NavLink, Outlet } from 'react-router-dom';
import './RootView.css';

export default function RootView() {
  return (
    <div className="RootView">
      <div id="sidebar">
        <h1>React Router Contacts</h1>
        <div>
          <form id="search-form" role="search">
            <input
              id="q"
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
            />
            <div
              id="search-spinner"
              aria-hidden
              hidden={true}
            />
            <div
              className="sr-only"
              aria-live="polite"
            ></div>
          </form>
          <form method="post">
            <button type="submit">New</button>
          </form>
        </div>
        <nav>
          <ul>
            <li>
              <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : undefined}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/posts" className={({ isActive }) => isActive ? 'active' : undefined} >
                Blog Posts
              </NavLink>
            </li>
            <li>
              <NavLink to="/contacts/1" className={({ isActive }) => isActive ? 'active' : undefined} >
                Your Name
              </NavLink>
            </li>
            <li>
              <NavLink to="/contacts/2" className={({ isActive }) => isActive ? 'active' : undefined} >
                Your Friend
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className={({ isActive }) => isActive ? 'active' : undefined} >
                About
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
      <div id="detail">
        <Outlet />
      </div>
    </div>
  );
}