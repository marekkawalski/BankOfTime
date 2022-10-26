package com.bankoftime.models;

import com.bankoftime.enums.UserType;
import lombok.*;
import org.springframework.lang.Nullable;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
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
    @Column(name = "Id",
            table = "AppUser")
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "user_sequence"
    )
    private Long id;
    @Column(name = "Name", nullable = false)
    @NotBlank(message = "Name is mandatory")
    private String name;
    @Column(name = "LastName", nullable = false)
    @NotBlank(message = "LastName is mandatory")
    private String lastName;

    @Column(name = "City")
    @Nullable
    private String city;

    @Column(name = "Country")
    @Nullable
    private String country;
    @Column(name = "Email", nullable = false)
    @Email
    @NotBlank(message = "Email is mandatory")
    private String email;
    @Column(name = "Password", nullable = false)
    @NotBlank(message = "Password is mandatory")
    private String password;

    @Column(name = "PhoneNumber")
    @Nullable
    private String phoneNumber;
    @Column(name = "Locked")
    private boolean locked;
    @Column(name = "Enabled")
    private boolean enabled;
    @Enumerated(EnumType.STRING)
    @Column(name = "UserType")
    @NotNull
    private UserType userType = UserType.NORMAL;

    @OneToMany(mappedBy = "seller")
    @ToString.Exclude
    private transient Collection<Offer> sellOffers = new ArrayList<>();

    @OneToMany(mappedBy = "buyer")
    @ToString.Exclude
    private transient Collection<Offer> purchaseOffers = new ArrayList<>();

    @OneToMany(mappedBy = "buyer")
    @ToString.Exclude
    private transient Collection<TimeTransaction> purchaseTransactions = new ArrayList<>();

    @OneToMany(mappedBy = "seller")
    @ToString.Exclude
    private transient Collection<TimeTransaction> sellTransactions = new ArrayList<>();

    @OneToMany(mappedBy = "appUser")
    @ToString.Exclude
    private transient Collection<ConfirmationToken> confirmationTokens = new ArrayList<>();

    @OneToOne(mappedBy = "appUser")
    private transient Image image;

    public AppUser(String name, String lastName, String email, String password, UserType userType) {
        this.name = name;
        this.lastName = lastName;
        this.password = password;
        this.email = email;
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
