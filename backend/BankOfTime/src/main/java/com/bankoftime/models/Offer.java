package com.bankoftime.models;

import com.bankoftime.enums.OfferStatus;
import com.bankoftime.enums.OfferType;

import javax.persistence.*;
import java.util.Collection;

@Entity
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

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getShortDescription() {
        return shortDescription;
    }

    public void setShortDescription(String shortDescription) {
        this.shortDescription = shortDescription;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getLongDescription() {
        return longDescription;
    }

    public void setLongDescription(String longDescription) {
        this.longDescription = longDescription;
    }

    public OfferType getOfferType() {
        return offerType;
    }

    public void setOfferType(OfferType offerType) {
        this.offerType = offerType;
    }

    public OfferStatus getState() {
        return state;
    }

    public void setState(OfferStatus state) {
        this.state = state;
    }

    public User getSeller() {
        return seller;
    }

    public void setSeller(User seller) {
        this.seller = seller;
    }

    public User getBuyer() {
        return buyer;
    }

    public void setBuyer(User buyer) {
        this.buyer = buyer;
    }

    public Collection<Category> getCategories() {
        return categories;
    }

    public void setCategories(Collection<Category> offers) {
        this.categories = offers;
    }

    public Collection<OfferImage> getImages() {
        return images;
    }

    public void setImages(Collection<OfferImage> images) {
        this.images = images;
    }

    public Transaction getTransaction() {
        return transaction;
    }

    public void setTransaction(Transaction transaction) {
        this.transaction = transaction;
    }
}
