package com.bankoftime.dto;

import com.bankoftime.enums.OfferStatus;
import com.bankoftime.enums.OfferType;
import org.springframework.lang.Nullable;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.List;

public record UpdateOfferDTO(
        @NotNull Long id,
        @NotBlank(message = "title can't be blank") String title,
        @NotBlank(message = "shortDescription can't be blank") String shortDescription,
        @NotNull(message = "Price can't be null") Double price,
        @NotNull(message = "Offer type can't be null") OfferType offerType,
        @Nullable String longDescription,
        @Nullable String location,
        @NotEmpty
        List<CategoryDTO> categories,
        OfferStatus offerStatus
) {

}
