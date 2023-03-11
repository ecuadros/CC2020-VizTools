package org.acm.viztools.service.util;

import java.sql.Timestamp;
import java.util.*;

import org.acm.viztools.model.user.User;
import org.acm.viztools.model.util.VerificationToken;
import org.acm.viztools.repository.util.VerificationTokenRepository;
import org.acm.viztools.service.user.UserService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class VerificationTokenService {

	private int EXPIRY_TIME_IN_MINUTES = 60 * 24;

	private final VerificationTokenRepository repository;

	private final UserService userService;

	public VerificationToken findById(Long id) {
		return repository.findById(id)
				.orElseThrow(() -> new RuntimeException("Verification token not found"));
	}

	public VerificationToken findByToken(String token) {
		return repository.findByToken(token)
				.orElseThrow(() -> new RuntimeException("Verification token not found"));
	}

	public VerificationToken create(Long userId) {
		User user = userService.findById(userId);

		Calendar calendar = Calendar.getInstance();
		calendar.setTime(new Timestamp(calendar.getTime().getTime()));
		calendar.add(Calendar.MINUTE, EXPIRY_TIME_IN_MINUTES);

		VerificationToken item = VerificationToken.builder()
				.token(UUID.randomUUID().toString())
				.expiryDate(new Date(calendar.getTime().getTime()))
				.user(user)
				.build();

		return repository.save(item);
	}

	public VerificationToken update(Long id) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(new Timestamp(calendar.getTime().getTime()));
		calendar.add(Calendar.MINUTE, EXPIRY_TIME_IN_MINUTES);

		VerificationToken existingItem = findById(id);
		existingItem.setExpiryDate(new Date(calendar.getTime().getTime()));

		return repository.save(existingItem);
	}

	public void delete(Long id) {
		VerificationToken item = findById(id);
		repository.delete(item);
	}

	public boolean activateAccount(String token) {
		VerificationToken verificationToken = findByToken(token);
		Date expiryDate = verificationToken.getExpiryDate();

		if (expiryDate.before(new Date())) {
			delete(verificationToken.getId());
			throw new RuntimeException("Expired verification token");
		}

		User user = verificationToken.getUser();
		userService.activateUser(user.getId());

		delete(verificationToken.getId());

		return user.isEnabled();
	}

}
