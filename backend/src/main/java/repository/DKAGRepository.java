package repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import model.DKAG;

@Repository
public interface DKAGRepository extends JpaRepository<DKAG, Long> {
}
