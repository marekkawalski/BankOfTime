package com.bankoftime.services;

import com.bankoftime.dto.RegistrationDTO;
import com.bankoftime.exceptions.EmailException;
import com.bankoftime.exceptions.TokenException;
import com.bankoftime.exceptions.UserException;
import org.springframework.transaction.annotation.Transactional;

public interface RegistrationService {
    String register(RegistrationDTO request) throws EmailException, UserException;

    @Transactional
    String confirmToken(String token) throws TokenException;

    String buildEmail(String name, String link);
}
