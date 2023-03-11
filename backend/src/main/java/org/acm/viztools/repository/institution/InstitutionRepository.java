package org.acm.viztools.repository.institution;

import java.util.List;
import java.util.Optional;

import org.acm.viztools.model.institution.Institution;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface InstitutionRepository extends JpaRepository<Institution, Long> {

	List<Institution> findByCountryId(Long countryId);

	Optional<Institution> findByNameAndCountryId(String name, Long countryId);

	@Query(value = "SELECT p.institution_id, COUNT(DISTINCT p.id) AS program_count FROM program as p GROUP BY p.institution_id", nativeQuery = true)
	List<Object[]> countProgramsPerInstitution();

	@Query(value = "SELECT COUNT(*) AS program_count FROM program as p WHERE p.institution_id = ?1", nativeQuery = true)
	Object[] countProgramsByInstitutionId(Long institutionId);

}
