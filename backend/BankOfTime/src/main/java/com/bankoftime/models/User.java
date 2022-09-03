package com.bankoftime.models;

import com.bankoftime.enums.UserType;

import javax.persistence.*;
import java.util.Collection;

@Entity
public class User {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "Id")
    private long id;
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
    @Column(name = "Login")
    private String login;
    @Basic
    @Column(name = "Password")
    private String password;
    @Basic
    @Column(name = "PhoneNumber")
    private String phoneNumber;
    @Basic
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
    @JoinColumn(name = "Id", referencedColumnName = "Id", nullable = false)
    private Image image;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public UserType getUserType() {
        return userType;
    }

    public void setUserType(UserType userType) {
        this.userType = userType;
    }

    public Collection<Offer> getSellOffers() {
        return sellOffers;
    }

    public void setSellOffers(Collection<Offer> sellOffers) {
        this.sellOffers = sellOffers;
    }

    public Collection<Offer> getPurchaseOffers() {
        return purchaseOffers;
    }

    public void setPurchaseOffers(Collection<Offer> purchaseOffers) {
        this.purchaseOffers = purchaseOffers;
    }

    public Collection<Transaction> getPurchaseTransactions() {
        return purchaseTransactions;
    }

    public void setPurchaseTransactions(Collection<Transaction> purchaseTransactions) {
        this.purchaseTransactions = purchaseTransactions;
    }

    public Collection<Transaction> getSellTransactions() {
        return sellTransactions;
    }

    public void setSellTransactions(Collection<Transaction> sellTransactions) {
        this.sellTransactions = sellTransactions;
    }

    public Image getImage() {
        return image;
    }

    public void setImage(Image image) {
        this.image = image;
    }
}
