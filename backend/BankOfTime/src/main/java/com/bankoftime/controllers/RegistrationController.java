package com.bankoftime.controllers;

import com.bankoftime.dto.RegistrationDTO;
import com.bankoftime.exceptions.EmailException;
import com.bankoftime.exceptions.FileException;
import com.bankoftime.exceptions.TokenException;
import com.bankoftime.exceptions.UserException;
import com.bankoftime.services.RegistrationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.Nullable;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;

@RestController
@RequestMapping(path = "/registration")
public class RegistrationController {
    private final RegistrationService registrationService;

    public RegistrationController(final RegistrationService registrationService) {
        this.registrationService = registrationService;
    }

    @PostMapping
    public ResponseEntity<String> register(@Valid @RequestPart(value = "request") final RegistrationDTO request,
                                           @RequestPart(value = "profilePhoto", required = false) @Nullable final MultipartFile profilePhoto,
                                           @RequestPart(value = "coverPhoto", required = false) @Nullable final MultipartFile coverPhoto) {
        try {
            registrationService.register(request, profilePhoto, coverPhoto);
            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body("User has been registered");
        } catch (EmailException | UserException | FileException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }

    @GetMapping(path = "confirm")
    public String confirm(@RequestParam("token") final String token) {
        try {
            return registrationService.confirmToken(token);
        } catch (TokenException tokenException) {
            return tokenException.getMessage();
        }
    }
}
