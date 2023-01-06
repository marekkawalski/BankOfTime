package com.bankoftime.services;

import com.bankoftime.dto.RegistrationDTO;
import com.bankoftime.exceptions.EmailException;
import com.bankoftime.exceptions.FileException;
import com.bankoftime.exceptions.TokenException;
import com.bankoftime.exceptions.UserException;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

public interface RegistrationService {
    void register(final RegistrationDTO request, final MultipartFile profilePhoto, final MultipartFile coverPhoto) throws EmailException, UserException, FileException;

    @Transactional
    String confirmToken(final String token) throws TokenException;

    String buildEmail(final String name, final String link);
}
