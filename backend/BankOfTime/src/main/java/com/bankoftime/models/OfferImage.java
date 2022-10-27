package com.bankoftime.models;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

@Entity
@Getter
@Setter
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

    @Column(nullable = false)
    @NotBlank
    private String url;
    @ManyToOne
    @JoinColumn(name = "OfferId", nullable = false)
    private Offer offer;

}
