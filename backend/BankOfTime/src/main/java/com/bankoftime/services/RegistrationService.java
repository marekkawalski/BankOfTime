package com.bankoftime.services;

import com.bankoftime.enums.UserType;
import com.bankoftime.exceptions.EmailException;
import com.bankoftime.exceptions.UserException;
import com.bankoftime.models.AppUser;
import com.bankoftime.requests.RegistrationRequest;
import lombok.AllArgsConstructor;
import lombok.val;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@AllArgsConstructor
public class RegistrationService {

    private final AppUserService appUserService;
    private final EmailValidator emailValidator;
    private final ConfirmationTokenService confirmationTokenService;

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

    @Transactional
    public String confirmToken(String token) {
        val confirmationToken = confirmationTokenService
                .getToken(token)
                .orElseThrow(() ->
                        new IllegalStateException("token not found"));

        if (confirmationToken.confirmedAt() != null) {
            throw new IllegalStateException("email already confirmed");
        }

        val expiredAt = confirmationToken.expiresAt();

        if (expiredAt.isBefore(LocalDateTime.now())) {
            throw new IllegalStateException("token expired");
        }

        confirmationTokenService.setConfirmedAt(token);
        appUserService.enableAppUser(
                confirmationToken.appUser().username());
        return "confirmed";
    }
}
