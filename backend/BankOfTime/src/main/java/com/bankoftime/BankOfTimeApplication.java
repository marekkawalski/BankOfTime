package com.bankoftime;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = "com.bankoftime.*")
public class BankOfTimeApplication {
    public static void main(String[] args) {
        SpringApplication.run(BankOfTimeApplication.class, args);
    }

}
