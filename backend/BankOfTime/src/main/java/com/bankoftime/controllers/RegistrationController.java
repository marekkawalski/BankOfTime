package com.bankoftime.controllers;

import com.bankoftime.exceptions.EmailException;
import com.bankoftime.requests.RegistrationRequest;
import com.bankoftime.services.RegistrationService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/registration")
@AllArgsConstructor
public class RegistrationController {
    private RegistrationService registrationService;

    @PostMapping
    public String register(@RequestBody RegistrationRequest request) {
        try {
            return registrationService.register(request);
        } catch (EmailException emailException) {
            return emailException.getMessage();
        }
    }
}
