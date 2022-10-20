package com.bankoftime.models;

import com.bankoftime.enums.TransactionStatus;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Objects;

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

    @Override
    public int hashCode() {
        return Objects.hash(id, transactionStatus, offer, buyer, seller);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        final TimeTransaction that = (TimeTransaction) o;
        return id.equals(that.id) && transactionStatus == that.transactionStatus && offer.equals(that.offer) && buyer.equals(that.buyer) && seller.equals(that.seller);
    }
}
