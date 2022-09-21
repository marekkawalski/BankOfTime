package com.bankoftime.services;

import com.bankoftime.enums.UserType;
import com.bankoftime.models.AppUser;
import com.bankoftime.requests.RegistrationRequest;
import lombok.AllArgsConstructor;
import lombok.val;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class RegistrationService {

    private final AppUserService appUserService;
    private final EmailValidator emailValidator;

    public String register(RegistrationRequest request) {
        val isValidEmail = emailValidator.test(request.username());
        if (!isValidEmail) {
            throw new IllegalStateException("email invalid");
        }
        return appUserService.signUpUser(
                new AppUser(
                        request.name(),
                        request.lastName(),
                        request.username(),
                        request.password(),
                        UserType.NORMAL
                )
        );
    }
}
