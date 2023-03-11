package org.acm.viztools.repository.discipline;

import org.acm.viztools.model.discipline.Discipline;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DisciplineRepository extends JpaRepository<Discipline, Long> {
}
