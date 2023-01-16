package com.bankoftime.models;

import com.bankoftime.utils.Constants;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.Size;

@Entity
@Getter
@Setter
@Table(name = "OfferImage")
@NoArgsConstructor
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

    @Size(max = Constants.MAX_IMAGE_SIZE, message = "Image is too large!")
    @Column(length = Constants.MAX_IMAGE_SIZE)
    private byte[] photoData;
    @ManyToOne
    @JoinColumn(name = "OfferId", nullable = false)
    @JsonIgnore
    private Offer offer;

    public OfferImage(final byte[] photoData) {
        this.photoData = photoData;
    }

    public OfferImage(final byte[] photoData, final Offer offer) {
        this.photoData = photoData;
        this.offer = offer;
    }
}
