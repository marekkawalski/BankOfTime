package com.bankoftime.controllers;

import com.bankoftime.dto.AppUserDTO;
import com.bankoftime.dto.UpdateUserDTO;
import com.bankoftime.exceptions.FileException;
import com.bankoftime.models.AppUser;
import com.bankoftime.services.AppUserService;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.Nullable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.Valid;
import java.util.List;

@RestController
public class AppUserController {
    private static final String DEFAULT_PAGE_SIZE = " 10";
    private final AppUserService appUserService;

    public AppUserController(final AppUserService appUserService) {
        this.appUserService = appUserService;
    }

    @GetMapping(path = "/clients/{email}")
    public ResponseEntity<AppUserDTO> findClientByEmail(@PathVariable("email") final String email) {
        return appUserService.findByEmail(email)
                .map(appUser -> ResponseEntity.status(HttpStatus.OK).body(appUserService.mapAppUserToAppUserDto(appUser)))
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).body(null));
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping(path = "/clients")
    public ResponseEntity<Page<List<AppUser>>> getClients(
            @RequestParam(value = "sort", defaultValue = "lastName") final String sortField,
            @RequestParam(value = "page-size", defaultValue = DEFAULT_PAGE_SIZE) final Integer pageSize,
            @RequestParam(value = "page-num", defaultValue = "0") final Integer pageNum) {
        final Page<List<AppUser>> appUsers = appUserService.getPagedAppUsers(sortField, pageSize, pageNum);
        if (appUsers.isEmpty())
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
        return ResponseEntity.status(HttpStatus.OK).body(appUsers);
    }

    @GetMapping(path = "/clients/id/{id}")
    public ResponseEntity<AppUser> getClientById(@PathVariable("id") final Long id) {
        return appUserService.findById(id)
                .map(appUser -> ResponseEntity.status(HttpStatus.OK).body(appUser))
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).body(null));
    }

    @PutMapping(path = "/clients/updateClient")
    public ResponseEntity<AppUser> updateClient(@Valid @RequestPart(value = "request") final UpdateUserDTO updateUserDTO,
                                                @RequestPart(value = "profilePhoto", required = false) @Nullable final MultipartFile profilePhoto,
                                                @RequestPart(value = "coverPhoto", required = false) @Nullable final MultipartFile coverPhoto) {
        try {
            return appUserService.modifyAppUser(appUserService.mapUpdateUserDtoToAppUser(updateUserDTO), profilePhoto, coverPhoto)
                    .map(appUser -> ResponseEntity.status(HttpStatus.OK).body(appUser))
                    .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).body(null));
        } catch (FileException e) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, e.getMessage(), e.getCause());
        }
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping(path = "/clients/disableClient/{email}")
    public ResponseEntity<String> disableClient(@PathVariable final String email) {
        return appUserService.disableAppUser(email) > 0 ?
                ResponseEntity.status(HttpStatus.OK).body("AppUser has been disabled") : ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping(path = "/clients/enableClient/{email}")
    public ResponseEntity<String> enableAppUser(@PathVariable final String email) {
        return appUserService.enableAppUser(email) > 0 ?
                ResponseEntity.status(HttpStatus.OK).body("AppUser has been enabled") : ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }
}
