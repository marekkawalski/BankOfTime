package com.bankoftime.services;

import com.bankoftime.dto.AppUserDTO;
import com.bankoftime.dto.RegistrationDTO;
import com.bankoftime.dto.UpdateUserDTO;
import com.bankoftime.exceptions.UserException;
import com.bankoftime.models.AppUser;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Optional;

public interface AppUserService {
    String signUpUser(AppUser appUser) throws UserException;

    int enableAppUser(String email);

    int disableAppUser(String email);

    Optional<AppUser> findById(Long id);

    Optional<AppUser> findByEmail(String email);

    AppUserDTO mapAppUserToAppUserDto(AppUser appUser);

    AppUser mapRegistrationDtoToAppUser(RegistrationDTO registrationDTO);

    AppUser mapUpdateUserDtoToAppUser(UpdateUserDTO updateUserDTO);

    Optional<AppUser> modifyAppUser(AppUser appUserToSave);

    Page<List<AppUser>> getPagedAppUsers(String sortField, Integer pageSize, Integer pageNum);
}
