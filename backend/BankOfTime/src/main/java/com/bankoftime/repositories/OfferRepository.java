package com.bankoftime.repositories;

import com.bankoftime.enums.OfferStatus;
import com.bankoftime.enums.OfferType;
import com.bankoftime.models.Offer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OfferRepository extends JpaRepository<Offer, Long> {

    List<Offer> findByOfferType(OfferType offerType);

    List<Offer> findByOfferTypeAndState(OfferType offerType, OfferStatus offerStatus);

    List<Offer> findBySellerId(Long userId);

    List<Offer> findByBuyerId(Long clientId);

    Optional<Offer> findByIdAndSellerId(Long offerId, Long sellerId);

    Optional<Offer> findByIdAndBuyerId(Long offerId, Long buyerId);
}
