package org.acm.viztools.repository.util;

import java.util.List;

import org.acm.viztools.model.util.Country;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface CountryRepository extends JpaRepository<Country, Long> {

	@Query(value = "SELECT i.country_id, COUNT(DISTINCT i.id) as institution_count, COUNT(DISTINCT p.id) AS program_count FROM institution AS i LEFT JOIN program as p ON i.id = p.institution_id GROUP BY i.country_id", nativeQuery = true)
	List<Object[]> countInstitutionsAndProgramsPerCountry();

	@Query(value = "SELECT COUNT(DISTINCT i.id) as institution_count, COUNT(DISTINCT p.id) AS program_count FROM (SELECT * FROM institution AS i WHERE i.country_id = ?1) AS i LEFT JOIN program as p ON i.id = p.institution_id GROUP BY i.country_id", nativeQuery = true)
	Object[] countInstitutionsAndProgramsByCountryId(Long countryId);

}
