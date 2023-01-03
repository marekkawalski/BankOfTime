package com.bankoftime.services.impl;

import com.bankoftime.dto.CategoryDTO;
import com.bankoftime.exceptions.CategoryException;
import com.bankoftime.models.Category;
import com.bankoftime.repositories.CategoryRepository;
import com.bankoftime.services.CategoryService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryServiceImpl(final CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    public Optional<Category> findById(final Long id) {
        return categoryRepository.findById(id);
    }


    @Override
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    @Override
    public Category mapCategoryDtoToCategory(final CategoryDTO categoryDto) {
        Category category = new Category();
        category.setId(categoryDto.id());
        category.setName(categoryDto.name());
        return category;
    }

    @Override
    public CategoryDTO mapCategoryToCategoryDto(final Category category) {
        return new CategoryDTO(category.getId(), category.getName());
    }

    @Override
    public Optional<Category> addCategory(final Category category) throws CategoryException {
        if (categoryRepository.findByName(category.getName()).isPresent()) {
            throw new CategoryException("Category exists!");
        }
        return Optional.of(categoryRepository.save(category));
    }
}
