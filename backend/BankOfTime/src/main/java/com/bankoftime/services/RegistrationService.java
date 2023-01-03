package com.bankoftime.services;

import com.bankoftime.dto.RegistrationDTO;
import com.bankoftime.exceptions.EmailException;
import com.bankoftime.exceptions.FileException;
import com.bankoftime.exceptions.TokenException;
import com.bankoftime.exceptions.UserException;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

public interface RegistrationService {
    String register(RegistrationDTO request, MultipartFile profilePhoto, MultipartFile coverPhoto) throws EmailException, UserException, FileException;

    @Transactional
    String confirmToken(String token) throws TokenException;

    String buildEmail(String name, String link);
}
