import ProductCard from "./ProductCard";

function ProductList({ products, onDelete, onEdit }) {
  return (
    <div>
      <h2>Products</h2>

      <div className="product-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductList;
