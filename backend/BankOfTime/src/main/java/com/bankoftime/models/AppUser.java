package com.bankoftime.models;

import com.bankoftime.enums.UserRole;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.springframework.lang.Nullable;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;

@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "AppUser")
public class AppUser implements UserDetails {
    @SequenceGenerator(
            name = "user_sequence",
            sequenceName = "user_sequence",
            allocationSize = 1
    )
    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "user_sequence"
    )
    private Long id;
    @Column(nullable = false)
    @Size(min = 3, max = 25, message = "Author first name must be between 3 to 25 letters")
    @NotBlank(message = "First name is mandatory")
    private String firstName;
    @Column(nullable = false)
    @Size(min = 3, max = 25, message = "Author last name must be between 3 to 25 letters")
    @NotBlank(message = "LastName is mandatory")
    private String lastName;

    @Nullable
    private String city;

    @Nullable
    private String country;
    @Column(nullable = false)
    @Email
    @NotBlank(message = "Email is mandatory")
    private String email;
    @Column(nullable = false)
    @NotBlank(message = "Password is mandatory")
    private String password;

    @Nullable
    private String phoneNumber;

    @Nullable
    private String aboutMe;

    @Nullable
    private String occupation;
    private boolean locked;
    private boolean enabled;
    @Enumerated(EnumType.STRING)
    @NotNull
    private UserRole userType = UserRole.ROLE_NORMAL;

    @OneToMany(mappedBy = "seller")
    @ToString.Exclude
    @JsonIgnore
    private Collection<Offer> sellOffers = new ArrayList<>();

    @OneToMany(mappedBy = "buyer")
    @ToString.Exclude
    @JsonIgnore
    private Collection<Offer> purchaseOffers = new ArrayList<>();

    @OneToMany(mappedBy = "buyer")
    @ToString.Exclude
    @JsonIgnore
    private Collection<TimeTransaction> purchaseTransactions = new ArrayList<>();

    @OneToMany(mappedBy = "seller")
    @ToString.Exclude
    @JsonIgnore
    private Collection<TimeTransaction> sellTransactions = new ArrayList<>();

    @OneToMany(mappedBy = "appUser")
    @ToString.Exclude
    @JsonIgnore
    private Collection<ConfirmationToken> confirmationTokens = new ArrayList<>();

    @OneToOne(mappedBy = "appUser")
    @JsonIgnore
    private AppUserImage image;


    public AppUser(final String firstName, final String lastName, final String email, final String password, final UserRole userType) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
        this.email = email;
        this.userType = userType;
    }

    public AppUser(final String firstName, final String lastName, @Nullable final String city, @Nullable final String country, final String email, final String password, @Nullable final String phoneNumber, final UserRole userType) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.city = city;
        this.country = country;
        this.email = email;
        this.password = password;
        this.phoneNumber = phoneNumber;
        this.userType = userType;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singletonList(new SimpleGrantedAuthority(userType.name()));
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return !locked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }

}
