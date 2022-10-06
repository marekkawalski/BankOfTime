package com.bankoftime.models;

import com.bankoftime.enums.OfferStatus;
import com.bankoftime.enums.OfferType;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;

@Entity
@Getter
@Setter
@Accessors(fluent = true)
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
    private String shortDescription;
    @Column(name = "Price", nullable = false)
    private double price;
    @Column(name = "Title", nullable = false)
    private String title;
    @Basic
    @Column(name = "Location")
    private String location;
    @Basic
    @Column(name = "LongDescription")
    private String longDescription;
    @Enumerated(EnumType.STRING)
    @Column(name = "OfferType", nullable = false)
    private OfferType offerType;
    @Basic
    @Column(name = "State")
    @Enumerated(EnumType.STRING)
    private OfferStatus state;
    @ManyToOne
    @JoinColumn(name = "SellerId")
    private AppUser seller;
    @ManyToOne
    @JoinColumn(name = "BuyerId")
    private AppUser buyer;
    @ManyToMany(mappedBy = "offers")
    private Collection<Category> categories = new ArrayList<>();
    @OneToMany(mappedBy = "offer")
    private Collection<OfferImage> images;
    @OneToOne(mappedBy = "offer")
    private TimeTransaction timeTransaction;
}
