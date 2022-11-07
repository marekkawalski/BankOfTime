package com.bankoftime.dto;

import com.bankoftime.enums.OfferType;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

public record CreateOfferDTO(@NotBlank String title, @NotBlank String shortDescription, @NotNull Double price,
                             @NotNull OfferType offerType) {
}
