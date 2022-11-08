package com.bankoftime.controllers;

import com.bankoftime.dto.CreateOfferDTO;
import com.bankoftime.models.AppUser;
import com.bankoftime.models.Offer;
import com.bankoftime.services.AppUserService;
import com.bankoftime.services.OfferService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class OfferController {
    private final OfferService offerService;

    private final AppUserService appUserService;

    public OfferController(OfferService offerService, AppUserService appUserService) {
        this.offerService = offerService;
        this.appUserService = appUserService;
    }

    @GetMapping(path = "/offers/{offerId:\\d*}")
    public ResponseEntity<Offer> getOfferById(@PathVariable Long offerId) {
        return offerService.getOfferById(offerId)
                .map(offer -> ResponseEntity.status(HttpStatus.OK).body(offer))
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).body(null));
    }

    @PostMapping(path = "/offers/{clientId}")
    public ResponseEntity<Offer> createOffer(@PathVariable Long clientId, @Valid @RequestBody CreateOfferDTO offerDTO) {
        Optional<AppUser> oAppUser = appUserService.find(clientId);
        if (oAppUser.isEmpty())
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        return offerService.createOffer(offerService.mapCreateOffer(offerDTO), oAppUser.get())
                .map(value -> ResponseEntity
                        .status(HttpStatus.CREATED)
                        .body(value))
                .orElseGet(() -> ResponseEntity
                        .status(HttpStatus.BAD_REQUEST)
                        .body(null));
    }

//    @GetMapping(value = "/offers/{offerType}")
//    public ResponseEntity<List<Offer>> getAllOffers(@PathVariable("offerType") OfferType offerType) {
//        List<Offer> offers = offerService.getAllOffersOfType(offerType);
//        if (offers.isEmpty())
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
//        return ResponseEntity.status(HttpStatus.OK).body(offers);
//    }

    @GetMapping(value = "/clients/{clientId}/sellOffers")
    public ResponseEntity<List<Offer>> getClientSellOffers(@PathVariable("clientId") Long clientId) {
        List<Offer> selOffers = offerService.getClientSellOffers(clientId);
        if (selOffers.isEmpty())
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        return ResponseEntity.status(HttpStatus.OK).body(selOffers);
    }

    @GetMapping(value = "/clients/{clientId}/purchaseOffers")
    public ResponseEntity<List<Offer>> getClientPurchaseOffers(@PathVariable("clientId") Long clientId) {
        List<Offer> purchaseOffers = offerService.getClientPurchaseOffers(clientId);
        if (purchaseOffers.isEmpty())
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        return ResponseEntity.status(HttpStatus.OK).body(purchaseOffers);
    }

    @GetMapping(value = "/clients/{clientId}/purchaseOffers/{offerId}")
    public ResponseEntity<Offer> getClientPurchaseOffer(@PathVariable("clientId") Long clientId,
                                                        @PathVariable("offerId") Long offerId) {
        Optional<Offer> oOffer = offerService.getOnePurchaseOfferOfClient(clientId, offerId);

        if (oOffer.isEmpty())
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(null);

        return ResponseEntity.status(HttpStatus.OK).body(oOffer.get());
    }

    @GetMapping(value = "/clients/{clientId}/sellOffers/{offerId}")
    public ResponseEntity<Offer> getClientSellOffer(@PathVariable("clientId") Long clientId,
                                                    @PathVariable("offerId") Long offerId) {
        Optional<Offer> oOffer = offerService.getOneSellOfferOfClient(clientId, offerId);

        if (oOffer.isEmpty())
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(null);

        return ResponseEntity.status(HttpStatus.OK).body(oOffer.get());
    }

    @DeleteMapping(value = "/offers/{id}")
    public ResponseEntity<Void> deleteOffer(@PathVariable Long id) {
        return offerService.deleteOffer(id) ?
                ResponseEntity
                        .status(HttpStatus.OK)
                        .body(null)
                : ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(null);
    }
}
