package com.orange.enov.repository;

import com.orange.enov.domain.ParcoursDefinition;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the ParcoursDefinition entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ParcoursDefinitionRepository extends JpaRepository<ParcoursDefinition, String> {}
