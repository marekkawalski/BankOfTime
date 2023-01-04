package com.bankoftime.services;

import com.bankoftime.enums.OfferStatus;
import com.bankoftime.enums.OfferType;
import com.bankoftime.enums.TransactionStatus;
import com.bankoftime.exceptions.TimeTransactionException;
import com.bankoftime.models.AppUser;
import com.bankoftime.models.Offer;
import com.bankoftime.models.TimeTransaction;
import com.bankoftime.repositories.TimeTransactionRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class TimeTransactionServiceImpl implements TimeTransactionService {

    private static final double BONUS_CREDIT = 5;
    private final TimeTransactionRepository timeTransactionRepository;
    private final OfferService offerService;
    private final AppUserService appUserService;


    public TimeTransactionServiceImpl(TimeTransactionRepository timeTransactionRepository, final OfferService offerService, final AppUserService appUserService) {
        this.timeTransactionRepository = timeTransactionRepository;
        this.offerService = offerService;
        this.appUserService = appUserService;
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
    public Optional<Offer> requestApproval(final Long sellerId, final Long buyerId, final Long offerId) throws TimeTransactionException {
        final Optional<Offer> oOffer = offerService.findOffer(offerId);
        if (oOffer.isEmpty())
            throw new TimeTransactionException("Offer doesn't exist");
        final Optional<AppUser> oSeller = appUserService.findById(sellerId);
        if (oSeller.isEmpty())
            throw new TimeTransactionException("Seller doesn't exist");
        final Optional<AppUser> oBuyer = appUserService.findById(buyerId);
        if (oBuyer.isEmpty())
            throw new TimeTransactionException("Buyer doesn't exist");

        final Offer offer = oOffer.get();
        final AppUser buyer = oBuyer.get();
        final AppUser seller = oSeller.get();

        if (this.calculateClientAccountBalance(buyer) < offer.getPrice()) {
            throw new TimeTransactionException("Not enough credits");
        }

        offer.setState(OfferStatus.ON_HOLD);
        offer.setBuyer(buyer);
        offer.setSeller(seller);
        offerService.modifyOffer(offer);
        return Optional.of(offer);
    }

    @Override
    public Optional<Offer> rejectPendingApproval(final Long offerId) throws TimeTransactionException {
        final Optional<Offer> oOffer = offerService.findOffer(offerId);
        if (oOffer.isEmpty())
            throw new TimeTransactionException("Offer doesn't exist");
        final Offer offer = oOffer.get();
        offer.setState(OfferStatus.ACTIVE);
        if (offer.getOfferType() == OfferType.SELL_OFFER) {
            offer.setBuyer(null);
        } else {
            offer.setSeller(null);
        }
        offerService.modifyOffer(offer);
        return Optional.of(offer);
    }


    @Transactional
    @Override
    public Optional<TimeTransaction> makeTransaction(final Long sellerId, final Long buyerId, final Long offerId) throws TimeTransactionException {
        final Optional<Offer> oOffer = offerService.findOffer(offerId);
        if (oOffer.isEmpty())
            throw new TimeTransactionException("Offer doesn't exist");
        final Optional<AppUser> oSeller = appUserService.findById(sellerId);
        if (oSeller.isEmpty())
            throw new TimeTransactionException("Seller doesn't exist");
        final Optional<AppUser> oBuyer = appUserService.findById(buyerId);
        if (oBuyer.isEmpty())
            throw new TimeTransactionException("Buyer doesn't exist");
        final Offer offer = oOffer.get();
        final AppUser buyer = oBuyer.get();
        final AppUser seller = oSeller.get();

        if (offer.getState() != OfferStatus.ACTIVE && offer.getState() != OfferStatus.ON_HOLD)
            throw new TimeTransactionException("Offer is not active!");
        if (offer.getState() == OfferStatus.ON_HOLD && offer.getSeller() != seller)
            throw new TimeTransactionException("Seller is not assigned to offer!");
        if (offer.getState() == OfferStatus.ON_HOLD && offer.getBuyer() != buyer)
            throw new TimeTransactionException("Buyer is not assigned to offer!");

        final TimeTransaction timeTransaction = new TimeTransaction(LocalDateTime.now(), offer, buyer, seller);

        if (this.calculateClientAccountBalance(buyer) < offer.getPrice()) {
            timeTransaction.setTransactionStatus(TransactionStatus.DECLINED);
            timeTransactionRepository.save(timeTransaction);
            throw new TimeTransactionException("Not enough credits");
        }
        offer.setState(OfferStatus.APPROVED);
        offer.setBuyer(buyer);
        offer.setSeller(seller);
        timeTransaction.setTransactionStatus(TransactionStatus.FINISHED);
        offerService.modifyOffer(offer);
        timeTransactionRepository.save(timeTransaction);
        appUserService.modifyAppUser(buyer);
        appUserService.modifyAppUser(seller);

        return Optional.of(timeTransaction);
    }

    @Override
    public Page<List<TimeTransaction>> getSortedPagedAndFilteredTimeTransactions(final String sortField, final Integer pageSize, final Integer pageNum, final Long clientId) throws TimeTransactionException {
        if (appUserService.findById(clientId).isEmpty()) throw new TimeTransactionException("AppUser doesn't exist");
        return timeTransactionRepository.findAllClientTransactions(PageRequest.of(pageNum, pageSize, Sort.by(Sort.Direction.ASC, sortField)), clientId);
    }

    @Override
    public Optional<Double> calculateClientAccountBalance(Long clientId) {
        return appUserService.findById(clientId).map(this::calculateClientAccountBalance);
    }

    @Override
    public double calculateClientAccountBalance(AppUser client) {
        return client.getSellTransactions().stream().filter(transaction -> transaction.getTransactionStatus() == TransactionStatus.FINISHED)
                .mapToDouble(transaction -> transaction.getOffer().getPrice()).sum() + BONUS_CREDIT
                - client.getPurchaseTransactions().stream().filter(transaction -> transaction.getTransactionStatus() == TransactionStatus.FINISHED)
                .mapToDouble(transaction -> transaction.getOffer().getPrice()).sum();
    }

}
