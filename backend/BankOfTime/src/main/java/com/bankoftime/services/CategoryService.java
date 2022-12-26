package com.bankoftime.services;

import com.bankoftime.dto.CategoryDTO;
import com.bankoftime.exceptions.CategoryException;
import com.bankoftime.models.Category;

import javax.validation.constraints.NotNull;
import java.util.List;
import java.util.Optional;

public interface CategoryService {

    Optional<Category> findById(Long id);

    List<Category> getAllCategories();

    Category mapCategoryDtoToCategory(final @NotNull CategoryDTO categoryDto);

    CategoryDTO mapCategoryToCategoryDto(final @NotNull Category category);

    Optional<Category> addCategory(Category category) throws CategoryException;
}
