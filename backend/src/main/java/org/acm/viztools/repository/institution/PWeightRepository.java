package org.acm.viztools.repository.institution;

import java.util.*;

import org.acm.viztools.model.institution.PWeight;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PWeightRepository extends JpaRepository<PWeight, Long> {

	Optional<PWeight> findByDkaIdAndProgramId(Long dkaId, Long programId);

	List<PWeight> findByProgramId(Long programId);

	List<PWeight> findByDkaId(Long dkaId);

	void deleteByProgramId(Long programId);

}
