package com.bankoftime.repositories;

import com.bankoftime.models.AppUserImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AppUserImageRepository extends JpaRepository<AppUserImage, Long> {

    Optional<AppUserImage> findAppUserImageByAppUserId(Long clientId);
}
