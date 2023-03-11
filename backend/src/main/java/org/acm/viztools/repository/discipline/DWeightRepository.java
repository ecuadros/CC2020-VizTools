package org.acm.viztools.repository.discipline;

import java.util.*;

import org.acm.viztools.model.discipline.DWeight;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DWeightRepository extends JpaRepository<DWeight, Long> {

	Optional<DWeight> findByDkaIdAndDisciplineId(Long dkaId, Long disciplineId);

	List<DWeight> findByDisciplineId(Long disciplineId);

	List<DWeight> findByDkaId(Long dkaId);

}
