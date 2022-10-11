package com.bankoftime.services;

import com.bankoftime.models.Image;
import com.bankoftime.repositories.ImageRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class ImageService {
    private final ImageRepository imageRepository;

    public void saveImage(Image image) {
        imageRepository.save(image);
    }
}
