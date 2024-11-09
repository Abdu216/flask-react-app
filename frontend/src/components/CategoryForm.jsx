import { useState } from "react";
import PropTypes from "prop-types";
import api from "../api/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTimes } from "@fortawesome/free-solid-svg-icons";

function CategoryForm({ category, onSave, onCancel }) {
  const [name, setName] = useState(category ? category.name : "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!name) {
      setError("Category name is required.");
      setLoading(false);
      return;
    }

    const newCategory = { name };

    try {
      if (category) {
        await api.put(`/categories/${category.id}`, newCategory);
      } else {
        await api.post("/categories", newCategory);
      }
      onSave();
    } catch (error) {
      console.error("Error saving category:", error);
      setError("Failed to save category. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="category-form card p-4 shadow-sm mb-2">
      <h3 className="mb-4">{category ? "Edit Category" : "Add Category"}</h3>
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

        <div className="form-group d-flex justify-content-end">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            <FontAwesomeIcon icon={faSave} /> {category ? "Update" : "Add"}{" "}
            Category
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

CategoryForm.propTypes = {
  category: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  }),
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

CategoryForm.defaultProps = {
  category: null,
};

export default CategoryForm;
