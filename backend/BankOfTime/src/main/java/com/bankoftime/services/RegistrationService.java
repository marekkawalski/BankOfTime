package com.bankoftime.services;

import com.bankoftime.enums.UserType;
import com.bankoftime.exceptions.EmailException;
import com.bankoftime.exceptions.UserException;
import com.bankoftime.models.AppUser;
import com.bankoftime.requests.RegistrationRequest;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class RegistrationService {

    private final AppUserService appUserService;
    private final EmailValidator emailValidator;

    public String register(RegistrationRequest request) throws EmailException {
        if (!emailValidator.test(request.username())) {
            throw new EmailException("Email is invalid!");
        }
        try {
            return appUserService.signUpUser(
                    new AppUser(
                            request.name(),
                            request.lastName(),
                            request.username(),
                            request.password(),
                            UserType.NORMAL
                    )
            );
        } catch (UserException userException) {
            return userException.getMessage();
        }

    }
}
