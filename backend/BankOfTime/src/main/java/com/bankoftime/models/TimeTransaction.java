package com.bankoftime.models;

import com.bankoftime.enums.TransactionStatus;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
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
    @JsonFormat(pattern = "dd:MM:yyyy HH:mm")
    @NotNull
    private LocalDateTime transactionDate;
    @ManyToOne
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

    public TimeTransaction(final LocalDateTime transactionDate, final Offer offer, final AppUser buyer, final AppUser seller) {
        this.transactionDate = transactionDate;
        this.offer = offer;
        this.buyer = buyer;
        this.seller = seller;
    }
}
