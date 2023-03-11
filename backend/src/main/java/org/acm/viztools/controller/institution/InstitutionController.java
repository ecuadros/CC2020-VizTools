package org.acm.viztools.controller.institution;

import org.acm.viztools.dto.institution.InstitutionDto;
import org.acm.viztools.service.institution.InstitutionService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/v1/institution")
@RequiredArgsConstructor
public class InstitutionController {

	private final InstitutionService service;

	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@PostMapping("/")
	public ResponseEntity<?> create(@RequestBody InstitutionDto input) {
		return ResponseEntity.ok(service.create(input));
	}

	@GetMapping("/")
	public ResponseEntity<?> read() {
		return ResponseEntity.ok(service.read());
	}

	@GetMapping("/{id}")
	public ResponseEntity<?> readById(@PathVariable Long id) {
		return ResponseEntity.ok(service.readById(id));
	}

	@GetMapping("/country/{countryId}")
	public ResponseEntity<?> readByCountryId(@PathVariable Long countryId) {
		return ResponseEntity.ok(service.readByCountryId(countryId));
	}

	@PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
	@PutMapping("/{id}")
	public ResponseEntity<?> update(@PathVariable Long id, @RequestBody InstitutionDto input) {
		return ResponseEntity.ok(service.update(id, input));
	}

	@PreAuthorize("hasAnyRole('ROLE_ADMIN')")
	@DeleteMapping("/{id}")
	public ResponseEntity<?> delete(@PathVariable Long id) {
		service.delete(id);
		return ResponseEntity.ok().build();
	}

}
