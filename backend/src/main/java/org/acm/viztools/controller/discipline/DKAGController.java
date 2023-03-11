package org.acm.viztools.controller.discipline;

import org.acm.viztools.dto.discipline.DKAGDto;
import org.acm.viztools.service.discipline.DKAGService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/v1/dkag")
@RequiredArgsConstructor
public class DKAGController {

	private final DKAGService service;

	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@PostMapping("/")
	public ResponseEntity<?> create(@RequestBody DKAGDto input) {
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

	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@PutMapping("/{id}")
	public ResponseEntity<?> update(@PathVariable Long id, @RequestBody DKAGDto input) {
		return ResponseEntity.ok(service.update(id, input));
	}

	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@DeleteMapping("/{id}")
	public ResponseEntity<?> delete(@PathVariable Long id) {
		service.delete(id);
		return ResponseEntity.ok().build();
	}

}
