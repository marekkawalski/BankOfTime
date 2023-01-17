package com.bankoftime.models;

import com.bankoftime.enums.OfferStatus;
import com.bankoftime.enums.OfferType;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.springframework.lang.Nullable;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;

@Entity
@Getter
@Setter
@RequiredArgsConstructor
@Table(name = "Offer")
public class Offer {
    @SequenceGenerator(
            name = "offer_sequence",
            sequenceName = "offer_sequence",
            allocationSize = 1
    )
    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "offer_sequence"
    )
    private Long id;

    @Column(nullable = false)
    @NotBlank
    private String shortDescription;

    @Column(nullable = false)
    private double price;

    @Column(nullable = false)
    @NotNull
    private String title;

    @Nullable
    private String location;

    @Nullable
    private String longDescription;

    @Nullable
    private Double previousPrice;
    @JsonFormat(pattern = "dd:MM:yyyy HH:mm")
    private LocalDateTime createdAt;
    @Nullable
    @JsonFormat(pattern = "dd:MM:yyyy HH:mm")
    private LocalDateTime updatedAt;
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @NotNull
    private OfferType offerType;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    @NotNull
    private OfferStatus offerStatus = OfferStatus.ACTIVE;

    @ManyToOne
    @JoinColumn(name = "SellerId")
    @Nullable
    private AppUser seller;

    @ManyToOne
    @JoinColumn(name = "BuyerId")
    @Nullable
    private AppUser buyer;

    @ManyToMany
    @JoinTable(
            name = "OfferCategory",
            joinColumns = @JoinColumn(name = "OfferId"),
            inverseJoinColumns = @JoinColumn(name = "CategoryId")
    )
    private Collection<Category> categories = new ArrayList<>();

    @OneToMany(mappedBy = "offer")
    @ToString.Exclude
    @NotNull
    private Collection<OfferImage> images = new ArrayList<>();

    @OneToMany(mappedBy = "offer")
    @ToString.Exclude
    @Nullable
    @JsonIgnore
    private Collection<TimeTransaction> timeTransactions = new ArrayList<>();

    public Offer(final String title, final double price, final String shortDescription, final OfferType offerType, @Nullable final String longDescription, @Nullable final String location) {
        this.shortDescription = shortDescription;
        this.price = price;
        this.title = title;
        this.location = location;
        this.longDescription = longDescription;
        this.offerType = offerType;
    }
}
