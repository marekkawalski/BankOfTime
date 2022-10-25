package com.bankoftime.repositories;

import com.bankoftime.models.TimeTransaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TimeTransactionRepository extends JpaRepository<TimeTransaction, Long> {

    @Query(
            "select t from TimeTransaction t where t.buyer = :clientId or t.seller = :clientId"
    )
    List<TimeTransaction> findAllClientTransactions(Long clientId);

    List<TimeTransaction> findAllBySellerId(Long clientId);

    List<TimeTransaction> findAllByBuyerId(Long clientId);
}
