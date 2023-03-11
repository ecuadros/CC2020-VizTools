package org.acm.viztools.repository.user;

import org.acm.viztools.model.user.UserSession;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserSessionRepository extends JpaRepository<UserSession, Long> {
}
