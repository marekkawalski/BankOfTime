package com.bankoftime.services;

import com.bankoftime.enums.UserType;
import com.bankoftime.exceptions.UserException;
import com.bankoftime.models.AppUser;
import com.bankoftime.models.ConfirmationToken;
import com.bankoftime.repositories.AppUserRepository;
import lombok.AllArgsConstructor;
import lombok.val;
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
public class AppUserService implements UserDetailsService {
    private static final String USER_WAS_NOT_FOUND = "User %s was not found!";
    private final AppUserRepository appUserRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final ConfirmationTokenService confirmationTokenService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return appUserRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException(String.format(USER_WAS_NOT_FOUND, username)));
    }

    public String signUpUser(AppUser appUser) throws UserException {
        if (appUserRepository
                .findByUsername(appUser.getUsername())
                .isPresent()) {
            throw new UserException("User exists!");
        }
        appUserRepository.save(appUser.password(bCryptPasswordEncoder.encode(appUser.getPassword())));

        val token = UUID.randomUUID().toString();
        val confirmationToken = new ConfirmationToken(
                token,
                LocalDateTime.now(),
                LocalDateTime.now().plusMinutes(15),
                appUser
        );

        confirmationTokenService.saveConfirmationToken(confirmationToken);

        return token;
    }

    public int enableAppUser(String email) {
        return appUserRepository.enableAppUser(email);
    }

    public String getUserRoleByUsername(String username){

       Optional<AppUser> appUser= appUserRepository.findByUsername(username);
        return appUser.map(user -> user.userType().toString()).orElse(null);
    }

}
