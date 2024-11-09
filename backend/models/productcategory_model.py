from app import db

class ProductCategory(db.Model):
    __tablename__ = 'product_categories'
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'), primary_key=True)
    category_id = db.Column(db.Integer, db.ForeignKey('categories.id'), primary_key=True)
