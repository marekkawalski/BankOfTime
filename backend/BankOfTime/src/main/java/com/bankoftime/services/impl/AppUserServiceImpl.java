package com.bankoftime.services.impl;

import com.bankoftime.dto.AppUserDTO;
import com.bankoftime.dto.RegistrationDTO;
import com.bankoftime.dto.UpdateUserDTO;
import com.bankoftime.enums.UserRole;
import com.bankoftime.exceptions.FileException;
import com.bankoftime.exceptions.UserException;
import com.bankoftime.models.AppUser;
import com.bankoftime.models.ConfirmationToken;
import com.bankoftime.repositories.AppUserImageRepository;
import com.bankoftime.repositories.AppUserRepository;
import com.bankoftime.services.AppUserImageService;
import com.bankoftime.services.AppUserService;
import com.bankoftime.services.OfferService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@AllArgsConstructor
@Slf4j
public class AppUserServiceImpl implements UserDetailsService, AppUserService {
    private static final String USER_WAS_NOT_FOUND = "User %s was not found!";
    private final AppUserImageRepository appUserImageRepository;
    private final AppUserRepository appUserRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final ConfirmationTokenServiceImpl confirmationTokenService;
    private final OfferService offerService;
    private final AppUserImageService appUserImageService;

    @Override
    public UserDetails loadUserByUsername(final String email) throws UsernameNotFoundException {
        return appUserRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException(String.format(USER_WAS_NOT_FOUND, email)));
    }

    @Override
    public String signUpUser(final AppUser appUser) throws UserException {
        if (appUserRepository
                .findByEmail(appUser.getEmail())
                .isPresent()) {
            throw new UserException("User exists!");
        }
        appUser.setPassword((bCryptPasswordEncoder.encode(appUser.getPassword())));
        appUserRepository.save(appUser);

        final String token = UUID.randomUUID().toString();
        final ConfirmationToken confirmationToken = new ConfirmationToken(
                token,
                LocalDateTime.now(),
                LocalDateTime.now().plusMinutes(15),
                appUser
        );

        confirmationTokenService.saveConfirmationToken(confirmationToken);

        return token;
    }

    @Override
    public int enableAppUser(final String email) {
        return appUserRepository.enableAppUser(email);
    }

    @Override
    public int disableAppUser(final String email) {
        final Optional<AppUser> oAppUser = findByEmail(email);
        if ((oAppUser.isEmpty())) {
            return 0;
        }
        offerService.updateDisabledUserOffers(oAppUser.get().getId());
        return appUserRepository.disableAppUser(email);
    }

    @Override
    public Optional<AppUser> findById(final Long id) {
        return appUserRepository.findById(id);
    }

    @Override
    public Optional<AppUser> findByEmail(final String email) {
        return appUserRepository.findByEmail(email);
    }

    @Override
    public AppUserDTO mapAppUserToAppUserDto(final AppUser appUser) {
        return new AppUserDTO(appUser.getId(), appUser.getFirstName(), appUser.getLastName(), appUser.getCity(),
                appUser.getCountry(), appUser.getEmail(), appUser.getPhoneNumber(), appUser.getUserType(), appUser.getAboutMe(), appUser.getOccupation());
    }

    @Override
    public AppUser mapRegistrationDtoToAppUser(final RegistrationDTO registrationDTO) {
        final AppUser appUser = new AppUser();
        appUser.setUserType(UserRole.ROLE_NORMAL);
        appUser.setFirstName(registrationDTO.firstName());
        appUser.setLastName(registrationDTO.lastName());
        appUser.setPassword(registrationDTO.password());
        appUser.setEmail(registrationDTO.email());
        appUser.setCity(registrationDTO.city().isEmpty() ? null : registrationDTO.city());
        appUser.setCountry(registrationDTO.country().isEmpty() ? null : registrationDTO.country());
        appUser.setPhoneNumber(registrationDTO.phoneNumber().isEmpty() ? null : registrationDTO.phoneNumber());
        appUser.setAboutMe(registrationDTO.aboutMe().isEmpty() ? null : registrationDTO.aboutMe());
        appUser.setOccupation(registrationDTO.occupation().isEmpty() ? null : registrationDTO.occupation());
        return appUser;
    }

    @Override
    public AppUser mapUpdateUserDtoToAppUser(final UpdateUserDTO updateUserDTO) {
        final AppUser appUser = new AppUser();
        if (updateUserDTO.password() != null && !updateUserDTO.password().isEmpty()) {
            appUser.setPassword(bCryptPasswordEncoder.encode(updateUserDTO.password()));
        }
        if (updateUserDTO.userRole() != null) {
            appUser.setUserType(updateUserDTO.userRole());
        } else {
            appUser.setUserType(UserRole.ROLE_NORMAL);
        }
        appUser.setEnabled(true);
        appUser.setId(updateUserDTO.id());
        appUser.setFirstName(updateUserDTO.firstName());
        appUser.setLastName(updateUserDTO.lastName());
        appUser.setEmail(updateUserDTO.email());
        appUser.setCity(updateUserDTO.city().isEmpty() ? null : updateUserDTO.city());
        appUser.setOccupation(updateUserDTO.occupation().isEmpty() ? null : updateUserDTO.occupation());
        appUser.setCountry(updateUserDTO.country().isEmpty() ? null : updateUserDTO.country());
        appUser.setPhoneNumber(updateUserDTO.phoneNumber().isEmpty() ? null : updateUserDTO.phoneNumber());
        appUser.setAboutMe(updateUserDTO.aboutMe().isEmpty() ? null : updateUserDTO.aboutMe());
        return appUser;
    }

    @Override
    public Optional<AppUser> modifyAppUser(final AppUser appUserToSave, final MultipartFile profilePhoto, final MultipartFile coverPhoto) throws FileException {
        byte[] profilePhotoBytes;
        byte[] coverPhotoBytes;
        try {
            profilePhotoBytes = profilePhoto.getBytes();
            coverPhotoBytes = coverPhoto.getBytes();
        } catch (IOException e) {
            throw new FileException(e.getMessage());
        }
        return appUserRepository.findById(appUserToSave.getId())
                .map(appUser -> {
                    appUser.getImage().setProfilePhotoData(profilePhotoBytes.length > 0 ? profilePhotoBytes : appUser.getImage().getProfilePhotoData());
                    appUser.getImage().setCoverPhotoData(coverPhotoBytes.length > 0 ? coverPhotoBytes : appUser.getImage().getCoverPhotoData());
                    appUserRepository.save(appUser);
                    return modifyAppUser(appUserToSave);
                }).orElse(Optional.empty());
    }

    @Override
    public Optional<AppUser> modifyAppUser(final AppUser appUserToSave) {
        return appUserRepository.findById(appUserToSave.getId())
                .map(appUser -> {
                    appUser.setFirstName(appUserToSave.getFirstName());
                    appUser.setLastName(appUserToSave.getLastName());
                    if (appUserToSave.getPassword() != null) {
                        appUser.setPassword(appUserToSave.getPassword());
                    }
                    appUser.setUserType(appUserToSave.getUserType());
                    appUser.setCountry(appUserToSave.getCountry());
                    appUser.setPhoneNumber(appUserToSave.getPhoneNumber());
                    appUser.setCity(appUserToSave.getCity());
                    appUser.setEmail(appUserToSave.getEmail());
                    appUser.setEnabled(appUserToSave.isEnabled());
                    appUser.setConfirmationTokens(appUserToSave.getConfirmationTokens());
                    appUser.setLocked(appUser.isLocked());
                    appUser.setAboutMe(appUserToSave.getAboutMe());
                    appUser.setOccupation(appUserToSave.getOccupation());
                    appUser.setImage(appUserToSave.getImage());
                    appUser = appUserRepository.save(appUser);
                    return Optional.of(appUser);
                }).orElse(Optional.empty());
    }

    @Override
    public Page<List<AppUser>> getPagedAppUsers(final String sortField, final Integer pageSize, final Integer pageNum) {
        return appUserRepository.findAllBy(PageRequest.of(pageNum, pageSize, Sort.by(Sort.Direction.ASC, sortField)));
    }
}
