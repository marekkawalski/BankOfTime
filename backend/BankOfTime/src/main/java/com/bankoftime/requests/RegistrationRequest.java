package com.bankoftime.requests;

public record RegistrationRequest(String name, String lastName, String password, String userName, String email) {
}
