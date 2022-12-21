package com.bankoftime.services;

import com.bankoftime.exceptions.TimeTransactionException;
import com.bankoftime.models.Offer;
import com.bankoftime.models.TimeTransaction;

import java.util.List;
import java.util.Optional;

public interface TimeTransactionService {
    Optional<TimeTransaction> createTimeTransaction(TimeTransaction timeTransaction);

    Optional<TimeTransaction> findTimeTransaction(Long transactionId);

    List<TimeTransaction> getAllClientTransactions(Long clientId);

    List<TimeTransaction> getAllClientSellTransactions(Long clientId);

    List<TimeTransaction> getAllClientPurchaseTransactions(Long clientId);

    Optional<TimeTransaction> modifyTimeTransaction(TimeTransaction timeTransactionToSave);

    Optional<Offer> requestApproval(final Long sellerId, final Long buyerId, final Long offerId) throws TimeTransactionException;

    Optional<Offer> rejectPendingApproval(Long offerId) throws TimeTransactionException;

    Optional<TimeTransaction> makeTransaction(final Long sellerId, final Long buyerId, final Long offerId) throws TimeTransactionException;

}
