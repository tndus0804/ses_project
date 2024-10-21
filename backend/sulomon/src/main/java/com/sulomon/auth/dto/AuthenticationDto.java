package com.sulomon.auth.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.PastOrPresent;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Builder;

import java.time.LocalDate;

public final class AuthenticationDto {
    private AuthenticationDto() {}

    @Builder
    public record AuthRequest (
            @NotBlank(message = "Please enter a user id.")
            @Pattern(
                    regexp = "[A-Za-z0-9]+",
                    message = "The user id may only contain alphanumeric characters, and is case-sensitive."
            )
            @Size(min = 3, message = "The password must be at least 3 characters long.")
            @Size(max = 30, message = "The password must be no more than 30 characters long.")
            String userId,

            @NotBlank(message = "Please enter a password.")
            @Pattern(
                    regexp = "^[A-Za-z\\d~!@#$%^&*?_=\\-+,./:;]+$",
                    message = """
                            The password may only contain letters, numbers, and special characters, and is case-sensitive.
                            Allowed special characters are "~!@#$%^&*?_=\\-+,.:;".
                            """
            )
            @Size(min = 3, message = "The password must be at least 8 characters long.")
            @Size(max = 100, message = "The password must be no more than 100 characters long.")
            String password
    ) {
        // compact
        public AuthRequest {
        }
    }

    @Builder
    public record SignUpRequest(
            @NotBlank(message = "Please enter a user id.")
            @Pattern(
                    regexp = "[A-Za-z0-9]+",
                    message = "The user id may only contain alphanumeric characters, and is case-sensitive."
            )
            @Size(min = 3, message = "The password must be at least 3 characters long.")
            @Size(max = 30, message = "The password must be no more than 30 characters long.")
            String userId,

            @NotBlank(message = "Please enter a password.")
            @Pattern(
                    regexp = "^[A-Za-z\\d~!@#$%^&*?_=\\-+,./:;]+$",
                    message = """
                            The password may only contain letters, numbers, and special characters, and is case-sensitive.
                            Allowed special characters are "~!@#$%^&*?_=\\-+,.:;".
                            """
            )
            @Size(min = 3, message = "The password must be at least 8 characters long.")
            @Size(max = 100, message = "The password must be no more than 100 characters long.")
            String password,

            @NotBlank
            @Email
            @Size(max = 255, message = "The password must be no more than 255 characters long")
            String email,

            @NotBlank
            String name,

            @NotNull
            @PastOrPresent // test required
            LocalDate birthday,

            String gender,
            String phoneNumber
    ) {}

    @Builder
    public record AuthResponse(
            @JsonProperty("access_token")
            String token
    ) {
    }
}
