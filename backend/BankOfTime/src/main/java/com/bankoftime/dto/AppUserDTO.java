package com.bankoftime.dto;

import com.bankoftime.enums.UserRole;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;

/**
 * A DTO for the {@link com.bankoftime.models.AppUser} entity
 */
public record AppUserDTO(Long id,
                         @Size(min = 3, max = 25, message = "Author first name must be between 3 to 25 letters")
                         @NotBlank(message = "First name is mandatory") String firstName,
                         @Size(min = 3, max = 25, message = "Author last name must be between 3 to 25 letters")
                         @NotBlank(message = "LastName is mandatory") String lastName,
                         String city,
                         String country,
                         @Email @NotBlank(message = "Email is mandatory")
                         String email,
                         String phoneNumber,
                         @NotNull UserRole userType,

                         String aboutMe,
                         String occupation
) implements Serializable {
}