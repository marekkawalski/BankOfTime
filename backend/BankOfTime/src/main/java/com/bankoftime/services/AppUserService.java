package com.bankoftime.services;

import com.bankoftime.dto.AppUserDTO;
import com.bankoftime.exceptions.UserException;
import com.bankoftime.models.AppUser;

import java.util.Optional;

public interface AppUserService {
    String signUpUser(AppUser appUser) throws UserException;

    int enableAppUser(String email);

    String getUserRoleByUsername(String username);

    Optional<AppUser> findById(Long id);

    Optional<AppUser> findByEmail(String email);

    AppUserDTO mapAppUserToAppUserDto(AppUser appUser);

    Optional<Double> calculateClientAccountBalance(Long clientId);

    double calculateClientAccountBalance(AppUser client);

    Optional<AppUser> modifyAppUser(AppUser appUserToSave);

}
