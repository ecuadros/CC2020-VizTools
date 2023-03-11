package org.acm.viztools.repository.user;

import java.util.Optional;

import org.acm.viztools.model.user.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserInfoRepository extends JpaRepository<UserInfo, Long> {

	Optional<UserInfo> findByUserId(Long userId);

}
