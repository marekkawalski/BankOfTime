package com.bankoftime.services;

import com.bankoftime.models.AppUser;
import com.bankoftime.repositories.AppUserRepository;
import lombok.AllArgsConstructor;
import lombok.val;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class AppUserService implements UserDetailsService {
    private static final String USER_WAS_NOT_FOUND = "User %s was not found!";
    private final AppUserRepository appUserRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return appUserRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException(String.format(USER_WAS_NOT_FOUND, username)));
    }

    public String signUpUser(AppUser appUser) {

        val userExists = appUserRepository
                .findByUsername(appUser.getUsername())
                .isPresent();
        if (userExists) {
            return String.valueOf(new IllegalStateException("user exists"));
        }

        val encodedPassword = bCryptPasswordEncoder.encode(appUser.getPassword());
        appUser.password(encodedPassword);
        appUserRepository.save(appUser);

        return "user added";
    }
}
