package com.bankoftime.models;

import com.bankoftime.utils.Constants;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.Size;

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
    @Size(max = Constants.MAX_IMAGE_SIZE, message = "Image is too large!")
    @Column(length = Constants.MAX_IMAGE_SIZE)
    private byte[] profilePhotoData;

    @Size(max = Constants.MAX_IMAGE_SIZE, message = "Image is too large!")
    @Column(length = Constants.MAX_IMAGE_SIZE)
    private byte[] coverPhotoData;
    @JsonIgnore
    @OneToOne
    @JoinColumn(name = "UserId", referencedColumnName = "Id")
    private AppUser appUser;

    public AppUserImage(final byte[] profilePhotoData, final byte[] coverPhotoData) {
        this.profilePhotoData = profilePhotoData;
        this.coverPhotoData = coverPhotoData;
    }
}
