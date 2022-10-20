package com.bankoftime.models;

import com.bankoftime.enums.OfferStatus;
import com.bankoftime.enums.OfferType;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.springframework.lang.Nullable;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Objects;

@Entity
@Getter
@Setter
@ToString
@RequiredArgsConstructor
@Table(name = "Offer")
public class Offer {
    @SequenceGenerator(
            name = "offer_sequence",
            sequenceName = "offer_sequence",
            allocationSize = 1
    )
    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "offer_sequence"
    )
    private Long id;

    @Column(name = "ShortDescription", nullable = false)
    @NotBlank
    private String shortDescription;

    @Column(name = "Price", nullable = false)
    private double price;

    @Column(name = "Title", nullable = false)
    @NotNull
    private String title;

    @Column(name = "Location")
    @Nullable
    private String location;

    @Basic
    @Column(name = "LongDescription")
    @Nullable
    private String longDescription;

    @Enumerated(EnumType.STRING)
    @Column(name = "OfferType", nullable = false)
    @NotNull
    private OfferType offerType;

    @Column(name = "State", nullable = false)
    @Enumerated(EnumType.STRING)
    @NotNull
    private OfferStatus state = OfferStatus.ACTIVE;

    @ManyToOne
    @JoinColumn(name = "SellerId")
    @Nullable
    private AppUser seller;

    @ManyToOne
    @JoinColumn(name = "BuyerId")
    @Nullable
    private AppUser buyer;

    @ManyToMany(mappedBy = "offers")
    @ToString.Exclude
    @NotNull
    private Collection<Category> categories = new ArrayList<>();

    @OneToMany(mappedBy = "offer")
    @ToString.Exclude
    @NotNull
    private Collection<OfferImage> images = new ArrayList<>();

    @OneToOne(mappedBy = "offer")
    @Nullable
    private TimeTransaction timeTransaction;

    @Override
    public int hashCode() {
        return Objects.hash(id, shortDescription, price, title, location, longDescription, offerType, state, seller, buyer, categories, images, timeTransaction);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        final Offer offer = (Offer) o;
        return Double.compare(offer.price, price) == 0 && id.equals(offer.id) && shortDescription.equals(offer.shortDescription) && title.equals(offer.title) && Objects.equals(location, offer.location) && Objects.equals(longDescription, offer.longDescription) && offerType == offer.offerType && state == offer.state && Objects.equals(seller, offer.seller) && Objects.equals(buyer, offer.buyer) && Objects.equals(categories, offer.categories) && Objects.equals(images, offer.images) && Objects.equals(timeTransaction, offer.timeTransaction);
    }
}
