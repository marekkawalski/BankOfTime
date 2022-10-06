package com.bankoftime.models;

import com.bankoftime.enums.UserType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Accessors(fluent = true)
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
    @Basic
    @Column(name = "Name")
    private String name;
    @Basic
    @Column(name = "LastName")
    private String lastName;
    @Basic
    @Column(name = "City")
    private String city;
    @Basic
    @Column(name = "Country")
    private String country;
    @Basic
    @Column(name = "Username")
    private String username;
    @Basic
    @Column(name = "Password")
    private String password;
    @Basic
    @Column(name = "PhoneNumber")
    private String phoneNumber;
    @Basic
    @Column(name = "Locked")
    private boolean locked;
    @Basic
    @Column(name = "Enabled")
    private boolean enabled;
    @Basic
    @Enumerated(EnumType.STRING)
    @Column(name = "UserType")
    private UserType userType;
    @OneToMany(mappedBy = "seller")
    private transient Collection<Offer> sellOffers = new ArrayList<>();
    @OneToMany(mappedBy = "buyer")
    private transient Collection<Offer> purchaseOffers = new ArrayList<>();
    @OneToMany(mappedBy = "buyer")
    private transient Collection<TimeTransaction> purchaseTransactions = new ArrayList<>();
    @OneToMany(mappedBy = "seller")
    private transient Collection<TimeTransaction> sellTransactions = new ArrayList<>();
    @OneToMany(mappedBy = "appUser")
    private transient Collection<ConfirmationToken> confirmationTokens = new ArrayList<>();
    @OneToOne(mappedBy = "appUser")
    private transient Image image;

    public AppUser(String name, String lastName, String username, String password, UserType userType) {
        this.name = name;
        this.lastName = lastName;
        this.password = password;
        this.username = username;
        this.userType = userType;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singletonList(new SimpleGrantedAuthority(userType.name()));
    }

    @Override
    public String getPassword() {
        return this.password;
    }

    @Override
    public String getUsername() {
        return this.username;
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
