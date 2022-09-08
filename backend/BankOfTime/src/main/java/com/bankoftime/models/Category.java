package com.bankoftime.models;

import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;

import javax.persistence.*;
import java.util.Collection;

@Entity
@Setter
@Getter
@Accessors(fluent = true)
public class Category {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "Id")
    private Long id;
    @Basic
    @Column(name = "Name")
    private String name;
    @ManyToMany
    @JoinTable(
            name = "OfferCategory",
            joinColumns = @JoinColumn(name = "CategoryId"),
            inverseJoinColumns = @JoinColumn(name = "OfferId")
    )
    private Collection<Offer> offers;

}
