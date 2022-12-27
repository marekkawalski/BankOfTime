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
        Optional<Offer> oOffer = offerService.findOffer(offerId);
        if (oOffer.isEmpty())
            throw new TimeTransactionException("Offer doesn't exist");
        Optional<AppUser> oSeller = appUserService.findById(sellerId);
        if (oSeller.isEmpty())
            throw new TimeTransactionException("Seller doesn't exist");
        Optional<AppUser> oBuyer = appUserService.findById(buyerId);
        if (oBuyer.isEmpty())
            throw new TimeTransactionException("Buyer doesn't exist");

        Offer offer = oOffer.get();
        AppUser buyer = oBuyer.get();
        AppUser seller = oSeller.get();

        if (appUserService.calculateClientAccountBalance(buyer) < offer.getPrice()) {
            throw new TimeTransactionException("Not enough credits");
        }

        offer.setState(OfferStatus.ON_HOLD);
        offer.setBuyer(buyer);
        offer.setSeller(seller);
        offerService.modifyOffer(offer);
        return Optional.of(offer);
    }

    @Override
    public Optional<Offer> rejectPendingApproval(Long offerId) throws TimeTransactionException {
        Optional<Offer> oOffer = offerService.findOffer(offerId);
        if (oOffer.isEmpty())
            throw new TimeTransactionException("Offer doesn't exist");
        Offer offer = oOffer.get();
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
        Optional<Offer> oOffer = offerService.findOffer(offerId);
        if (oOffer.isEmpty())
            throw new TimeTransactionException("Offer doesn't exist");
        Optional<AppUser> oSeller = appUserService.findById(sellerId);
        if (oSeller.isEmpty())
            throw new TimeTransactionException("Seller doesn't exist");
        Optional<AppUser> oBuyer = appUserService.findById(buyerId);
        if (oBuyer.isEmpty())
            throw new TimeTransactionException("Buyer doesn't exist");
        Offer offer = oOffer.get();
        AppUser buyer = oBuyer.get();
        AppUser seller = oSeller.get();

        //todo check if is onhold and buyer is correct
        if (!(offer.getState() != OfferStatus.ACTIVE || offer.getState() != OfferStatus.ON_HOLD))
            throw new TimeTransactionException("Offer is not active!");

        TimeTransaction timeTransaction = new TimeTransaction(LocalDateTime.now(), offer, buyer, seller);

        if (appUserService.calculateClientAccountBalance(buyer) < offer.getPrice()) {
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

}
