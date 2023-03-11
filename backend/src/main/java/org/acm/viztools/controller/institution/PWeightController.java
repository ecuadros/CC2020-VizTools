package org.acm.viztools.controller.institution;

import org.acm.viztools.dto.institution.PWeightDto;
import org.acm.viztools.service.institution.PWeightService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/v1/program-weight")
@RequiredArgsConstructor
public class PWeightController {

	private final PWeightService service;

	@GetMapping("/program/{programId}")
	public ResponseEntity<?> readByProgramId(@PathVariable Long programId) {
		return ResponseEntity.ok(service.readByProgramId(programId));
	}

	@PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
	@PutMapping("/{id}")
	public ResponseEntity<?> update(@PathVariable Long id, @RequestBody PWeightDto input) {
		return ResponseEntity.ok(service.update(id, input));
	}

}
