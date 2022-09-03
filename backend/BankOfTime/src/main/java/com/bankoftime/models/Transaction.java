package com.bankoftime.models;

import com.bankoftime.enums.OfferStatus;

import javax.persistence.*;

@Entity
public class Transaction {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "Id")
    private long id;
    @Basic
    @Column(name = "OfferId")
    private long offerId;
    @Basic
    @Column(name = "Status")
    private OfferStatus status;
    @OneToOne
    @JoinColumn(name = "Id", referencedColumnName = "Id", nullable = false)
    private Offer offer;
    @ManyToOne
    @JoinColumn(name = "BuyerId", referencedColumnName = "Id", nullable = false)
    private User buyer;
    @ManyToOne
    @JoinColumn(name = "SellerId", referencedColumnName = "Id", nullable = false)
    private User seller;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getOfferId() {
        return offerId;
    }

    public void setOfferId(long offerId) {
        this.offerId = offerId;
    }

    public OfferStatus getStatus() {
        return status;
    }

    public void setStatus(OfferStatus status) {
        this.status = status;
    }

    public Offer getOffer() {
        return offer;
    }

    public void setOffer(Offer offer) {
        this.offer = offer;
    }

    public User getBuyer() {
        return buyer;
    }

    public void setBuyer(User buyer) {
        this.buyer = buyer;
    }

    public User getSeller() {
        return seller;
    }

    public void setSeller(User seller) {
        this.seller = seller;
    }
}
