package com.bankoftime.controllers;

import com.bankoftime.exceptions.TimeTransactionException;
import com.bankoftime.models.Offer;
import com.bankoftime.models.TimeTransaction;
import com.bankoftime.services.TimeTransactionService;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
public class TimeTransactionController {
    private static final String DEFAULT_PAGE_SIZE = " 10";
    private final TimeTransactionService timeTransactionService;

    public TimeTransactionController(final TimeTransactionService timeTransactionService) {
        this.timeTransactionService = timeTransactionService;
    }

    @GetMapping(path = "clients/{id}/timeTransactions")
    public ResponseEntity<Page<List<TimeTransaction>>> getTransactions(@PathVariable("id") Long id,
                                                                       @RequestParam(value = "sort", defaultValue = "transactionDate") String sortField,
                                                                       @RequestParam(value = "page-size", defaultValue = DEFAULT_PAGE_SIZE) Integer pageSize,
                                                                       @RequestParam(value = "page-num", defaultValue = "0") Integer pageNum) {
        final Page<List<TimeTransaction>> transactions;
        try {
            transactions = timeTransactionService.getSortedPagedAndFilteredTimeTransactions(sortField, pageSize, pageNum, id);
        } catch (TimeTransactionException e) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, e.getMessage(), e.getCause());
        }
        if (transactions.isEmpty())
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
        return ResponseEntity.status(HttpStatus.OK).body(transactions);
    }

    @PostMapping(path = "timeTransactions/offers/{offerId}/seller/{sellerId}/buyer/{buyerId}")
    public ResponseEntity<TimeTransaction> createTimeTransaction(@PathVariable Long offerId, @PathVariable Long sellerId,
                                                                 @PathVariable Long buyerId) {
        try {
            return timeTransactionService.makeTransaction(sellerId, buyerId, offerId)
                    .map(timeTransaction -> ResponseEntity.status(HttpStatus.OK).body(timeTransaction))
                    .orElse(ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null));
        } catch (TimeTransactionException e) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, e.getMessage(), e.getCause());
        }
    }

    @PutMapping(path = "timeTransactions/offers/{offerId}/seller/{sellerId}/buyer/{buyerId}")
    public ResponseEntity<Offer> requestApproval(@PathVariable Long offerId, @PathVariable Long sellerId,
                                                 @PathVariable Long buyerId) {
        try {
            return timeTransactionService.requestApproval(sellerId, buyerId, offerId)
                    .map(timeTransaction -> ResponseEntity.status(HttpStatus.OK).body(timeTransaction))
                    .orElse(ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null));
        } catch (TimeTransactionException e) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, e.getMessage(), e.getCause());
        }
    }

    @PutMapping(path = "timeTransactions/offers/{offerId}/rejectPendingApproval")
    public ResponseEntity<Offer> rejectPendingApproval(@PathVariable Long offerId) {
        try {
            return timeTransactionService.rejectPendingApproval(offerId)
                    .map(timeTransaction -> ResponseEntity.status(HttpStatus.OK).body(timeTransaction))
                    .orElse(ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null));
        } catch (TimeTransactionException e) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, e.getMessage(), e.getCause());
        }
    }

}
