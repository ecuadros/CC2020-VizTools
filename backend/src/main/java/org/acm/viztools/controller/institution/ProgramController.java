package org.acm.viztools.controller.institution;

import java.util.List;

import org.acm.viztools.dto.institution.ProgramDto;
import org.acm.viztools.model.user.User;
import org.acm.viztools.service.institution.PWeightService;
import org.acm.viztools.service.institution.ProgramService;
import org.springframework.security.core.Authentication;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/v1/program")
@RequiredArgsConstructor
public class ProgramController {

	private final ProgramService service;

	private final PWeightService pWeightService;

	@PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
	@PostMapping("/")
	public ResponseEntity<?> create(@RequestBody ProgramDto input, Authentication authentication) {
		User user = (User) authentication.getPrincipal();
		input.setInstitutionId(user.getUserInfo().getInstitution().getId());
		return ResponseEntity.ok(service.create(input));
	}

	@GetMapping("/{id}")
	public ResponseEntity<?> readById(@PathVariable Long id,
			@RequestParam(defaultValue = "false") boolean includeWeights) {
		ProgramDto program = service.readById(id);
		if (includeWeights) {
			program.setWeights(pWeightService.readByProgramId(program.getId()));
		}
		return ResponseEntity.ok(program);
	}

	@PostMapping("/multiple/")
	public ResponseEntity<?> readByMultipleIds(@RequestBody List<Long> programIds,
			@RequestParam(defaultValue = "false") boolean includeWeights) {
		List<ProgramDto> programs = service.readByMultipleIds(programIds);
		if (includeWeights) {
			programs.forEach(program -> program.setWeights(pWeightService.readByProgramId(program.getId())));
		}
		return ResponseEntity.ok(programs);
	}

	@PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
	@GetMapping("/institution/{institutionId}")
	public ResponseEntity<?> readByInstitutionId(@PathVariable Long institutionId) {
		return ResponseEntity.ok(service.readByInstitutionId(institutionId));
	}

	@PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
	@PutMapping("/{id}")
	public ResponseEntity<?> update(@PathVariable Long id, @RequestBody ProgramDto input) {
		return ResponseEntity.ok(service.update(id, input));
	}

	@PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
	@DeleteMapping("/{id}")
	public ResponseEntity<?> delete(@PathVariable Long id) {
		service.delete(id);
		return ResponseEntity.ok().build();
	}

}
