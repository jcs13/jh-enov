package com.orange.enov.repository;

import com.orange.enov.domain.OffreParcoursComposition;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the OffreParcoursComposition entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OffreParcoursCompositionRepository extends JpaRepository<OffreParcoursComposition, Long> {}
