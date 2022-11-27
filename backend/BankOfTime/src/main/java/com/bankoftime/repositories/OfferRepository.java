package com.bankoftime.repositories;

import com.bankoftime.enums.OfferStatus;
import com.bankoftime.enums.OfferType;
import com.bankoftime.models.Offer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OfferRepository extends JpaRepository<Offer, Long> {

    List<Offer> findByOfferType(OfferType offerType);

    List<Offer> findByOfferTypeAndState(OfferType offerType, OfferStatus offerStatus);

    List<Offer> findBySellerId(Long userId);

    @Query("select o from Offer o where o.seller.id = ?1 and o.offerType=com.bankoftime.enums.OfferType.SELL_OFFER")
    List<Offer> findAllSellOffersOwnedByUser(Long userId);

    @Query("select o from Offer o where o.buyer.id = ?1 and o.offerType=com.bankoftime.enums.OfferType.PURCHASE_OFFER")
    List<Offer> findAllPurchaseOffersOwnedByUser(Long userId);

    @Query("select o from Offer o where o.buyer.id = ?1 and o.offerType=com.bankoftime.enums.OfferType.PURCHASE_OFFER or " +
            "o.seller.id =?1 and o.offerType=com.bankoftime.enums.OfferType.SELL_OFFER")
    List<Offer> findAllOffersOwnedByUser(Long userId);

    @Query("select o from Offer o where o.buyer.id = ?1 and o.offerType=com.bankoftime.enums.OfferType.SELL_OFFER or " +
            "o.seller.id =?1 and o.offerType=com.bankoftime.enums.OfferType.PURCHASE_OFFER")
    List<Offer> findAllOffersChosenByUser(Long userId);

    List<Offer> findByBuyerId(Long clientId);

    Optional<Offer> findByIdAndSellerId(Long offerId, Long sellerId);

    Optional<Offer> findByIdAndBuyerId(Long offerId, Long buyerId);
}
