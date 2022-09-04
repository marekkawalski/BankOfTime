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
    private Long id;
    @Basic
    @Column(name = "Status")
    @Enumerated(EnumType.STRING)
    private OfferStatus status;
    @OneToOne
    @JoinColumn(name = "Id", nullable = false)
    private Offer offer;
    @ManyToOne
    @JoinColumn(name = "BuyerId", nullable = false)
    private User buyer;
    @ManyToOne
    @JoinColumn(name = "SellerId", nullable = false)
    private User seller;

}
