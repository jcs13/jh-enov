package com.orange.enov.repository;

import com.orange.enov.domain.ParcoursComposition;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the ParcoursComposition entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ParcoursCompositionRepository extends JpaRepository<ParcoursComposition, Long> {}