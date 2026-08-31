import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();

    setMessage("");

    fetch("https://refact-product-2.onrender.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        password
      })
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Login failed");
        }

        return response.json();
      })
      .then((data) => {
        console.log(data);

        localStorage.setItem("token", data.data.token);

        // Tell App.jsx that the user is now logged in
        onLogin();

        setMessage("Login successful!");

        // Redirect to products
        navigate("/products");
      })
      .catch((error) => {
        console.error(error);
        setMessage(error.message);
      });
  }

  return (
    <div className="form-container">
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <br />

          <input
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            required
          />
        </div>

        <br />

        <div>
          <label>Password</label>
          <br />

          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>

        <br />

        <button type="submit">
          Login
        </button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

export default Login;

