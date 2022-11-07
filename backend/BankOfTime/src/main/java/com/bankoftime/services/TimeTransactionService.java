package com.bankoftime.services;

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

    Optional<Double> calculateClientAccountBalance(Long clientId);

}
