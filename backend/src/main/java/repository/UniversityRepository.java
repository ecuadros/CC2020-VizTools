package repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import model.University;

@Repository
public interface UniversityRepository extends JpaRepository<University, Long> {

    List<University> findByCountryId(Long countryId);

}
