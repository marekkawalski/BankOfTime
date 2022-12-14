package com.bankoftime.controllers;

import com.bankoftime.dto.CategoryDTO;
import com.bankoftime.models.Category;
import com.bankoftime.services.CategoryService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class CategoryController {

    private final CategoryService categoryService;

    public CategoryController(final CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping(value = "categories")
    public ResponseEntity<List<CategoryDTO>> getAllCategories() {
        final List<Category> categories = categoryService.getAllCategories();
        return categoryService.getAllCategories().isEmpty() ? ResponseEntity.status(HttpStatus.NO_CONTENT).body(null) :
                ResponseEntity.status(HttpStatus.OK).body(categories.stream().map(categoryService::mapCategoryToCategoryDto).toList());
    }

}
