package com.bankoftime.models;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Objects;

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

    @Column(name = "Name", nullable = false)
    @NotBlank
    private String name;
    @ManyToMany
    @JoinTable(
            name = "OfferCategory",
            joinColumns = @JoinColumn(name = "CategoryId"),
            inverseJoinColumns = @JoinColumn(name = "OfferId")
    )
    private Collection<Offer> offers = new ArrayList<>();

    @Override
    public int hashCode() {
        return Objects.hash(id, name, offers);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        final Category category = (Category) o;
        return id.equals(category.id) && name.equals(category.name) && Objects.equals(offers, category.offers);
    }
}
