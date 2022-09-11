package com.bankoftime.services;

import com.bankoftime.models.User;
import com.bankoftime.repositories.UserRepository;
import lombok.AllArgsConstructor;
import lombok.val;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserService implements UserDetailsService {
    private static final String USER_WAS_NOT_FOUND = "User %s was not found!";
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException(String.format(USER_WAS_NOT_FOUND, username)));
    }

    public String signUpUser(User user) {

        val userExists = userRepository
                .findByUsername(user.username())
                .isPresent();
        if (userExists) {
            return String.valueOf(new IllegalStateException("user exists"));
        }

        val encodedPassword = bCryptPasswordEncoder.encode(user.password());
        user.password(encodedPassword);
        userRepository.save(user);

        return "user added";
    }
}
