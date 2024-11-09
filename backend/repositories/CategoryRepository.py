from models.category_model import Category
from app import db

class CategoryRepository:
    @staticmethod
    def create_category(data):
        category = Category(name=data['name'])
        db.session.add(category)
        db.session.commit()
        return category

    @staticmethod
    def get_all_categories():
        return Category.query.all()

    @staticmethod
    def get_category_by_id(category_id):
        return Category.query.get(category_id)

    @staticmethod
    def update_category(category, data):
        category.name = data['name']
        db.session.commit()
        return category

    @staticmethod
    def delete_category(category):
        db.session.delete(category)
        db.session.commit()