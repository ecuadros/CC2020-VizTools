package repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import model.Weight;

@Repository
public interface WeightRepository extends JpaRepository<Weight, Long> {

    Optional<Weight> findByDkaIdAndProgramId(Long dkaId, Long programId);

}
