package com.bankoftime.repositories;

import com.bankoftime.models.OfferImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OfferImageRepository extends JpaRepository<OfferImage, Long> {

    List<OfferImage> findOfferImagesByOfferId(Long offerId);
}
