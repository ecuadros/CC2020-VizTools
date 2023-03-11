package org.acm.viztools.service.institution;

import java.util.*;

import org.acm.viztools.dto.ModelMapper;
import org.acm.viztools.dto.institution.PWeightDto;
import org.acm.viztools.model.discipline.DKA;
import org.acm.viztools.model.institution.*;
import org.acm.viztools.repository.institution.PWeightRepository;
import org.acm.viztools.service.discipline.DKAService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class PWeightService {

	private final PWeightRepository repository;

	private final DKAService dkaService;

	private final ProgramService programService;

	public PWeight findById(Long id) {
		return repository.findById(id)
				.orElseThrow(() -> new RuntimeException("Discipline Weight not found"));
	}

	public PWeight findByDkaAndProgram(Long dkaId, Long programId) {
		return repository.findByDkaIdAndProgramId(dkaId, programId)
				.orElseThrow(() -> new RuntimeException("Discipline Weight not found"));
	}

	public PWeightDto create(PWeightDto itemDto) {
		DKA dka = dkaService.findById(itemDto.getDkaId());
		Program program = programService.findById(itemDto.getProgramId());

		PWeight item = PWeight.builder()
				.value(itemDto.getValue())
				.dka(dka)
				.program(program)
				.build();

		return ModelMapper.toPWeightDto(repository.save(item));
	}

	public PWeightDto readById(Long id) {
		return ModelMapper.toPWeightDto(findById(id));
	}

	public List<PWeightDto> readByProgramId(Long programId) {
		Program program = programService.findById(programId);
		List<PWeight> items = repository.findByProgramId(programId);
		for (DKA dka : dkaService.findAll()) {
			if (items.stream().noneMatch(item -> item.getDka().getId().equals(dka.getId()))) {
				PWeight item = PWeight.builder()
						.value(0)
						.dka(dka)
						.program(program)
						.build();
				items.add(repository.save(item));
			}
		}
		return items.stream().map(ModelMapper::toPWeightDto).toList();
	}

	public PWeightDto update(Long id, PWeightDto newItem) {
		PWeight item = findById(id);

		if (newItem.getValue() != null) {
			item.setValue(newItem.getValue());
		}

		return ModelMapper.toPWeightDto(repository.save(item));
	}

	public PWeightDto update(Long dkaId, Long programId, PWeightDto newItem) {
		PWeight item = findByDkaAndProgram(dkaId, programId);
		return update(item.getId(), newItem);
	}

	public void delete(Long id) {
		PWeight item = findById(id);
		item.setDka(null);
		item.setProgram(null);
		repository.save(item);
		repository.delete(item);
	}

}
