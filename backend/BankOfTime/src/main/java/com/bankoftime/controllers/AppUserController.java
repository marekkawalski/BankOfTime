package com.bankoftime.controllers;

import com.bankoftime.dto.AppUserDTO;
import com.bankoftime.dto.UpdateUserDTO;
import com.bankoftime.models.AppUser;
import com.bankoftime.services.AppUserService;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
public class AppUserController {
    private static final String DEFAULT_PAGE_SIZE = " 10";
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

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping(path = "/clients")
    public ResponseEntity<Page<List<AppUser>>> getClients(
            @RequestParam(value = "sort", defaultValue = "lastName") String sortField,
            @RequestParam(value = "page-size", defaultValue = DEFAULT_PAGE_SIZE) Integer pageSize,
            @RequestParam(value = "page-num", defaultValue = "0") Integer pageNum) {
        final Page<List<AppUser>> appUsers = appUserService.getPagedAppUsers(sortField, pageSize, pageNum);
        if (appUsers.isEmpty())
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
        return ResponseEntity.status(HttpStatus.OK).body(appUsers);
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

    @PutMapping(path = "/clients/updateClient")
    public ResponseEntity<AppUser> updateClient(@Valid @RequestBody UpdateUserDTO updateUserDTO) {
        return appUserService.modifyAppUser(appUserService.mapUpdateUserDtoToAppUser(updateUserDTO))
                .map(appUser -> ResponseEntity.status(HttpStatus.OK).body(appUser))
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).body(null));
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping(path = "/clients/disableClient/{email}")
    public ResponseEntity<String> disableClient(@PathVariable String email) {
        return appUserService.disableAppUser(email) > 0 ?
                ResponseEntity.status(HttpStatus.OK).body("AppUser has been disabled") : ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping(path = "/clients/enableClient/{email}")
    public ResponseEntity<String> enableAppUser(@PathVariable String email) {
        return appUserService.enableAppUser(email) > 0 ?
                ResponseEntity.status(HttpStatus.OK).body("AppUser has been enabled") : ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }
}
