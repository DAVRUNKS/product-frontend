import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    setMessage("");

    fetch("https://refact-product-2.onrender.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: username,
        password: password
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

        window.dispatchEvent(new Event("login"));

        navigate("/products");
      })
      .catch((error) => {
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
          />
        </div>

        <br />

        <button type="submit">
          Login
        </button>
      </form>

      {message && <p>{message}</p>}

      <p>
        Don't have an account? <a href="/register">Register</a>
      </p>
    </div>
  );
}

export default Login;

