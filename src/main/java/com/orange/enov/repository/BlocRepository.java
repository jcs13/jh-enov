package com.orange.enov.repository;

import com.orange.enov.domain.Bloc;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Bloc entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BlocRepository extends JpaRepository<Bloc, String> {}
