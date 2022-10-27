package com.bankoftime.models;

import com.bankoftime.enums.OfferStatus;
import com.bankoftime.enums.OfferType;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.springframework.lang.Nullable;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.Collection;

@Entity
@Getter
@Setter
@ToString
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

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @NotNull
    private OfferType offerType;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    @NotNull
    private OfferStatus state = OfferStatus.ACTIVE;

    @ManyToOne
    @JoinColumn(name = "SellerId")
    @Nullable
    private AppUser seller;

    @ManyToOne
    @JoinColumn(name = "BuyerId")
    @Nullable
    private AppUser buyer;

    @ManyToMany(mappedBy = "offers")
    @ToString.Exclude
    @NotNull
    private Collection<Category> categories = new ArrayList<>();

    @OneToMany(mappedBy = "offer")
    @ToString.Exclude
    @NotNull
    private Collection<OfferImage> images = new ArrayList<>();

    @OneToOne(mappedBy = "offer")
    @Nullable
    private TimeTransaction timeTransaction;

}
