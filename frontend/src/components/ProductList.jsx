import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import api from "../api/api";
import ProductForm from "./ProductForm";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await api.get("/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleSearch = () => {
    if (!searchQuery) {
      fetchProducts();
    } else {
      const filteredProducts = products.filter((product) => {
        return (
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.tags.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.categories.some((category) =>
            category.name.toLowerCase().includes(searchQuery.toLowerCase())
          )
        );
      });
      setProducts(filteredProducts);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
  };

  const handleDelete = async (productId) => {
    try {
      await api.delete(`/products/${productId}`);
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleSave = () => {
    setEditingProduct(null);
    fetchProducts();
  };

  const handleCancel = () => {
    setEditingProduct(null);
  };

  return (
    <div className="product-list">
      <h2>Product Management</h2>

      {/* Search Form */}
      <div className="d-flex justify-content-between mb-4">
        <div className="input-group w-50">
          <input
            type="text"
            className="form-control"
            placeholder="Search products"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div>
          <button className="btn btn-primary mr-2" onClick={handleSearch}>
            <i className="bi bi-search"></i> Search
          </button>
          <button
            className="btn btn-success"
            onClick={() => setEditingProduct({})}
          >
            <i className="bi bi-plus"></i> Add New Product
          </button>
        </div>
      </div>

      {/* Product Form */}
      {editingProduct && (
        <ProductForm
          product={editingProduct}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}

      {/* Product Table */}
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Tags</th>
            <th>Categories</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.quantity}</td>
              <td>{product.tags}</td>
              <td>{product.categories.map((cat) => cat.name).join(", ")}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm mr-2"
                  onClick={() => handleEdit(product)}
                >
                  <i className="bi bi-pencil-square"></i> Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(product.id)}
                >
                  <i className="bi bi-trash"></i> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

ProductList.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
      tags: PropTypes.string,
      categories: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number.isRequired,
          name: PropTypes.string.isRequired,
        })
      ),
    })
  ),
};

export default ProductList;
