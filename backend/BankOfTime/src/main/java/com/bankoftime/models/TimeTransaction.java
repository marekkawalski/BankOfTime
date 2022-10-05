package com.bankoftime.models;

import com.bankoftime.enums.OfferStatus;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Accessors(fluent = true)
public class TimeTransaction {
    @SequenceGenerator(
            name = "transaction_sequence",
            sequenceName = "transaction_sequence",
            allocationSize = 1
    )
    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "transaction_sequence"
    )
    private Long id;
    @Basic
    @Column(name = "Status")
    @Enumerated(EnumType.STRING)
    private OfferStatus status;
    @OneToOne
    @JoinColumn(name = "OfferId", nullable = false)
    private Offer offer;
    @ManyToOne
    @JoinColumn(name = "BuyerId", nullable = false)
    private AppUser buyer;
    @ManyToOne
    @JoinColumn(name = "SellerId", nullable = false)
    private AppUser seller;

}
