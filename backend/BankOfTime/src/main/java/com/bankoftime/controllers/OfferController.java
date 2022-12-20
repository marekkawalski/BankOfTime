package com.bankoftime.controllers;

import com.bankoftime.dto.CreateOfferDTO;
import com.bankoftime.dto.OfferDTO;
import com.bankoftime.enums.OfferStatus;
import com.bankoftime.enums.OfferType;
import com.bankoftime.models.AppUser;
import com.bankoftime.models.Offer;
import com.bankoftime.services.AppUserService;
import com.bankoftime.services.OfferService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
public class OfferController {

    private static final String DEFAULT_PAGE_SIZE = " 10";
    private final OfferService offerService;

    private final AppUserService appUserService;

    public OfferController(OfferService offerService, AppUserService appUserService) {
        this.offerService = offerService;
        this.appUserService = appUserService;
    }

    @GetMapping(path = "/offers/{offerId:\\d*}")
    public ResponseEntity<Offer> getOfferById(@PathVariable Long offerId) {
        return offerService.findOffer(offerId)
                .map(offer -> ResponseEntity.status(HttpStatus.OK).body(offer))
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).body(null));
    }


    @GetMapping(path = "/offers")
    public ResponseEntity<Page<List<Offer>>> getOffers(@RequestParam(required = false, value = "type") OfferType offerType,
                                                       @RequestParam(required = false, value = "keyword") String keyword,
                                                       @RequestParam(required = false, value = "status") OfferStatus offerStatus,
                                                       @RequestParam(required = false, value = "category") String category,
                                                       @RequestParam(value = "sort", defaultValue = "title") String sortField,
                                                       @RequestParam(value = "sort-dir", defaultValue = "ASC") Sort.Direction sortDirection,
                                                       @RequestParam(value = "page-size", defaultValue = DEFAULT_PAGE_SIZE) Integer pageSize,
                                                       @RequestParam(value = "page-num", defaultValue = "0") Integer pageNum) {
        final Page<List<Offer>> offers = offerService.getSortedPagedAndFilteredOffers(sortField, pageSize, pageNum, offerType, offerStatus, sortDirection, keyword, category);
        if (offers.isEmpty())
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
        return ResponseEntity.status(HttpStatus.OK).body(offers);
    }

    @GetMapping(value = "/clients/{appUserId}/appUserOffers")
    public ResponseEntity<Page<List<Offer>>> getAllOffersOwnedByAppUser(@PathVariable("appUserId") Long appUserId,
                                                                        @RequestParam(required = false, value = "type") OfferType offerType,
                                                                        @RequestParam(required = false, value = "keyword") String keyword,
                                                                        @RequestParam(required = false, value = "status") OfferStatus offerStatus,
                                                                        @RequestParam(required = false, value = "category") String category,
                                                                        @RequestParam(value = "sort", defaultValue = "title") String sortField,
                                                                        @RequestParam(value = "sort-dir", defaultValue = "ASC") Sort.Direction sortDirection,
                                                                        @RequestParam(value = "page-size", defaultValue = DEFAULT_PAGE_SIZE) Integer pageSize,
                                                                        @RequestParam(value = "page-num", defaultValue = "0") Integer pageNum) {
        final Page<List<Offer>> offers = offerService.getPagedAndFilteredOffersOwnedByAppUser(sortField, pageSize, pageNum, appUserId, offerType, offerStatus, sortDirection, keyword, category);
        if (offers.isEmpty())
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
        return ResponseEntity.status(HttpStatus.OK).body(offers);
    }

    @GetMapping(value = "/clients/{appUserId}/appUserChosenOffers")
    public ResponseEntity<Page<List<Offer>>> getAllOffersChosenByAppUser(@PathVariable("appUserId") Long appUserId,
                                                                         @RequestParam(required = false, value = "type") OfferType offerType,
                                                                         @RequestParam(required = false, value = "keyword") String keyword,
                                                                         @RequestParam(required = false, value = "status") OfferStatus offerStatus,
                                                                         @RequestParam(required = false, value = "category") String category,
                                                                         @RequestParam(value = "sort", defaultValue = "title") String sortField,
                                                                         @RequestParam(value = "sort-dir", defaultValue = "ASC") Sort.Direction sortDirection,
                                                                         @RequestParam(value = "page-size", defaultValue = DEFAULT_PAGE_SIZE) Integer pageSize,
                                                                         @RequestParam(value = "page-num", defaultValue = "0") Integer pageNum) {
        final Page<List<Offer>> offers = offerService.getPagedAndFilteredOffersChosenByAppUser(sortField, pageSize, pageNum, appUserId, offerType, offerStatus, sortDirection, keyword, category);
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
        final List<Offer> purchaseOffers = offerService.getAllPurchaseOffersAssignedToClient(clientId);
        if (purchaseOffers.isEmpty())
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
        return ResponseEntity.status(HttpStatus.OK).body(purchaseOffers);
    }

    @PostMapping(path = "/offers/{clientId}")
    public ResponseEntity<Offer> createOffer(@PathVariable Long clientId, @Valid @RequestBody CreateOfferDTO offerDTO) {
        Optional<AppUser> oAppUser = appUserService.find(clientId);
        return oAppUser
                .map(appUser -> offerService.createOffer(offerService.mapCreateOfferDTOToOffer(offerDTO), appUser)
                        .map(value -> ResponseEntity
                                .status(HttpStatus.CREATED)
                                .body(value))
                        .orElseGet(() -> ResponseEntity
                                .status(HttpStatus.BAD_REQUEST)
                                .body(null)))
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body(null));
    }

    @PutMapping(value = "/offers")
    public ResponseEntity<Offer> updateOffer(@Valid @RequestBody OfferDTO offerDTO) {
        return offerService.modifyOffer(offerService.mapOfferDTOToOffer(offerDTO))
                .map(modifiedOffer -> ResponseEntity.status(HttpStatus.OK).body(modifiedOffer))
                .orElse(ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null));
    }

}
