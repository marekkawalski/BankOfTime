package com.bankoftime.models;

import javax.persistence.*;

@Entity
public class OfferImage {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "Id")
    private long id;
    @Basic
    @Column(name = "Url")
    private String url;
    @ManyToOne
    @JoinColumn(name = "OfferId", referencedColumnName = "Id", nullable = false)
    private Offer offer;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public Offer getOffer() {
        return offer;
    }

    public void setOffer(Offer offer) {
        this.offer = offer;
    }
}
