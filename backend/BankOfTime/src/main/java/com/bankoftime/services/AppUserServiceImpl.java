package com.bankoftime.services;

import com.bankoftime.dto.AppUserDTO;
import com.bankoftime.exceptions.UserException;
import com.bankoftime.models.AppUser;
import com.bankoftime.models.ConfirmationToken;
import com.bankoftime.models.Offer;
import com.bankoftime.repositories.AppUserRepository;
import lombok.AllArgsConstructor;
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
public class AppUserServiceImpl implements UserDetailsService, AppUserService {
    private static final String USER_WAS_NOT_FOUND = "User %s was not found!";
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
    public Optional<AppUser> find(Long id) {
        return appUserRepository.findById(id);
    }

    @Override
    public Optional<AppUser> findByEmail(String email) {
        return appUserRepository.findByEmail(email);
    }

    @Override
    public AppUserDTO mapAppUserToAppUserDto(AppUser appUser) {
        return new AppUserDTO(appUser.getId(), appUser.getFirstName(), appUser.getLastName(), appUser.getCity(),
                appUser.getCountry(), appUser.getEmail(), appUser.getPhoneNumber(), appUser.getUserType());
    }

    @Override
    public Optional<Double> calculateClientAccountBalance(Long clientId) {
        return find(clientId)
                .map(appUser -> appUser.getSellOffers().stream().mapToDouble(Offer::getPrice).sum()
                        - appUser.getPurchaseOffers().stream().mapToDouble(Offer::getPrice).sum());
    }

    @Override
    public double calculateClientAccountBalance(AppUser client) {
        return (client.getSellOffers().stream().mapToDouble(Offer::getPrice).sum()
                - client.getPurchaseOffers().stream().mapToDouble(Offer::getPrice).sum());
    }

    @Override
    public Optional<AppUser> modifyAppUser(final AppUser appUserToSave) {
        return appUserRepository.findById(appUserToSave.getId())
                .map(appUser -> {
                    appUser.setUserType(appUserToSave.getUserType());
                    appUser.setCountry(appUserToSave.getCountry());
                    appUser.setPhoneNumber(appUserToSave.getPhoneNumber());
                    appUser.setLastName(appUserToSave.getLastName());
                    appUser.setPassword(appUserToSave.getPassword());
                    appUser.setFirstName(appUserToSave.getFirstName());
                    appUser.setCity(appUserToSave.getCity());
                    appUser.setEmail(appUserToSave.getEmail());
                    appUser.setEnabled(appUserToSave.isEnabled());
                    appUser.setConfirmationTokens(appUserToSave.getConfirmationTokens());
                    appUser.setSellTransactions(appUserToSave.getSellTransactions());
                    appUser.setPurchaseOffers(appUserToSave.getPurchaseOffers());
                    appUser.setSellOffers(appUserToSave.getSellOffers());
                    appUser.setPurchaseTransactions(appUserToSave.getPurchaseTransactions());
                    appUser.setImage(appUserToSave.getImage());
                    appUser.setLocked(appUser.isLocked());
                    appUser = appUserRepository.save(appUser);
                    return Optional.of(appUser);
                }).orElse(Optional.empty());
    }
}
