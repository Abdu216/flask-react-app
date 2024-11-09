from repositories.CategoryRepository import CategoryRepository

class CategoryService:
    @staticmethod
    def add_category(data):
        return CategoryRepository.create_category(data)

    @staticmethod
    def get_categories():
        return CategoryRepository.get_all_categories()

    @staticmethod
    def get_category(category_id):
        category = CategoryRepository.get_category_by_id(category_id)
        if not category:
            raise ValueError("Category not found")
        return category

    @staticmethod
    def update_category(category_id, data):
        category = CategoryRepository.get_category_by_id(category_id)
        if not category:
            raise ValueError("Category not found")
        return CategoryRepository.update_category(category, data)

    @staticmethod
    def delete_category(category_id):
        category = CategoryRepository.get_category_by_id(category_id)
        if not category:
            raise ValueError("Category not found")
        CategoryRepository.delete_category(category)