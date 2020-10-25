package repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import model.UWeight;

@Repository
public interface UWeightRepository extends JpaRepository<UWeight, Long> {

    Optional<UWeight> findByDkaIdAndUprogramId(Long dkaId, Long uprogramId);

}
