package com.bankoftime.controllers;

import com.bankoftime.dto.AppUserDTO;
import com.bankoftime.services.AppUserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
public class LoginController {
    private final AppUserService appUserService;

    @GetMapping(path = "/login/{email}")
    public ResponseEntity<AppUserDTO> authenticate(@PathVariable("email") String email) {
        return appUserService.findByEmail(email).map(appUser -> ResponseEntity.status(HttpStatus.OK)
                        .body(appUserService.mapAppUserToAppUserDto(appUser)))
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).body(null));
    }
}
