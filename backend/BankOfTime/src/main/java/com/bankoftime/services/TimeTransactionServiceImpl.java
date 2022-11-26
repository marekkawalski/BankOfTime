package com.bankoftime.services;

import com.bankoftime.enums.OfferStatus;
import com.bankoftime.enums.TransactionStatus;
import com.bankoftime.exceptions.TimeTransactionException;
import com.bankoftime.models.AppUser;
import com.bankoftime.models.Offer;
import com.bankoftime.models.TimeTransaction;
import com.bankoftime.repositories.TimeTransactionRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class TimeTransactionServiceImpl implements TimeTransactionService {

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


    @Transactional
    @Override
    public Optional<TimeTransaction> makeTransaction(final Long sellerId, final Long buyerId, final Long offerId) throws TimeTransactionException {
        Optional<Offer> oOffer = offerService.findOffer(offerId);
        if (oOffer.isEmpty())
            throw new TimeTransactionException("Offer doesn't exist");
        Optional<AppUser> oSeller = appUserService.find(sellerId);
        if (oSeller.isEmpty())
            throw new TimeTransactionException("Seller doesn't exist");
        Optional<AppUser> oBuyer = appUserService.find(buyerId);
        if (oBuyer.isEmpty())
            throw new TimeTransactionException("Buyer doesn't exist");
        Offer offer = oOffer.get();
        AppUser buyer = oBuyer.get();
        AppUser seller = oSeller.get();

        if (offer.getState() != OfferStatus.ACTIVE)
            throw new TimeTransactionException("Offer is not active!");

        if (offer.getSeller() != seller)
            throw new TimeTransactionException("Seller isn't the owner of the offer!");

        TimeTransaction timeTransaction = new TimeTransaction(LocalDateTime.now(), offer, buyer, seller);

        if (appUserService.calculateClientAccountBalance(buyer) < offer.getPrice()) {
            timeTransaction.setTransactionStatus(TransactionStatus.DECLINED);
            timeTransactionRepository.save(timeTransaction);
            throw new TimeTransactionException("Not enough credits");
        }

        offer.setState(OfferStatus.UNAVAILABLE);
        offer.setBuyer(buyer);
        offer.setSeller(seller);
        timeTransaction.setTransactionStatus(TransactionStatus.FINISHED);
        buyer.getPurchaseTransactions().add(timeTransaction);
        seller.getSellTransactions().add(timeTransaction);

        offerService.modifyOffer(offer);
        timeTransactionRepository.save(timeTransaction);
        appUserService.modifyAppUser(buyer);
        appUserService.modifyAppUser(seller);

        return Optional.of(timeTransaction);

    }

}
