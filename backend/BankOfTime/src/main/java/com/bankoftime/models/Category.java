package com.bankoftime.models;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.ArrayList;
import java.util.Collection;

@Entity
@Setter
@Getter
@NoArgsConstructor
@Table(name = "Category")
public class Category {
    @SequenceGenerator(
            name = "category_sequence",
            sequenceName = "category_sequence",
            allocationSize = 1
    )
    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "category_sequence"
    )
    private Long id;

    @Column(nullable = false)
    @NotBlank
    private String name;
    @ManyToMany
    @JoinTable(
            name = "OfferCategory",
            joinColumns = @JoinColumn(name = "CategoryId"),
            inverseJoinColumns = @JoinColumn(name = "OfferId")
    )
    private Collection<Offer> offers = new ArrayList<>();

    public Category(final String name) {
        this.name = name;
    }
}
