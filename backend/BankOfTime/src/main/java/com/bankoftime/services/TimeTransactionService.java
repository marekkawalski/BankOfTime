package com.bankoftime.services;

import com.bankoftime.exceptions.TimeTransactionException;
import com.bankoftime.models.AppUser;
import com.bankoftime.models.Offer;
import com.bankoftime.models.TimeTransaction;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Optional;

public interface TimeTransactionService {

    Optional<Offer> requestApproval(final Long sellerId, final Long buyerId, final Long offerId) throws TimeTransactionException;

    Optional<Offer> rejectPendingApproval(final Long offerId) throws TimeTransactionException;

    Optional<TimeTransaction> makeTransaction(final Long sellerId, final Long buyerId, final Long offerId) throws TimeTransactionException;

    Page<List<TimeTransaction>> getSortedPagedAndFilteredTimeTransactions(final String sortField, final Integer pageSize, final Integer pageNum, final Long clientId) throws TimeTransactionException;

    Optional<Double> calculateClientAccountBalance(final Long clientId);

    double calculateClientAccountBalance(final AppUser client);
}
