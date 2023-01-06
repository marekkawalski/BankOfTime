package com.bankoftime.services;

import com.bankoftime.models.AppUserImage;

import java.util.Optional;

public interface AppUserImageService {
    void saveImage(AppUserImage image);

    Optional<AppUserImage> findPhoto(final Long clientId);
}
