from models.product_model import Product
from models.category_model import Category
from app import db

class ProductRepository:
    @staticmethod
    def create_product(data, category_ids):
        product = Product(
            name=data['name'],
            price=data['price'],
            quantity=data['quantity'],
            tags=data.get('tags', None)
        )
        for category_id in category_ids:
            category = Category.query.get(category_id)
            if category:
                product.categories.append(category)
        
        db.session.add(product)
        db.session.commit()
        return product

    @staticmethod
    def get_all_products():
        data=Product.query.all()
        print(data)
        return data

    @staticmethod
    def get_product_by_id(product_id):
        return Product.query.get(product_id)

    @staticmethod
    def update_product(product, data, category_ids):
        product.name = data['name']
        product.price = data['price']
        product.quantity = data['quantity']
        product.tags = data.get('tags', product.tags)

        # Update categories if provided
        if category_ids is not None:
            product.categories.clear()  # Clear existing categories
            for category_id in category_ids:
                category = Category.query.get(category_id)
                if category:
                    product.categories.append(category)

        db.session.commit()
        return product

    @staticmethod
    def delete_product(product):
        db.session.delete(product)
        db.session.commit()
