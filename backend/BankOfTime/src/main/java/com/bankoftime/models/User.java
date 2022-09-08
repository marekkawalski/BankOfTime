package com.bankoftime.models;

import com.bankoftime.enums.UserType;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.Collection;
import java.util.Collections;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Accessors(fluent = true)
public abstract class User implements UserDetails {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "Id")
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
    @Column(name = "Email")
    private String email;
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
    private Collection<Offer> sellOffers;
    @OneToMany(mappedBy = "buyer")
    private Collection<Offer> purchaseOffers;
    @OneToMany(mappedBy = "buyer")
    private Collection<Transaction> purchaseTransactions;
    @OneToMany(mappedBy = "seller")
    private Collection<Transaction> sellTransactions;
    @OneToOne
    @JoinColumn(name = "Id", nullable = false)
    private Image image;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singletonList(new SimpleGrantedAuthority(userType.name()));
    }

    @Override
    public boolean isAccountNonExpired() {
        return false;
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
