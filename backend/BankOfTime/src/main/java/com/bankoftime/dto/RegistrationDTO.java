package com.bankoftime.dto;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public record RegistrationDTO(
        @Size(min = 3, max = 25, message = "Author first name must be between 3 to 25 letters")
        @NotBlank(message = "First name is mandatory")
        String firstName,
        @Size(min = 3, max = 25, message = "Author last name must be between 3 to 25 letters")
        @NotBlank(message = "LastName is mandatory")
        String lastName,

        @NotBlank(message = "Password is mandatory")
        String password,
        @Email
        @NotBlank(message = "Email is mandatory")
        String email,
        String city,
        String country,
        String phoneNumber,
        String aboutMe,
        String occupation
) {
}
