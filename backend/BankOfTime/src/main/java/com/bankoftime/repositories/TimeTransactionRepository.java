package com.bankoftime.repositories;

import com.bankoftime.models.TimeTransaction;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TimeTransactionRepository extends JpaRepository<TimeTransaction, Long> {

    @Query(
            "select t from TimeTransaction t where t.buyer.id = :clientId or t.seller.id = :clientId"
    )
    Page<List<TimeTransaction>> findAllClientTransactions(final Pageable pageable, final Long clientId);

    List<TimeTransaction> findAllBySellerId(final Long clientId);

    List<TimeTransaction> findAllByBuyerId(final Long clientId);

}
