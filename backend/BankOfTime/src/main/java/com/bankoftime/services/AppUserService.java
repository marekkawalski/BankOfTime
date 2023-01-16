package com.bankoftime.services;

import com.bankoftime.dto.AppUserDTO;
import com.bankoftime.dto.RegistrationDTO;
import com.bankoftime.dto.UpdateUserDTO;
import com.bankoftime.exceptions.FileException;
import com.bankoftime.exceptions.UserException;
import com.bankoftime.models.AppUser;
import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

public interface AppUserService {
    String signUpUser(final AppUser appUser) throws UserException;

    int enableAppUser(final String email);

    int disableAppUser(final String email);

    Optional<AppUser> findById(final Long id);

    Optional<AppUser> findByEmail(final String email);

    AppUserDTO mapAppUserToAppUserDto(final AppUser appUser);

    AppUser mapRegistrationDtoToAppUser(final RegistrationDTO registrationDTO);

    AppUser mapUpdateUserDtoToAppUser(final UpdateUserDTO updateUserDTO);

    Optional<AppUser> modifyAppUser(final AppUser appUserToSave, final MultipartFile profilePhoto, final MultipartFile coverPhoto) throws FileException;

    Optional<AppUser> modifyAppUser(final AppUser appUserToSave);

    Page<List<AppUser>> getPagedAppUsers(final String sortField, final Integer pageSize, final Integer pageNum);
}
