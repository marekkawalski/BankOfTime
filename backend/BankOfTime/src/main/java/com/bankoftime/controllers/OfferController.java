package com.bankoftime.controllers;

import com.bankoftime.dto.CreateOfferDTO;
import com.bankoftime.dto.OfferDTO;
import com.bankoftime.enums.OfferStatus;
import com.bankoftime.enums.OfferType;
import com.bankoftime.models.AppUser;
import com.bankoftime.models.Offer;
import com.bankoftime.services.AppUserService;
import com.bankoftime.services.OfferService;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
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

    @GetMapping(path = "/offers/type/{offerType}")
    public ResponseEntity<List<Offer>> getOffersOfType(@PathVariable OfferType offerType,
                                                       @RequestParam(required = false) OfferStatus offerStatus) {
        final List<Offer> offers = offerStatus == null ? offerService.getAllOffersOfType(offerType) :
                offerService.getAllOffersOfTypeAndStatus(offerType, offerStatus);
        if (offers.isEmpty())
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
        return ResponseEntity.status(HttpStatus.OK).body(offers);
    }

    @GetMapping(path = "/offers")
    public ResponseEntity<List<Offer>> getOffers(@RequestParam(required = false, value = "type") OfferType offerType,
                                                 @RequestParam(value = "status", defaultValue = "ACTIVE") OfferStatus offerStatus,
                                                 @RequestParam(value = "sort", defaultValue = "title") String sortField,
                                                 @RequestParam(value = "sort-dir", defaultValue = "ASC") Sort.Direction sortDirection,
                                                 @RequestParam(value = "page-size", defaultValue = "2") Integer pageSize,
                                                 @RequestParam(value = "page-num", defaultValue = "0") Integer pageNum) {
        final List<Offer> offers = offerType == null ? offerService.getSortedPagedAndFilteredOffers(sortField, pageSize, pageNum, offerStatus, sortDirection) :
                offerService.getSortedPagedAndFilteredOffersOfType(sortField, pageSize, pageNum, offerType, offerStatus, sortDirection);
        if (offers.isEmpty())
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
        return ResponseEntity.status(HttpStatus.OK).body(offers);
    }

    @GetMapping(value = "/clients/{appUserId}/offers/type/{offerType}")
    public ResponseEntity<List<Offer>> findAllOffersOfTypeOwnedByAppUser(@PathVariable("appUserId") Long appUserId, @PathVariable("offerType") OfferType offerType) {
        List<Offer> purchaseOffers = offerService.findAllOffersOfTypeOwnedByUser(appUserId, offerType);
        if (purchaseOffers.isEmpty())
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
        return ResponseEntity.status(HttpStatus.OK).body(purchaseOffers);
    }

    @GetMapping(value = "/clients/{appUserId}/appUserOffers")
    public ResponseEntity<List<Offer>> findAllOffersOwnedByAppUser(@PathVariable("appUserId") Long appUserId) {
        List<Offer> offers = offerService.findAllOffersOwnedByUser(appUserId);
        if (offers.isEmpty())
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
        return ResponseEntity.status(HttpStatus.OK).body(offers);
    }

    @GetMapping(value = "/clients/{appUserId}/appUserChosenOffers")
    public ResponseEntity<List<Offer>> findAllOffersChosenByAppUser(@PathVariable("appUserId") Long appUserId) {
        List<Offer> offers = offerService.findAllOffersChosenByUser(appUserId);
        if (offers.isEmpty())
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
        return ResponseEntity.status(HttpStatus.OK).body(offers);
    }

    @GetMapping(value = "/clients/{clientId}/allSellOffers")
    public ResponseEntity<List<Offer>> getAllSellOffersAssignedToClient(@PathVariable("clientId") Long clientId) {
        final List<Offer> selOffers = offerService.getAllSellOffersAssignedToClient(clientId);
        if (selOffers.isEmpty())
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
        return ResponseEntity.status(HttpStatus.OK).body(selOffers);
    }

    @GetMapping(value = "/clients/{clientId}/allPurchaseOffers")
    public ResponseEntity<List<Offer>> getAllPurchaseOffersAssignedToClient(@PathVariable("clientId") Long clientId) {
        List<Offer> purchaseOffers = offerService.getAllPurchaseOffersAssignedToClient(clientId);
        if (purchaseOffers.isEmpty())
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
        return ResponseEntity.status(HttpStatus.OK).body(purchaseOffers);
    }

//    @GetMapping(value = "/clients/{clientId}/purchaseOffers/{offerId}")
//    public ResponseEntity<Offer> getClientPurchaseOffer(@PathVariable("clientId") Long clientId,
//                                                        @PathVariable("offerId") Long offerId) {
//        Optional<Offer> oOffer = offerService.getOnePurchaseOfferOfClient(clientId, offerId);
//
//        if (oOffer.isEmpty())
//            return ResponseEntity
//                    .status(HttpStatus.NOT_FOUND)
//                    .body(null);
//
//        return ResponseEntity.status(HttpStatus.OK).body(oOffer.get());
//    }

//    @GetMapping(value = "/clients/{clientId}/sellOffers/{offerId}")
//    public ResponseEntity<Offer> getClientSellOffer(@PathVariable("clientId") Long clientId,
//                                                    @PathVariable("offerId") Long offerId) {
//        Optional<Offer> oOffer = offerService.getOneSellOfferOfClient(clientId, offerId);
//
//        if (oOffer.isEmpty())
//            return ResponseEntity
//                    .status(HttpStatus.NOT_FOUND)
//                    .body(null);
//
//        return ResponseEntity.status(HttpStatus.OK).body(oOffer.get());
//    }

    @PostMapping(path = "/offers/{clientId}")
    public ResponseEntity<Offer> createOffer(@PathVariable Long clientId, @Valid @RequestBody CreateOfferDTO offerDTO) {
        Optional<AppUser> oAppUser = appUserService.find(clientId);
        if (oAppUser.isEmpty())
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        return offerService.createOffer(offerService.mapCreateOfferDTOToOffer(offerDTO), oAppUser.get())
                .map(value -> ResponseEntity
                        .status(HttpStatus.CREATED)
                        .body(value))
                .orElseGet(() -> ResponseEntity
                        .status(HttpStatus.BAD_REQUEST)
                        .body(null));
    }

    @PutMapping(value = "/offers")
    public ResponseEntity<Offer> updateOffer(@Valid @RequestBody OfferDTO offerDTO) {
        return offerService.modifyOffer(offerService.mapOfferDTOToOffer(offerDTO))
                .map(modifiedOffer -> ResponseEntity.status(HttpStatus.OK).body(modifiedOffer))
                .orElse(ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null));
    }

}
