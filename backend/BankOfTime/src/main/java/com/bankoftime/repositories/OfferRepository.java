package com.bankoftime.repositories;

import com.bankoftime.enums.OfferStatus;
import com.bankoftime.enums.OfferType;
import com.bankoftime.models.Offer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface OfferRepository extends JpaRepository<Offer, Long> {

    List<Offer> findBySellerId(Long userId);

    List<Offer> findByBuyerId(Long clientId);

    @Query(value = "select o from Offer o where (:offerType is null or (:offerType = o.offerType)) and (:offerStatus is null or (:offerStatus = o.offerStatus)) " +
            " and (:keyword is null or (o.title like %:keyword% or o.shortDescription like %:keyword%)) and (:category is null or (:category in (select c.name from o.categories c)))")
    Page<List<Offer>> findAllOffers(final Pageable pageable, @Param("offerType") OfferType offerType, @Param("offerStatus") OfferStatus offerStatus,
                                    @Param("keyword") String keyword, @Param("category") String category);

    @Query(value = "select o from Offer o where (o.buyer.id = :userId and o.offerType=com.bankoftime.enums.OfferType.PURCHASE_OFFER or " +
            "o.seller.id = :userId and o.offerType=com.bankoftime.enums.OfferType.SELL_OFFER) and (:offerType is null or (:offerType = o.offerType)) and (:offerStatus is null or (:offerStatus = o.offerStatus)) " +
            " and (:keyword is null or (o.title like %:keyword% or o.shortDescription like %:keyword%)) and (:category is null or (:category in (select c.name from o.categories c)))")
    Page<List<Offer>> findAllOffersOwnedByUser(final Pageable pageable, @Param("userId") Long userId, @Param("offerType") OfferType offerType, @Param("offerStatus") OfferStatus offerStatus, @Param("keyword") String keyword,
                                               @Param("category") String category);

    @Query(value = "select o from Offer o where (o.buyer.id =:userId and o.offerType=com.bankoftime.enums.OfferType.SELL_OFFER or " +
            "o.seller.id =:userId and o.offerType=com.bankoftime.enums.OfferType.PURCHASE_OFFER) and (:offerType is null or (:offerType = o.offerType)) and (:offerStatus is null or (:offerStatus = o.offerStatus))  " +
            " and (:keyword is null or (o.title like %:keyword% or o.shortDescription like %:keyword%)) and (:category is null or (:category in (select c.name from o.categories c)))")
    Page<List<Offer>> findAllOffersChosenByUser(final Pageable pageable, @Param("userId") Long userId, @Param("offerType") OfferType offerType, @Param("offerStatus") OfferStatus offerStatus, @Param("keyword") String keyword,
                                                @Param("category") String category);

    @Transactional
    @Modifying
    @Query("UPDATE Offer o SET o.offerStatus = com.bankoftime.enums.OfferStatus.DELETED  where (o.buyer.id = :userId and o.offerType=com.bankoftime.enums.OfferType.PURCHASE_OFFER or " +
            "o.seller.id = :userId and o.offerType=com.bankoftime.enums.OfferType.SELL_OFFER) and (o.offerStatus = com.bankoftime.enums.OfferStatus.ACTIVE or o.offerStatus = com.bankoftime.enums.OfferStatus.ON_HOLD )")
    void updateDisabledUserOffers(@Param("userId") Long userId);

}
