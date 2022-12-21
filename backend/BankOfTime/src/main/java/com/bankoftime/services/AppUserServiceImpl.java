package com.bankoftime.services;

import com.bankoftime.dto.AppUserDTO;
import com.bankoftime.dto.RegistrationDTO;
import com.bankoftime.dto.UpdateUserDTO;
import com.bankoftime.enums.UserType;
import com.bankoftime.exceptions.UserException;
import com.bankoftime.models.AppUser;
import com.bankoftime.models.ConfirmationToken;
import com.bankoftime.models.Offer;
import com.bankoftime.repositories.AppUserRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
@AllArgsConstructor
@Slf4j
public class AppUserServiceImpl implements UserDetailsService, AppUserService {
    private static final String USER_WAS_NOT_FOUND = "User %s was not found!";
    private static final double BONUS_CREDIT = 5;
    private final AppUserRepository appUserRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final ConfirmationTokenServiceImpl confirmationTokenService;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return appUserRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException(String.format(USER_WAS_NOT_FOUND, email)));
    }

    @Override
    public String signUpUser(AppUser appUser) throws UserException {
        if (appUserRepository
                .findByEmail(appUser.getEmail())
                .isPresent()) {
            throw new UserException("User exists!");
        }
        appUser.setPassword((bCryptPasswordEncoder.encode(appUser.getPassword())));
        appUserRepository.save(appUser);

        String token = UUID.randomUUID().toString();
        ConfirmationToken confirmationToken = new ConfirmationToken(
                token,
                LocalDateTime.now(),
                LocalDateTime.now().plusMinutes(15),
                appUser
        );

        confirmationTokenService.saveConfirmationToken(confirmationToken);

        return token;
    }

    @Override
    public int enableAppUser(String email) {
        return appUserRepository.enableAppUser(email);
    }

    @Override
    public String getUserRoleByUsername(String email) {

        Optional<AppUser> appUser = appUserRepository.findByEmail(email);
        return appUser.map(user -> user.getUserType().toString()).orElse(null);
    }

    @Override
    public Optional<AppUser> findById(Long id) {
        return appUserRepository.findById(id);
    }

    @Override
    public Optional<AppUser> findByEmail(String email) {
        return appUserRepository.findByEmail(email);
    }

    @Override
    public AppUserDTO mapAppUserToAppUserDto(AppUser appUser) {
        return new AppUserDTO(appUser.getId(), appUser.getFirstName(), appUser.getLastName(), appUser.getCity(),
                appUser.getCountry(), appUser.getEmail(), appUser.getPhoneNumber(), appUser.getUserType(), appUser.getAboutMe());
    }

    @Override
    public AppUser mapRegistrationDtoToAppUser(RegistrationDTO registrationDTO) {
        AppUser appUser = new AppUser();
        appUser.setUserType(UserType.NORMAL);
        appUser.setFirstName(registrationDTO.firstName());
        appUser.setLastName(registrationDTO.lastName());
        appUser.setPassword(registrationDTO.password());
        appUser.setEmail(registrationDTO.email());
        if (registrationDTO.city() != null) {
            appUser.setCity(registrationDTO.city());
        }
        if (registrationDTO.country() != null) {
            appUser.setCountry(registrationDTO.country());
        }
        if (registrationDTO.phoneNumber() != null) {
            appUser.setPhoneNumber(registrationDTO.phoneNumber());
        }
        if (registrationDTO.aboutMe() != null) {
            appUser.setAboutMe(registrationDTO.aboutMe());
        }
        return appUser;
    }

    @Override
    public AppUser mapUpdateUserDtoToAppUser(UpdateUserDTO updateUserDTO) {
        AppUser appUser = new AppUser();
        appUser.setUserType(UserType.NORMAL);
        appUser.setEnabled(true);
        appUser.setId(updateUserDTO.id());
        appUser.setFirstName(updateUserDTO.firstName());
        appUser.setLastName(updateUserDTO.lastName());
        appUser.setEmail(updateUserDTO.email());

        if (updateUserDTO.password() != null) {
            appUser.setPassword(bCryptPasswordEncoder.encode(updateUserDTO.password()));
        }
        if (updateUserDTO.city() != null) {
            appUser.setCity(updateUserDTO.city());
        }
        if (updateUserDTO.country() != null) {
            appUser.setCountry(updateUserDTO.country());
        }
        if (updateUserDTO.phoneNumber() != null) {
            appUser.setPhoneNumber(updateUserDTO.phoneNumber());
        }
        if (updateUserDTO.aboutMe() != null) {
            appUser.setAboutMe(updateUserDTO.aboutMe());
        }
        return appUser;
    }

    @Override
    public Optional<Double> calculateClientAccountBalance(Long clientId) {
        Optional<Double> sum = findById(clientId)
                .map(appUser -> appUser.getSellOffers().stream().mapToDouble(Offer::getPrice).sum() + BONUS_CREDIT
                        - appUser.getPurchaseOffers().stream().mapToDouble(Offer::getPrice).sum());
        log.info("sum= " + sum.get());
        return sum;

    }

    @Override
    public double calculateClientAccountBalance(AppUser client) {
        double sum = client.getSellOffers().stream().mapToDouble(Offer::getPrice).sum() + BONUS_CREDIT
                - client.getPurchaseOffers().stream().mapToDouble(Offer::getPrice).sum();
        log.info("sum= " + sum);
        return sum;
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
                    appUser.setImage(appUserToSave.getImage());
                    appUser.setLocked(appUser.isLocked());
                    appUser.setAboutMe(appUserToSave.getAboutMe());
                    appUser = appUserRepository.save(appUser);
                    return Optional.of(appUser);
                }).orElse(Optional.empty());
    }
}
