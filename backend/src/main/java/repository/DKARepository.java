package repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import model.DKA;

@Repository
public interface DKARepository extends JpaRepository<DKA, Long> {
    
    Long countByDkagId(Long dkagId);

}
