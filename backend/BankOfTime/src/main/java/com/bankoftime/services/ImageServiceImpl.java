package com.bankoftime.services;

import com.bankoftime.models.Image;
import com.bankoftime.repositories.ImageRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class ImageServiceImpl implements ImageService {
    private final ImageRepository imageRepository;

    @Override
    public void saveImage(Image image) {
        imageRepository.save(image);
    }
}
