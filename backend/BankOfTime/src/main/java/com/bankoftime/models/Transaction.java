package com.bankoftime.models;

import com.bankoftime.enums.OfferStatus;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
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

}
