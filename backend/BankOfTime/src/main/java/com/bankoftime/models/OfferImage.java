package com.bankoftime.models;

import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Accessors(fluent = true)
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
