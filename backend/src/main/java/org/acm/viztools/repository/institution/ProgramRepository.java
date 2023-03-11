package org.acm.viztools.repository.institution;

import java.util.List;

import org.acm.viztools.model.institution.Program;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProgramRepository extends JpaRepository<Program, Long> {

	List<Program> findByInstitutionId(Long institutionId);

}
