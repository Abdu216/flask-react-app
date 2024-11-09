import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import api from "../api/api";
import CategoryForm from "./CategoryForm";

function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingCategory, setEditingCategory] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await api.get("/categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleSearch = () => {
    if (!searchQuery) {
      fetchCategories();
    } else {
      const filteredCategories = categories.filter((category) =>
        category.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setCategories(filteredCategories);
    }
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
  };

  const handleDelete = async (categoryId) => {
    try {
      await api.delete(`/categories/${categoryId}`);
      fetchCategories();
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const handleSave = () => {
    setEditingCategory(null);
    fetchCategories();
  };

  const handleCancel = () => {
    setEditingCategory(null);
  };

  return (
    <div className="category-list">
      <h2>Category Management</h2>

      {/* Search Form */}
      <div className="d-flex justify-content-between mb-4">
        <div className="input-group w-50">
          <input
            type="text"
            className="form-control"
            placeholder="Search categories"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div>
          <button className="btn btn-primary ml-2" onClick={handleSearch}>
            <i className="bi bi-search"></i> Search
          </button>
          <button
            className="btn btn-success ml-2"
            onClick={() => setEditingCategory({})}
          >
            <i className="bi bi-plus"></i> Add New Category
          </button>
        </div>
      </div>

      {/* Category Form */}
      {editingCategory && (
        <CategoryForm
          category={editingCategory}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}

      {/* Category Table */}
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td>{category.name}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm mr-2"
                  onClick={() => handleEdit(category)}
                >
                  <i className="bi bi-pencil-square"></i> Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(category.id)}
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

CategoryList.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
};

export default CategoryList;
