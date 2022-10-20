package com.bankoftime.repositories;

import com.bankoftime.enums.OfferType;
import com.bankoftime.models.Offer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OfferRepository extends JpaRepository<Offer, Long> {

    List<Offer> findByOfferType(OfferType offerType);
}
