package org.acm.viztools.controller.discipline;

import java.util.List;

import org.acm.viztools.dto.discipline.DisciplineDto;
import org.acm.viztools.service.discipline.DWeightService;
import org.acm.viztools.service.discipline.DisciplineService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/v1/discipline")
@RequiredArgsConstructor
public class DisciplineController {

	private final DisciplineService service;

	private final DWeightService weightService;

	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@PostMapping("/")
	public ResponseEntity<?> create(@RequestBody DisciplineDto input) {
		return ResponseEntity.ok(service.create(input));
	}

	@GetMapping("/")
	public ResponseEntity<?> read() {
		return ResponseEntity.ok(service.read());
	}

	@GetMapping("/{id}")
	public ResponseEntity<?> readById(@PathVariable Long id,
			@RequestParam(defaultValue = "false") boolean includeWeights) {
		DisciplineDto discipline = service.readById(id);
		if (includeWeights) {
			discipline.setWeights(weightService.readByDisciplineId(id));
		}
		return ResponseEntity.ok(discipline);
	}

	@PostMapping("/multiple/")
	public ResponseEntity<?> readByMultipleIds(@RequestBody List<Long> ids,
			@RequestParam(defaultValue = "false") boolean includeWeights) {
		List<DisciplineDto> disciplines = service.readByMultipleIds(ids);
		if (includeWeights) {
			disciplines.forEach(discipline -> discipline.setWeights(weightService.readByDisciplineId(discipline.getId())));
		}
		return ResponseEntity.ok(disciplines);
	}

	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@PutMapping("/{id}")
	public ResponseEntity<?> update(@PathVariable Long id, @RequestBody DisciplineDto input) {
		return ResponseEntity.ok(service.update(id, input));
	}

	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@DeleteMapping("/{id}")
	public ResponseEntity<?> delete(@PathVariable Long id) {
		service.delete(id);
		return ResponseEntity.ok().build();
	}

}
