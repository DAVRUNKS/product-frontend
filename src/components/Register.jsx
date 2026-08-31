import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    setMessage("");
    setError("");

    fetch("https://refact-product-2.onrender.com/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        password
      })
    })
      .then(async (response) => {
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Registration failed");
        }

        return data;
      })
      .then((data) => {
        setMessage(data.message);

        setUsername("");
        setPassword("");

        setTimeout(() => {
          navigate("/login");
        }, 1000);
      })
      .catch((error) => {
        setError(error.message);
      });
  }

  return (
    <div className="form-container">
      <h2>Register</h2>

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
          Register
        </button>
      </form>

      {message && <p>{message}</p>}
      {error && <p>Error: {error}</p>}

      <p>
        Already have an account?{" "}
        <button onClick={() => navigate("/login")}>
          Login
        </button>
      </p>
    </div>
  );
}

export default Register;

