import { Link, NavLink, Outlet } from "react-router-dom";
import './RootPage.css';

export default function RootPage() {
  return (
    <div className="RootPage-container">
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
              <NavLink to="/posts">
                {({ isActive }) => (
                  <span
                    className={
                      isActive ? 'active' : undefined
                    }
                  >
                    Blog Posts
                  </span>
                )}
              </NavLink>
            </li>
            <li>
              <NavLink to="/contacts/1">
                {({ isActive }) => (
                  <span
                    className={
                      isActive ? 'active' : undefined
                    }
                  >
                    Your Name
                  </span>
                )}
              </NavLink>
            </li>
            <li>
              <NavLink to="/contacts/2">
                {({ isActive }) => (
                  <span
                    className={
                      isActive ? 'active' : undefined
                    }
                  >
                    Your Friend
                  </span>
                )}
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