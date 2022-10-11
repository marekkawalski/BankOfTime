package com.bankoftime.controllers;

import com.bankoftime.exceptions.EmailException;
import com.bankoftime.exceptions.TokenException;
import com.bankoftime.requests.RegistrationRequest;
import com.bankoftime.services.RegistrationService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping(path = "/registration")
@AllArgsConstructor
public class RegistrationController {
    private RegistrationService registrationService;

    @PostMapping
    public String register(@Valid @RequestBody RegistrationRequest request) {
        try {
            return registrationService.register(request);
        } catch (EmailException emailException) {
            return emailException.getMessage();
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
