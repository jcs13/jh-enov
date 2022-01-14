package com.orange.enov.repository;

import com.orange.enov.domain.BlocOrder;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the BlocOrder entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BlocOrderRepository extends JpaRepository<BlocOrder, Long> {}
