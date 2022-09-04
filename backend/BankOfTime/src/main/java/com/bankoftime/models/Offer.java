package com.bankoftime.models;

import com.bankoftime.enums.OfferStatus;
import com.bankoftime.enums.OfferType;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Collection;

@Entity
@Getter
@Setter
public class Offer {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "Id")
    private long id;
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
    @Column(name = "OfferType")
    private OfferType offerType;
    @Basic
    @Column(name = "State")
    private OfferStatus state;
    @ManyToOne
    @JoinColumn(name = "SellerId", referencedColumnName = "Id", nullable = false)
    private User seller;
    @ManyToOne
    @JoinColumn(name = "BuyerId", referencedColumnName = "Id")
    private User buyer;
    @ManyToMany(mappedBy = "offers")
    private Collection<Category> categories = new java.util.ArrayList<>();
    @OneToMany(mappedBy = "offer")
    private Collection<OfferImage> images;
    @OneToOne(mappedBy = "offer")
    private Transaction transaction;
}
