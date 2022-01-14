package com.orange.enov.repository;

import com.orange.enov.domain.EtapeOrder;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the EtapeOrder entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EtapeOrderRepository extends JpaRepository<EtapeOrder, Long> {}
