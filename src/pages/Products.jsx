import { useEffect, useState } from "react";
import ProductForm from "../components/ProductForm";
import ProductList from "../components/ProductList";

const API_URL = "https://refact-product-2.onrender.com";

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/products`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        return response.json();
      })
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  function addProduct(product) {
    setProducts((currentProducts) => [
      ...currentProducts,
      product
    ]);
  }

  function deleteProduct(productId) {
    const token = localStorage.getItem("token");

    fetch(`${API_URL}/products/${productId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete product");
        }

        return response.json();
      })
      .then(() => {
        setProducts((currentProducts) =>
          currentProducts.filter(
            (product) => product.id !== productId
          )
        );
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function updateProduct(updatedProduct) {
    const token = localStorage.getItem("token");

    fetch(`${API_URL}/products/${updatedProduct.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        name: updatedProduct.name,
        price: updatedProduct.price
      })
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update product");
        }

        return response.json();
      })
      .then((data) => {
        setProducts((currentProducts) =>
          currentProducts.map((product) =>
            product.id === updatedProduct.id
              ? {
                  id: data.id,
                  name: data.name,
                  price: data.price
                }
              : product
          )
        );
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div>
      <h2>Products Page</h2>

      <ProductForm
        onProductAdded={addProduct}
      />

      <ProductList
        products={products}
        onDelete={deleteProduct}
        onEdit={updateProduct}
      />
    </div>
  );
}

export default Products;

