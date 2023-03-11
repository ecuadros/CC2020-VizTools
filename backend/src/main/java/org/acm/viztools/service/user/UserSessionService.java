package org.acm.viztools.service.user;

import org.acm.viztools.model.user.User;
import org.acm.viztools.model.user.UserSession;
import org.acm.viztools.repository.user.UserSessionRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class UserSessionService {

	private final UserSessionRepository repository;

	private final UserService userService;

	public UserSession findByUser(Long userId) {
		User user = userService.findById(userId);

		if (user.getUserSession() == null) {
			UserSession item = new UserSession();
			user.setUserSession(item);
		}

		return user.getUserSession();
	}

	public UserSession save(UserSession item) {
		return repository.save(item);
	}

}
