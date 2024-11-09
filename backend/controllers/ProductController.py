from flask import Blueprint, request, jsonify
from services.ProductService import ProductService

product_bp = Blueprint('product', __name__)
@product_bp.route('/products', methods=['POST'])
def add_product():
    data = request.get_json()
    category_ids = data.get('category_ids', [])
    try:
        product = ProductService.add_product(data, category_ids)
        return jsonify({"id": product.id, "message": "Product created"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@product_bp.route('/products', methods=['GET'])
def get_products():
    products = ProductService.get_products()
    return jsonify([{
        "id": product.id,
        "name": product.name,
        "price": product.price,
        "quantity": product.quantity,
        "tags": product.tags,
        "categories": [{"id": category.id, "name": category.name} for category in product.categories]
    } for product in products]), 200

@product_bp.route('/products/<int:product_id>', methods=['PUT'])
def update_product(product_id):
    data = request.get_json()
    category_ids = data.get('category_ids', [])
    try:
        product = ProductService.update_product(product_id, data, category_ids)
        return jsonify({"id": product.id, "message": "Product updated"}), 200
    except ValueError as e:
        return jsonify({"error": str(e)}), 404

@product_bp.route('/products/<int:product_id>', methods=['DELETE'])

def delete_product(product_id):
    try:
        ProductService.delete_product(product_id)
        return jsonify({"message": "Product deleted"}), 200
    except ValueError as e:
        return jsonify({"error": str(e)}), 404
