package org.acm.viztools.controller.discipline;

import org.acm.viztools.dto.discipline.DWeightDto;
import org.acm.viztools.service.discipline.DWeightService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/v1/discipline-weight")
@RequiredArgsConstructor
public class DWeightController {

	private final DWeightService service;

	@GetMapping("/discipline/{disciplineId}")
	public ResponseEntity<?> readByDisciplineId(@PathVariable Long disciplineId) {
		return ResponseEntity.ok(service.readByDisciplineId(disciplineId));
	}

	@PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
	@PutMapping("/")
	public ResponseEntity<?> update(@PathVariable Long id, @RequestBody DWeightDto input) {
		return ResponseEntity.ok(service.update(id, input));
	}

}
