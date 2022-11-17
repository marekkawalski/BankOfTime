package com.bankoftime.controllers;

import com.bankoftime.exceptions.TimeTransactionException;
import com.bankoftime.models.TimeTransaction;
import com.bankoftime.services.TimeTransactionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = {"http://localhost:3000"})
public class TimeTransactionController {

    private final TimeTransactionService timeTransactionService;

    public TimeTransactionController(final TimeTransactionService timeTransactionService) {
        this.timeTransactionService = timeTransactionService;
    }

    @PostMapping(path = "timeTransactions/offers/{offerId}/seller/{sellerId}/buyer/{buyerId}")
    public ResponseEntity<TimeTransaction> createTimeTransaction(@PathVariable Long offerId, @PathVariable Long sellerId,
                                                                 @PathVariable Long buyerId) throws TimeTransactionException {
        try {
            return timeTransactionService.makeTransaction(sellerId, buyerId, offerId)
                    .map(timeTransaction -> ResponseEntity.status(HttpStatus.OK).body(timeTransaction))
                    .orElse(ResponseEntity.status(HttpStatus.NO_CONTENT).body(null));
        } catch (TimeTransactionException e) {
            throw new TimeTransactionException(e.getMessage());
        }

    }

}
