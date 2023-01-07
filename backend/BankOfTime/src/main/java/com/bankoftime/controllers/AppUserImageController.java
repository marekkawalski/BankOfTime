package com.bankoftime.controllers;


import com.bankoftime.models.AppUserImage;
import com.bankoftime.services.AppUserImageService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AppUserImageController {
    private final AppUserImageService appUserImageService;

    public AppUserImageController(final AppUserImageService appUserImageService) {
        this.appUserImageService = appUserImageService;
    }

    @GetMapping(path = "/clients/id/{clientId}/photo")
    public ResponseEntity<AppUserImage> getClientPhoto(@PathVariable("clientId") final Long clientId) {
        return appUserImageService.findPhoto(clientId)
                .map(appUserImage -> ResponseEntity.status(HttpStatus.OK).body(appUserImage))
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).body(null));
    }
}
