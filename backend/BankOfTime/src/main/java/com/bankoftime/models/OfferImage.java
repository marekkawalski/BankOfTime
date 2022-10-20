package com.bankoftime.models;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.Objects;

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

    @Column(name = "Url", nullable = false)
    @NotBlank
    private String url;
    @ManyToOne
    @JoinColumn(name = "OfferId", nullable = false)
    private Offer offer;

    @Override
    public int hashCode() {
        return Objects.hash(id, url, offer);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        final OfferImage that = (OfferImage) o;
        return id.equals(that.id) && url.equals(that.url) && Objects.equals(offer, that.offer);
    }
}
