package com.bankoftime.controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = {"http://localhost:3000"})
public class LoginController {

    @GetMapping(path = "/login")
    public String authenticate() {
        return "You are authenticated";
    }
}
