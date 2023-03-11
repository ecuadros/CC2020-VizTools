package org.acm.viztools.controller.util;

import org.acm.viztools.service.util.CountryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/v1/country")
@RequiredArgsConstructor
public class CountryController {

	private final CountryService service;

	@GetMapping("/")
	public ResponseEntity<?> read() {
		return ResponseEntity.ok(service.read());
	}

	@GetMapping("/{id}")
	public ResponseEntity<?> readById(@PathVariable Long id) {
		return ResponseEntity.ok(service.readById(id));
	}

}
