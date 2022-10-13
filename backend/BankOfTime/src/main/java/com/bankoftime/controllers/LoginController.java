package com.bankoftime.controllers;

import com.bankoftime.models.AppUser;
import com.bankoftime.services.AppUserService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@CrossOrigin(origins = {"http://localhost:3000"})
@AllArgsConstructor
public class LoginController {
    private final AppUserService appUserService;
    @GetMapping(path = "/login")
    public String authenticate() {
        return "You are authenticated";
    }

    @GetMapping(path = "/login/{username}")
    public String authenticate(@PathVariable("username") String username) {
         return appUserService.getUserRoleByUsername(username);
    }
}
