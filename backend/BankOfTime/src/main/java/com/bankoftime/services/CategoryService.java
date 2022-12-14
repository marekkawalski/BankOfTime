package com.bankoftime.services;

import com.bankoftime.dto.CategoryDTO;
import com.bankoftime.models.Category;

import javax.validation.constraints.NotNull;
import java.util.List;

public interface CategoryService {

    List<Category> getAllCategories();

    Category mapCategoryDtoToCategory(final @NotNull CategoryDTO categoryDto);

    CategoryDTO mapCategoryToCategoryDto(final @NotNull Category category);
}
