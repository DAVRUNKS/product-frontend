import { useEffect, useState } from "react";
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

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleLogin() {
    setIsLoggedIn(true);
  }

  function handleLogout() {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setProducts([]);
  }

  function fetchProducts() {
    const token = localStorage.getItem("token");

    if (!token) {
      return;
    }

    setLoading(true);
    setError("");

    fetch("https://refact-product-2.onrender.com/products", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load products");
        }

        return response.json();
      })
      .then((data) => {
        setProducts(data.data);
      })
      .catch((error) => {
        console.error(error);
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    if (isLoggedIn) {
      fetchProducts();
    }
  }, [isLoggedIn]);

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
              <Products
                products={products}
                onProductAdded={fetchProducts}
                onDelete={fetchProducts}
                onEdit={fetchProducts}
                loading={loading}
                error={error}
              />
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
