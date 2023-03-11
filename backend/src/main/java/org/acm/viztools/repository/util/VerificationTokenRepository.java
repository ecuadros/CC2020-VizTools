package org.acm.viztools.repository.util;

import java.util.Optional;

import org.acm.viztools.model.util.VerificationToken;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VerificationTokenRepository extends JpaRepository<VerificationToken, Long> {

	Optional<VerificationToken> findByToken(String token);

}
