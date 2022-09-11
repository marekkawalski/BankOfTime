package com.bankoftime.services;

import com.bankoftime.enums.UserType;
import com.bankoftime.models.User;
import com.bankoftime.requests.RegistrationRequest;
import lombok.AllArgsConstructor;
import lombok.val;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class RegistrationService {

    private final UserService userService;
    private final EmailValidator emailValidator;

    public String register(RegistrationRequest request) {
        val isValidEmail = emailValidator.test(request.userName());
        if (!isValidEmail) {
            throw new IllegalStateException("email invalid");
        }
        return userService.signUpUser(
                new User(
                        request.name(),
                        request.lastName(),
                        request.userName(),
                        request.password(),
                        UserType.NORMAL
                )
        );
    }
}
