package com.bankoftime.services;

import com.bankoftime.models.ConfirmationToken;

import java.util.Optional;

public interface ConfirmationTokenService {
    void saveConfirmationToken(ConfirmationToken confirmationToken);

    Optional<ConfirmationToken> getToken(String token);

    int setConfirmedAt(String token);
}
