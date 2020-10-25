package repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import model.UProgram;

@Repository
public interface UProgramRepository extends JpaRepository<UProgram, Long> {

    List<UProgram> findByUniversityId(Long universityId);

}
