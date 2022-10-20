package com.bankoftime.models;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Objects;

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
    @Column(name = "Id",
            table = "Image")
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "image_sequence"
    )
    private Long id;

    @Column(name = "Url", nullable = false)
    @NotNull
    private String url;

    @OneToOne
    @JoinColumn(name = "UserId", referencedColumnName = "Id")
    private AppUser appUser;

    @Override
    public int hashCode() {
        return Objects.hash(id, url, appUser);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        final Image image = (Image) o;
        return id.equals(image.id) && url.equals(image.url) && Objects.equals(appUser, image.appUser);
    }
}
