package com.bankoftime.controllers;

import com.bankoftime.dto.RegistrationDTO;
import com.bankoftime.exceptions.EmailException;
import com.bankoftime.exceptions.FileException;
import com.bankoftime.exceptions.TokenException;
import com.bankoftime.exceptions.UserException;
import com.bankoftime.services.RegistrationService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.Nullable;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;

@RestController
@RequestMapping(path = "/registration")
@AllArgsConstructor
public class RegistrationController {
    private final RegistrationService registrationService;

    @PostMapping
    public ResponseEntity<String> register(@Valid @RequestPart(value = "request") RegistrationDTO request,
                                           @RequestPart(value = "profilePhoto", required = false) @Nullable MultipartFile profilePhoto,
                                           @RequestPart(value = "coverPhoto", required = false) @Nullable MultipartFile coverPhoto) {
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
    public String confirm(@RequestParam("token") String token) {
        try {
            return registrationService.confirmToken(token);
        } catch (TokenException tokenException) {
            return tokenException.getMessage();
        }
    }
}
