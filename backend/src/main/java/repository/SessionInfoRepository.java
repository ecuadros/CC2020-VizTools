package repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
 
import model.SessionInfo;

@Repository
public interface SessionInfoRepository extends JpaRepository<SessionInfo, Long> {
}
