package com.bankoftime.services;

import com.bankoftime.dto.CategoryDTO;
import com.bankoftime.models.Category;
import com.bankoftime.repositories.CategoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryServiceImpl(final CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    @Override
    public Category mapCategoryDtoToCategory(final CategoryDTO categoryDto) {
        Category category = new Category();
        category.setName(categoryDto.name());
        return category;
    }

    @Override
    public CategoryDTO mapCategoryToCategoryDto(final Category category) {
        return new CategoryDTO(category.getId(), category.getName());
    }
}
