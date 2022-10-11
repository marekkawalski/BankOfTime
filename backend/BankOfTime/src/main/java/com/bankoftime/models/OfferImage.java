package com.bankoftime.models;

import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Accessors(fluent = true)
@Table(name = "OfferImage")
public class OfferImage {
    @SequenceGenerator(
            name = "offer_image_sequence",
            sequenceName = "offer_image_sequence",
            allocationSize = 1
    )
    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "offer_image_sequence"
    )
    private Long id;
    @Column(name = "Url", nullable = false)
    private String url;
    @ManyToOne
    @JoinColumn(name = "OfferId", nullable = false)
    private Offer offer;

}
