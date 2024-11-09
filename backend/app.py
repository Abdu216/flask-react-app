from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = (
    'mssql+pyodbc://(localdb)\\MSSQLLocalDB/management?driver=ODBC+Driver+17+for+SQL+Server;TrustServerCertificate=yes'
)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = os.urandom(24)

db = SQLAlchemy(app)

CORS(app, resources={r"/*": {"origins": "*"}})

@app.route('/test-db')
def test_db():
    try:
        result = db.session.execute(text("SELECT TOP 1 * FROM products")).fetchone()
        return "Database connection successful!" if result else "No records found in the products table."
    except Exception as e:
        return f"Database connection failed: {str(e)}"

if __name__ == '__main__':
    from controllers.ProductController import product_bp
    from controllers.CategoryController import category_bp

    app.register_blueprint(product_bp)
    app.register_blueprint(category_bp)
    app.run(debug=True)