package com.bankoftime.seeders;

import com.bankoftime.enums.OfferType;
import com.bankoftime.enums.UserRole;
import com.bankoftime.models.AppUser;
import com.bankoftime.models.Category;
import com.bankoftime.models.Offer;
import com.bankoftime.repositories.AppUserRepository;
import com.bankoftime.repositories.CategoryRepository;
import com.bankoftime.repositories.OfferRepository;
import com.bankoftime.services.AppUserService;
import com.bankoftime.services.OfferService;
import com.bankoftime.services.RegistrationService;
import lombok.SneakyThrows;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;

@Component
public class Seeder {
    private static final String PASSWORD = "Password1234!";
    private final AppUserRepository appUserRepository;

    private final CategoryRepository categoryRepository;
    private final AppUserService appUserService;
    private final OfferRepository offerRepository;
    private final OfferService offerService;
    private final RegistrationService registrationService;
    private AppUser userNormal;
    private AppUser user2Normal;
    private AppUser admin;

    private Offer offer1;

    private Offer offer2;

    private Offer offer3;

    private Offer offer4;

    private Category other;

    private Category cars;


    public Seeder(final AppUserRepository appUserRepository, final CategoryRepository categoryRepository, final AppUserService appUserService, final OfferRepository offerRepository, final OfferService offerService, final RegistrationService registrationService) {
        this.appUserRepository = appUserRepository;
        this.categoryRepository = categoryRepository;
        this.appUserService = appUserService;
        this.offerRepository = offerRepository;
        this.offerService = offerService;
        this.registrationService = registrationService;
    }


    @EventListener
    @Transactional
    public void seedTables(ContextRefreshedEvent event) {
        if (!(appUserRepository.findAll().isEmpty() && offerRepository.findAll().isEmpty() && categoryRepository.findAll().isEmpty())) {
            return;
        }
        seedAppUsers();
        seedCategories();
        seedOffers();
        seedTimeTransactions();
    }

    @SneakyThrows
    private void seedAppUsers() {
        userNormal = new AppUser("user", "normal", "New York", "USA", "user@normal.com", PASSWORD, "123456789", UserRole.ROLE_NORMAL);
        user2Normal = new AppUser("user2", "normal", "Wahsington", "USA", "user2@normal.com", PASSWORD, "123456789", UserRole.ROLE_NORMAL);
        admin = new AppUser("admin", "admin", "Chicago", "USA", "admin@admin.com", PASSWORD, "123456789", UserRole.ROLE_ADMIN);
        registrationService.confirmToken(appUserService.signUpUser(userNormal));
        registrationService.confirmToken(appUserService.signUpUser(user2Normal));
        registrationService.confirmToken(appUserService.signUpUser(admin));
    }

    private void seedOffers() {
        offer1 = new Offer("Washing the car", 1, "Deep cleaning and washing of car", OfferType.SELL_OFFER,
                "The best car washing in the world! You have never seen a car being as clean as the ones leaving our car wash ",
                "New York");
        offer2 = new Offer("Washing a bike", 1, "Deep cleaning and washing of bike", OfferType.SELL_OFFER,
                "The best bike washing in the world! You have never seen a bike being as clean as the ones leaving our bike wash ",
                "New York");
        offer3 = new Offer("English class", 2, "Online English class", OfferType.PURCHASE_OFFER,
                "I am in an urgent need to bolster my English knowledge by having extracurricular classes",
                "Toronto");
        offer4 = new Offer("Washing Lamborghini", 1, "I need to have my car washed", OfferType.PURCHASE_OFFER,
                "Car is Lamborghini Aventador. I would really appreciate having it as clean as possible ",
                "New York");
        offerService.createOffer(offer1, userNormal);
        offerService.createOffer(offer2, user2Normal);
        offerService.createOffer(offer3, userNormal);
        offerService.createOffer(offer4, user2Normal);
    }

    private void seedCategories() {
        cars = new Category("Cars");
        other = new Category("Other");

        categoryRepository.save(cars);
        categoryRepository.save(other);
    }

    private void seedTimeTransactions() {

    }
}
