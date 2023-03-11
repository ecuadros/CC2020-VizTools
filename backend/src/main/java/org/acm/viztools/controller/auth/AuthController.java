package org.acm.viztools.controller.auth;

import org.acm.viztools.dto.auth.*;
import org.acm.viztools.service.security.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/v1/auth")
@RequiredArgsConstructor
public class AuthController {

	private final AuthService authService;

	@PostMapping("/register")
	public ResponseEntity<?> register(@RequestBody RegisterDto request) {
		return ResponseEntity.ok(authService.register(request));
	}

	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody LoginDto request) {
		return ResponseEntity.ok(authService.login(request));
	}

	@PostMapping("/is-email-registered")
	public ResponseEntity<?> isEmailRegistered(@RequestBody String email) {
		return ResponseEntity.ok(authService.isEmailRegistered(email));
	}

	@PostMapping("/activate-account/{token}")
	public ResponseEntity<?> activateAccount(@PathVariable String token) {
		return ResponseEntity.ok(authService.activateAccount(token));
	}

	@GetMapping("/resend-verification-email/{email}")
	public ResponseEntity<?> resendVerificationEmail(@PathVariable String email) {
		return ResponseEntity.ok(authService.resendVerificationEmail(email));
	}

}
