from flask import Blueprint, request, jsonify
from services.CategoryService import CategoryService

category_bp = Blueprint('category', __name__)

@category_bp.route('/categories', methods=['POST'])
def add_category():
    data = request.get_json()
    try:
        category = CategoryService.add_category(data)
        return jsonify({"id": category.id, "message": "Category created"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@category_bp.route('/categories', methods=['GET'])
def get_categories():
    categories = CategoryService.get_categories()
    return jsonify([{
        "id": category.id,
        "name": category.name
    } for category in categories]), 200

@category_bp.route('/categories/<int:category_id>', methods=['PUT'])
def update_category(category_id):
    data = request.get_json()
    try:
        category = CategoryService.update_category(category_id, data)
        return jsonify({"id": category.id, "message": "Category updated"}), 200
    except ValueError as e:
        return jsonify({"error": str(e)}), 404

@category_bp.route('/categories/<int:category_id>', methods=['DELETE'])
def delete_category(category_id):
    try:
        CategoryService.delete_category(category_id)
        return jsonify({"message": "Category deleted"}), 200
    except ValueError as e:
        return jsonify({"error": str(e)}), 404