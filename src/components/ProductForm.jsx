import { useState } from "react";

function ProductForm({ onProductAdded }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    setMessage("");
    setError("");

    const token = localStorage.getItem("token");

    fetch("https://refact-product-2.onrender.com/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        name: name,
        price: price
      })
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to create product");
        }

        return response.json();
      })
      .then((data) => {
        onProductAdded({
          id: data.id,
          name: data.name,
          price: data.price
        });

        setMessage(data.message);
        setName("");
        setPrice("");
      })
      .catch((error) => {
        setError(error.message);
      });
  }

  return (
    <div className="form-container">
      <h2>Add Product</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Product name</label>
          <br />

          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>

        <br />

        <div>
          <label>Price</label>
          <br />

          <input
            type="number"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
          />
        </div>

        <br />

        <button type="submit">
          Add Product
        </button>
      </form>

      {message && <p>{message}</p>}
      {error && <p>Error: {error}</p>}
    </div>
  );
}

export default ProductForm;

