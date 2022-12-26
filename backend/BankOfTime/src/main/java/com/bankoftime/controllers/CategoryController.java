package com.bankoftime.controllers;

import com.bankoftime.dto.CategoryDTO;
import com.bankoftime.exceptions.CategoryException;
import com.bankoftime.models.Category;
import com.bankoftime.services.CategoryService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.Valid;
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

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping(value = "categories")
    public ResponseEntity<CategoryDTO> createCategory(@Valid @RequestBody CategoryDTO categoryDTO) {
        try {
            return categoryService.addCategory(categoryService.mapCategoryDtoToCategory(categoryDTO))
                    .map(category -> ResponseEntity.status(HttpStatus.CREATED).body(categoryService.mapCategoryToCategoryDto(category)))
                    .orElse(ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null));
        } catch (CategoryException e) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT, e.getMessage(), e.getCause());
        }
    }


}
