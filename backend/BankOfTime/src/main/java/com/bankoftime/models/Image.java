package com.bankoftime.models;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "Image")
public class Image {
    @SequenceGenerator(
            name = "image_sequence",
            sequenceName = "image_sequence",
            allocationSize = 1
    )
    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "image_sequence"
    )
    private Long id;

    @Column(nullable = false)
    @NotNull
    private String url;

    @OneToOne
    @JoinColumn(name = "UserId", referencedColumnName = "Id")
    private AppUser appUser;

}
