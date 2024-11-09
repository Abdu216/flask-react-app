import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import api from "../api/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTimes } from "@fortawesome/free-solid-svg-icons";

function ProductForm({ product, onSave, onCancel }) {
  const [name, setName] = useState(product?.name || "");
  const [price, setPrice] = useState(product?.price || "");
  const [quantity, setQuantity] = useState(product?.quantity || "");
  const [tags, setTags] = useState(product?.tags || "");
  const [categoryIds, setCategoryIds] = useState(
    product?.categories ? product.categories.map((c) => c.id) : []
  );
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get("/categories");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (price <= 0 || quantity <= 0) {
      setError("Price and quantity must be positive values.");
      setLoading(false);
      return;
    }

    const newProduct = {
      name,
      price,
      quantity,
      tags,
      category_ids: categoryIds,
    };

    try {
      if (product) {
        await api.put(`/products/${product.id}`, newProduct);
      } else {
        await api.post("/products", newProduct);
      }
      onSave();
    } catch (error) {
      console.error("Error saving product:", error);
      setError("Failed to save product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="product-form card p-4 shadow-sm mb-2">
      <h3 className="mb-4">{product ? "Edit Product" : "Add Product"}</h3>
      <form onSubmit={handleSubmit}>
        {error && <p className="text-danger">{error}</p>}

        <div className="form-group mb-3">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group mb-3">
          <label>Price</label>
          <input
            type="number"
            className="form-control"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            min="0"
          />
        </div>

        <div className="form-group mb-3">
          <label>Quantity</label>
          <input
            type="number"
            className="form-control"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
            min="0"
          />
        </div>

        <div className="form-group mb-3">
          <label>Tags</label>
          <input
            type="text"
            className="form-control"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>

        <div className="form-group mb-3">
          <label>Categories</label>
          <select
            multiple
            className="form-control"
            value={categoryIds}
            onChange={(e) =>
              setCategoryIds(
                Array.from(e.target.selectedOptions, (option) => option.value)
              )
            }
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group d-flex justify-content-end">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            <FontAwesomeIcon icon={faSave} /> {product ? "Update" : "Add"}{" "}
            Product
          </button>
          <button
            type="button"
            className="btn btn-secondary ml-2"
            onClick={onCancel}
            disabled={loading}
          >
            <FontAwesomeIcon icon={faTimes} /> Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

ProductForm.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    price: PropTypes.number,
    quantity: PropTypes.number,
    tags: PropTypes.string,
    categories: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
      })
    ),
  }),
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default ProductForm;
