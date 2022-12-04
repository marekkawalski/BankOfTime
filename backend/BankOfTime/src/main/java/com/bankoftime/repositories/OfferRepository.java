package com.bankoftime.repositories;

import com.bankoftime.enums.OfferStatus;
import com.bankoftime.enums.OfferType;
import com.bankoftime.models.Offer;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OfferRepository extends JpaRepository<Offer, Long> {

    List<Offer> findBySellerId(Long userId);

    List<Offer> findByBuyerId(Long clientId);

    @Query("select o from Offer o where ((:offerType is null or (:offerType = o.offerType)) and (:offerStatus is null or (:offerStatus = o.state)))")
    List<Offer> findAllOffers(PageRequest pageRequest, @Param("offerType") OfferType offerType, @Param("offerStatus") OfferStatus offerStatus);

    @Query("select o from Offer o where (o.buyer.id = :userId and o.offerType=com.bankoftime.enums.OfferType.PURCHASE_OFFER or " +
            "o.seller.id = :userId and o.offerType=com.bankoftime.enums.OfferType.SELL_OFFER) and (:offerType is null or (:offerType = o.offerType)) and (:offerStatus is null or (:offerStatus = o.state))")
    List<Offer> findAllOffersOwnedByUser(PageRequest pageRequest, @Param("userId") Long userId, @Param("offerType") OfferType offerType, @Param("offerStatus") OfferStatus offerStatus);

    @Query("select o from Offer o where (o.buyer.id =:userId and o.offerType=com.bankoftime.enums.OfferType.SELL_OFFER or " +
            "o.seller.id =:userId and o.offerType=com.bankoftime.enums.OfferType.PURCHASE_OFFER) and (:offerType is null or (:offerType = o.offerType)) and (:offerStatus is null or (:offerStatus = o.state))")
    List<Offer> findAllOffersChosenByUser(PageRequest pageRequest, @Param("userId") Long userId, @Param("offerType") OfferType offerType, @Param("offerStatus") OfferStatus offerStatus);

}
