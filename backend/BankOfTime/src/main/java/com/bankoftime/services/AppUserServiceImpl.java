package com.bankoftime.services;

import com.bankoftime.exceptions.UserException;
import com.bankoftime.models.AppUser;
import com.bankoftime.models.ConfirmationToken;
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
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return appUserRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException(String.format(USER_WAS_NOT_FOUND, username)));
    }

    @Override
    public String signUpUser(AppUser appUser) throws UserException {
        if (appUserRepository
                .findByUsername(appUser.getUsername())
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
    public String getUserRoleByUsername(String username) {

        Optional<AppUser> appUser = appUserRepository.findByUsername(username);
        return appUser.map(user -> user.getUserType().toString()).orElse(null);
    }

}
