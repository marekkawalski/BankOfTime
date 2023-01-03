package com.bankoftime.repositories;

import com.bankoftime.models.AppUserImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AppUserImageRepository extends JpaRepository<AppUserImage, Long> {

}
