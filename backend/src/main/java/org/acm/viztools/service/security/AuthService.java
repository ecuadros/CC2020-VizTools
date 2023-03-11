package org.acm.viztools.service.security;

import org.acm.viztools.dto.auth.*;
import org.acm.viztools.dto.user.*;
import org.acm.viztools.dto.institution.InstitutionDto;
import org.acm.viztools.model.user.User;
import org.acm.viztools.model.user.UserInfo;
import org.acm.viztools.model.util.Role;
import org.acm.viztools.model.util.VerificationToken;
import org.acm.viztools.repository.user.UserRepository;
import org.acm.viztools.service.institution.InstitutionService;
import org.acm.viztools.service.user.UserInfoService;
import org.acm.viztools.service.util.EmailService;
import org.acm.viztools.service.util.VerificationTokenService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class AuthService {

	private final UserRepository repository;

	private final UserInfoService userInfoService;

	private final InstitutionService institutionService;

	private final VerificationTokenService verificationTokenService;

	private final EmailService emailService;

	private final PasswordEncoder passwordEncoder;

	private final JwtService jwtService;

	private final AuthenticationManager authenticationManager;

	public boolean isEmailRegistered(String email) {
		return repository.findByEmail(email).isPresent();
	}

	public boolean register(RegisterDto request) {
		InstitutionDto institutionDto = request.getInstitution();
		UserInfoDto userInfoDto = request.getUserInfo();
		UserDto userDto = request.getUser();

		if (isEmailRegistered(request.getUser().getEmail())) {
			throw new RuntimeException("Email already registered");
		}

		if (request.getInstitution().getId() == -1) {
			institutionDto = institutionService.create(institutionDto);
		} else {
			institutionDto = institutionService.update(institutionDto.getId(), institutionDto);
		}

		userInfoDto.setInstitutionId(institutionDto.getId());
		userInfoDto = userInfoService.create(userInfoDto);

		UserInfo UserInfo = userInfoService.findById(userInfoDto.getId());

		User user = User.builder()
				.firstName(userDto.getFirstName())
				.lastName(userDto.getLastName())
				.email(userDto.getEmail())
				.password(passwordEncoder.encode(userDto.getPassword()))
				.role(Role.USER)
				.userInfo(UserInfo)
				.isAccountNonLocked(true)
				.isEnabled(false)
				.build();

		repository.save(user);

		VerificationToken verificationToken = verificationTokenService.create(user.getId());
		emailService.sendVerificationEmail(user.getFullName(), user.getEmail(), verificationToken.getToken());

		return true;
	}

	public AuthTokenDto login(LoginDto request) {
		authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(
						request.getEmail(),
						request.getPassword()));

		User user = repository.findByEmail(request.getEmail())
				.orElseThrow(() -> new RuntimeException("User not found"));

		UserInfo userInfo = user.getUserInfo();

		String jwtToken = jwtService.generateToken(user);

		AuthTokenDto authTokenDto = AuthTokenDto.builder()
				.token(jwtToken)
				.name(user.getFullName())
				.email(user.getEmail())
				.institutionId(userInfo == null ? -1 : userInfo.getInstitution().getId())
				.institutionName(userInfo == null ? "" : userInfo.getInstitution().getName())
				.build();

		return authTokenDto;
	}

	public boolean activateAccount(String token) {
		return verificationTokenService.activateAccount(token);
	}

	public boolean resendVerificationEmail(String email) {
		User user = repository.findByEmail(email)
				.orElseThrow(() -> new RuntimeException("User not found"));

		if (user.isEnabled()) {
			throw new RuntimeException("User already verified");
		}

		VerificationToken verificationToken = user.getVerificationToken();

		if (verificationToken == null) {
			verificationToken = verificationTokenService.create(user.getId());
		} else {
			verificationToken = verificationTokenService.update(verificationToken.getId());
		}

		emailService.sendVerificationEmail(user.getFullName(), user.getEmail(), verificationToken.getToken());

		return true;
	}

}
