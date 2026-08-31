```jsx
import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Link
} from "react-router-dom";

import Login from "./components/Login";
import Register from "./components/Register";
import Products from "./pages/Products";

function Home() {
  return (
    <main className="home">
      <div className="home-content">
        <h1>Product Management App</h1>

        <p>
          Manage your products easily with a simple
          and responsive application.
        </p>

        <Link to="/login" className="home-button">
          Get Started
        </Link>
      </div>
    </main>
  );
}

function Navigation({ isLoggedIn, onLogout }) {
  return (
    <nav className="navigation">
      <Link to="/">Home</Link>

      {!isLoggedIn && (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}

      {isLoggedIn && (
        <>
          <Link to="/products">Products</Link>

          <button onClick={onLogout}>
            Logout
          </button>
        </>
      )}
    </nav>
  );
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    Boolean(localStorage.getItem("token"))
  );

  function handleLogin() {
    setIsLoggedIn(true);
  }

  function handleLogout() {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  }

  return (
    <BrowserRouter>
      <Navigation
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
      />

      <Routes>
        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={
            <Login onLogin={handleLogin} />
          }
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/products"
          element={
            isLoggedIn ? (
              <Products />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="*"
          element={<Navigate to="/" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

