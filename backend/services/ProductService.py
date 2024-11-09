from repositories.ProductRepository import ProductRepository

class ProductService:
    @staticmethod
    def add_product(data, category_ids):
        return ProductRepository.create_product(data, category_ids)

    @staticmethod
    def get_products():
        try:
            data = ProductRepository.get_all_products()
            return data
        except Exception as e:
            print(f"Error fetching products: {e}")
            return []

    @staticmethod
    def get_product(product_id):
        product = ProductRepository.get_product_by_id(product_id)
        if not product:
            raise ValueError("Product not found")
        return product

    @staticmethod
    def update_product(product_id, data, category_ids):
        product = ProductRepository.get_product_by_id(product_id)
        if not product:
            raise ValueError("Product not found")
        return ProductRepository.update_product(product, data, category_ids)

    @staticmethod
    def delete_product(product_id):
        product = ProductRepository.get_product_by_id(product_id)
        if not product:
            raise ValueError("Product not found")
        ProductRepository.delete_product(product)
