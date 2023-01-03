package com.bankoftime.services.impl;

import org.springframework.stereotype.Service;

import java.util.function.Predicate;
import java.util.regex.Pattern;

@Service
public class EmailValidator implements Predicate<String> {

    @Override
    public boolean test(String email) {
        return Pattern
                .compile("^[A-Za-z\\d+_.-]+@[A-Za-z\\d.-]+$", Pattern.CASE_INSENSITIVE)
                .matcher(email)
                .find();
    }
}