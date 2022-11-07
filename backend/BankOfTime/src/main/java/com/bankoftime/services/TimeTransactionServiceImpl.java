package com.bankoftime.services;

import com.bankoftime.models.TimeTransaction;
import com.bankoftime.repositories.TimeTransactionRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TimeTransactionServiceImpl implements TimeTransactionService {

    private final TimeTransactionRepository timeTransactionRepository;

    public TimeTransactionServiceImpl(TimeTransactionRepository timeTransactionRepository) {
        this.timeTransactionRepository = timeTransactionRepository;
    }

    @Override
    public Optional<TimeTransaction> createTimeTransaction(TimeTransaction timeTransaction) {
        return Optional.of(timeTransactionRepository.save(timeTransaction));
    }

    @Override
    public Optional<TimeTransaction> findTimeTransaction(Long transactionId) {
        return timeTransactionRepository.findById(transactionId);
    }

    @Override
    public List<TimeTransaction> getAllClientTransactions(Long clientId) {
        return timeTransactionRepository.findAllClientTransactions(clientId);
    }

    @Override
    public List<TimeTransaction> getAllClientSellTransactions(Long clientId) {
        return timeTransactionRepository.findAllBySellerId(clientId);
    }

    @Override
    public List<TimeTransaction> getAllClientPurchaseTransactions(Long clientId) {
        return timeTransactionRepository.findAllByBuyerId(clientId);
    }

    @Override
    public Optional<TimeTransaction> modifyTimeTransaction(TimeTransaction timeTransactionToSave) {
        return timeTransactionRepository.findById(timeTransactionToSave.getId())
                .map(timeTransaction ->
                {
                    timeTransaction.setBuyer(timeTransactionToSave.getBuyer());
                    timeTransaction.setTransactionStatus(timeTransactionToSave.getTransactionStatus());
                    timeTransaction.setSeller(timeTransactionToSave.getSeller());
                    timeTransaction.setOffer(timeTransactionToSave.getOffer());
                    return Optional.of(timeTransaction);
                })
                .orElse(Optional.empty());
    }

    @Override
    public Optional<Double> calculateClientAccountBalance(Long clientId) {
        return Optional.empty();
    }
}
