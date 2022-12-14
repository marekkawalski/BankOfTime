package com.bankoftime.dto;

import javax.validation.constraints.NotBlank;

public record CategoryDTO(
        Long id,
        @NotBlank
        String name) {
}
