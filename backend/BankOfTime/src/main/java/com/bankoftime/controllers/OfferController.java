package com.bankoftime.controllers;

import com.bankoftime.dto.CreateOfferDTO;
import com.bankoftime.models.Offer;
import com.bankoftime.services.OfferService;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.Optional;

@RestController
@CrossOrigin(origins = {"http://localhost:3000"})

public class OfferController {
    private final OfferService offerService;
    private final ModelMapper modelMapper;

    public OfferController(OfferService offerService, ModelMapper modelMapper) {
        this.offerService = offerService;
        this.modelMapper = modelMapper;
    }


    @PostMapping("/offers")
    public ResponseEntity<Offer> createOffer(@Valid @RequestBody CreateOfferDTO offerDTO) {
//        Offer offer = new Offer();
//        offer.offerType(offerDTO.offerType());
//        offer.price(offerDTO.price());
//        offer.shortDescription(offerDTO.shortDescription());
//        offer.title(offerDTO.title());
        Offer offer = this.modelMapper.map(offerDTO, Offer.class);

        Optional<Offer> oOffer = offerService.createOffer(offer);
        return oOffer.map(value -> ResponseEntity
                .status(HttpStatus.CREATED)
                .body(value)).orElseGet(() -> ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(null));

    }
}
