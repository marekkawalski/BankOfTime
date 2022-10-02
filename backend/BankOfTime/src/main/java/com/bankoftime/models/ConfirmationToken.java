package com.bankoftime.models;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Accessors(fluent = true)
@Table(name = "ConfirmationToken")
public class ConfirmationToken {
    @SequenceGenerator(
            name = "token_sequence",
            sequenceName = "token_sequence",
            allocationSize = 1
    )
    @Id
    @Column(name = "Id",
            table = "ConfirmationToken")
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "token_sequence"
    )
    private Long id;
    @Basic
    @Column(name = "Token")
    private String token;
    @Basic
    @Column(name = "CreatedAt")
    private LocalDateTime createdAt;
    @Basic
    @Column(name = "ExpiresAt")
    private LocalDateTime expiresAt;
    @Basic
    @Column(name = "ConfirmedAt")
    private LocalDateTime confirmedAt;

    @ManyToOne
    @JoinColumn(name = "UserId")
    private AppUser appUser;

    public ConfirmationToken(String token, LocalDateTime createdAt, LocalDateTime expiresAt, AppUser appUser) {
        this.token = token;
        this.createdAt = createdAt;
        this.expiresAt = expiresAt;
        this.appUser = appUser;
    }
}
