package com.bankoftime.models;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Accessors(fluent = true)
@NoArgsConstructor
public class Image {
    @SequenceGenerator(
            name = "image_sequence",
            sequenceName = "image_sequence",
            allocationSize = 1
    )
    @Id
    @Column(name = "Id",
            table = "Image")
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "image_sequence"
    )
    private Long id;
    @Basic
    @Column(name = "Url")
    private String url;
    //Todo fix naming convetion - apply Pascal case
    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "Id")
    private AppUser appUser;
}
