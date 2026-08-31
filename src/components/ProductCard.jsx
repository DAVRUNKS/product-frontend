import { useState } from "react";

function ProductCard({ product, onEdit, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);

  function handleSave() {
    onEdit({
      ...product,
      name,
      price
    });

    setEditing(false);
  }

  return (
    <div className="product-card">
      {editing ? (
        <>
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />

          <input
            type="number"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
          />

          <button onClick={handleSave}>Save</button>
          <button onClick={() => setEditing(false)}>Cancel</button>
        </>
      ) : (
        <>
          <h3>{product.name}</h3>

          <p>
            UGX {Number(product.price).toLocaleString()}
          </p>

          <button onClick={() => setEditing(true)}>
            Edit
          </button>

          <button onClick={() => onDelete(product.id)}>
            Delete
          </button>
        </>
      )}
    </div>
  );
}

export default ProductCard;

