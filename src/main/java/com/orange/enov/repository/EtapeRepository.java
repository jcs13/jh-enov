package com.orange.enov.repository;

import com.orange.enov.domain.Etape;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Etape entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EtapeRepository extends JpaRepository<Etape, Long> {}
