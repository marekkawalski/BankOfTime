package com.bankoftime.controllers;

import com.bankoftime.exceptions.EmailException;
import com.bankoftime.exceptions.TokenException;
import com.bankoftime.exceptions.UserException;
import com.bankoftime.models.AppUser;
import com.bankoftime.requests.RegistrationRequest;
import com.bankoftime.services.AppUserService;
import com.bankoftime.services.RegistrationService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Optional;

@RestController
@CrossOrigin(origins = {"http://localhost:3000"})
@RequestMapping(path = "/registration")
@AllArgsConstructor
public class RegistrationController {
    private final RegistrationService registrationService;

    @PostMapping
    public ResponseEntity<String> register(@Valid @RequestBody RegistrationRequest request) {
        try {
            registrationService.register(request);
            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body("User has been registered");
        } catch (EmailException | UserException e) {
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
