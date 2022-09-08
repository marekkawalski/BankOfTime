package com.bankoftime.models;

import com.bankoftime.enums.OfferStatus;
import com.bankoftime.enums.OfferType;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;

import javax.persistence.*;
import java.util.Collection;

@Entity
@Getter
@Setter
@Accessors(fluent = true)
public class Offer {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "Id")
    private Long id;
    @Basic
    @Column(name = "ShortDescription")
    private String shortDescription;
    @Basic
    @Column(name = "Price")
    private double price;
    @Basic
    @Column(name = "Title")
    private String title;
    @Basic
    @Column(name = "Location")
    private String location;
    @Basic
    @Column(name = "LongDescription")
    private String longDescription;
    @Basic
    @Enumerated(EnumType.STRING)
    @Column(name = "OfferType")
    private OfferType offerType;
    @Basic
    @Column(name = "State")
    @Enumerated(EnumType.STRING)
    private OfferStatus state;
    @ManyToOne
    @JoinColumn(name = "SellerId", nullable = false)
    private User seller;
    @ManyToOne
    @JoinColumn(name = "BuyerId")
    private User buyer;
    @ManyToMany(mappedBy = "offers")
    private Collection<Category> categories = new java.util.ArrayList<>();
    @OneToMany(mappedBy = "offer")
    private Collection<OfferImage> images;
    @OneToOne(mappedBy = "offer")
    private Transaction transaction;
}
