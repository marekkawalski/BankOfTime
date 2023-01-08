package com.bankoftime.controllers;

import com.bankoftime.services.OfferImageService;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class OfferImageController {
    private final OfferImageService offerImageService;

    public OfferImageController(final OfferImageService offerImageService) {
        this.offerImageService = offerImageService;
    }
}
