package com.bankoftime.models;

import com.bankoftime.enums.TransactionStatus;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Getter
@Setter
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

    @Column(name = "Status", nullable = false)
    @Enumerated(EnumType.STRING)
    @NotNull
    private TransactionStatus transactionStatus;
    @OneToOne
    @JoinColumn(name = "OfferId", nullable = false)
    @NotNull
    private Offer offer;

    @ManyToOne
    @JoinColumn(name = "BuyerId", nullable = false)
    @NotNull
    private AppUser buyer;

    @ManyToOne
    @JoinColumn(name = "SellerId", nullable = false)
    @NotNull
    private AppUser seller;

}
