package com.bankoftime.services;

import com.bankoftime.exceptions.UserException;
import com.bankoftime.models.AppUser;

public interface AppUserService {
    String signUpUser(AppUser appUser) throws UserException;

    int enableAppUser(String email);

    String getUserRoleByUsername(String username);
}
