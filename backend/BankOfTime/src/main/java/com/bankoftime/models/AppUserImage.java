package com.bankoftime.models;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "Image")
public class AppUserImage {
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
    private byte[] data;

    @OneToOne
    @JoinColumn(name = "UserId", referencedColumnName = "Id")
    private AppUser appUser;

    public AppUserImage(final byte[] data) {
        this.data = data;
    }
}
