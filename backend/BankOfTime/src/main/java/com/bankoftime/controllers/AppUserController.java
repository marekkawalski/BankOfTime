package com.bankoftime.controllers;

import com.bankoftime.dto.AppUserDTO;
import com.bankoftime.models.AppUser;
import com.bankoftime.services.AppUserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AppUserController {
    private final AppUserService appUserService;

    public AppUserController(AppUserService appUserService) {
        this.appUserService = appUserService;
    }

    @GetMapping(path = "/clients/{email}")
    public ResponseEntity<AppUserDTO> findClientByEmail(@PathVariable("email") String email) {
        return appUserService.findByEmail(email)
                .map(appUser -> ResponseEntity.status(HttpStatus.OK).body(appUserService.mapAppUserToAppUserDto(appUser)))
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).body(null));
    }

    @GetMapping(path = "/clients/{id}/balance")
    public ResponseEntity<Double> getClientAccountBalance(@PathVariable("id") Long id) {
        return appUserService.calculateClientAccountBalance(id)
                .map(balance -> ResponseEntity.status(HttpStatus.OK).body(balance))
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).body(null));
    }

    @GetMapping(path = "/clients/id/{id}")
    public ResponseEntity<AppUser> getClientById(@PathVariable("id") Long id) {
        return appUserService.findById(id)
                .map(appUser -> ResponseEntity.status(HttpStatus.OK).body(appUser))
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).body(null));
    }

}
