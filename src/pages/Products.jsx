import ProductForm from "../components/ProductForm";
import ProductList from "../components/ProductList";

function Products({
  products,
  onProductAdded,
  onDelete,
  onEdit,
  loading,
  error
}) {
  return (
    <div className="products-page">
      <h2>Products Page</h2>

      {loading && (
        <p className="loading-message">
          Loading products...
        </p>
      )}

      {error && (
        <p className="error-message">
          {error}
        </p>
      )}

      <ProductForm
        onProductAdded={onProductAdded}
      />

      <ProductList
        products={products}
        onDelete={onDelete}
        onEdit={onEdit}
      />
    </div>
  );
}

export default Products;
