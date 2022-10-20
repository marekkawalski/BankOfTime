package com.bankoftime.controllers;

import com.bankoftime.dto.CreateOfferDTO;
import com.bankoftime.enums.OfferType;
import com.bankoftime.models.Offer;
import com.bankoftime.services.OfferService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = {"http://localhost:3000"})

public class OfferController {
    private final OfferService offerService;

    public OfferController(OfferService offerService) {
        this.offerService = offerService;
    }

    @PostMapping("/offers")
    public ResponseEntity<Offer> createOffer(@Valid @RequestBody CreateOfferDTO offerDTO) {

        Optional<Offer> oOffer = offerService.createOffer(offerService.mapCreateOffer(offerDTO));
        return oOffer.map(value -> ResponseEntity
                        .status(HttpStatus.CREATED)
                        .body(value))
                .orElseGet(() -> ResponseEntity
                        .status(HttpStatus.BAD_REQUEST)
                        .body(null));
    }

    @GetMapping(value = "/offers/{offerType}")
    public ResponseEntity<List<Offer>> getOffers(@PathVariable("offerType") OfferType offerType) {
        List<Offer> offers = offerService.getOffers(offerType);
        if (offers.isEmpty())
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        return ResponseEntity.status(HttpStatus.OK).body(offers);
    }
}
