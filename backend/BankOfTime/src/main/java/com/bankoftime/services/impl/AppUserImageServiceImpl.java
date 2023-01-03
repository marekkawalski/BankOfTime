package com.bankoftime.services.impl;

import com.bankoftime.models.AppUserImage;
import com.bankoftime.repositories.AppUserImageRepository;
import com.bankoftime.services.AppUserImageService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class AppUserImageServiceImpl implements AppUserImageService {
    private final AppUserImageRepository imageRepository;

    @Override
    public void saveImage(AppUserImage image) {
        imageRepository.save(image);
    }

}
