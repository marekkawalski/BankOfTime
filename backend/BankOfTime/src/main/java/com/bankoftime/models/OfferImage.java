package com.bankoftime.models;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class OfferImage {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "Id")
    private Long id;
    @Basic
    @Column(name = "Url")
    private String url;
    @ManyToOne
    @JoinColumn(name = "OfferId", nullable = false)
    private Offer offer;

}
