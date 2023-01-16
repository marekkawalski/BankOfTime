package com.bankoftime.services;

import com.bankoftime.models.ConfirmationToken;

import java.util.Optional;

public interface ConfirmationTokenService {
    void saveConfirmationToken(final ConfirmationToken confirmationToken);

    Optional<ConfirmationToken> getToken(final String token);

    int setConfirmedAt(final String token);
}
