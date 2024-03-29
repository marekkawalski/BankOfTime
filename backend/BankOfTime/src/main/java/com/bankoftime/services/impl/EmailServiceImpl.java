package com.bankoftime.services.impl;

import com.bankoftime.services.EmailService;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

@Service
@AllArgsConstructor
public class EmailServiceImpl implements EmailService {
    private static final Logger LOGGER = LoggerFactory.getLogger(EmailServiceImpl.class);
    private final JavaMailSender javaMailSender;

    @Override
    @Async
    public void send(final String to, final String email) {
        try {
            final MimeMessage mimeMessage = javaMailSender.createMimeMessage();
            final MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, "utf-8");
            mimeMessageHelper.setText(email, true);
            mimeMessageHelper.setTo(to);
            mimeMessageHelper.setSubject("Confirm your email address");
            mimeMessageHelper.setFrom("bestbankoftime@gmail.com");
            javaMailSender.send(mimeMessage);
        } catch (MessagingException messagingException) {
            LOGGER.error("Failed to send email", messagingException);
        }
    }
}
