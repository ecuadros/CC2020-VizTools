package org.acm.viztools.service.discipline;

import java.util.*;

import org.acm.viztools.dto.ModelMapper;
import org.acm.viztools.dto.discipline.DWeightDto;
import org.acm.viztools.model.discipline.*;
import org.acm.viztools.repository.discipline.DWeightRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class DWeightService {

	private final DWeightRepository repository;

	private final DKAService dkaService;

	private final DisciplineService disciplineService;

	public DWeight findById(Long id) {
		return repository.findById(id)
				.orElseThrow(() -> new RuntimeException("Discipline Weight not found"));
	}

	public DWeight findByDkaAndDiscipline(Long dkaId, Long disciplineId) {
		return repository.findByDkaIdAndDisciplineId(dkaId, disciplineId)
				.orElseThrow(() -> new RuntimeException("Discipline Weight not found"));
	}

	public DWeightDto create(DWeightDto itemDto) {
		DKA dka = dkaService.findById(itemDto.getDkaId());
		Discipline discipline = disciplineService.findById(itemDto.getDisciplineId());

		DWeight item = DWeight.builder()
				.min(itemDto.getMin())
				.max(itemDto.getMax())
				.dka(dka)
				.discipline(discipline)
				.build();

		return ModelMapper.toDWeightDto(repository.save(item));
	}

	public DWeightDto readById(Long id) {
		return ModelMapper.toDWeightDto(findById(id));
	}

	public List<DWeightDto> readByDisciplineId(Long disciplineId) {
		disciplineService.findById(disciplineId);
		return repository.findByDisciplineId(disciplineId).stream()
				.map(ModelMapper::toDWeightDto)
				.toList();
	}

	public DWeightDto update(Long id, DWeightDto newItem) {
		DWeight item = findById(id);

		if (newItem.getMin() != null) {
			item.setMin(newItem.getMin());
		}

		if (newItem.getMax() != null) {
			item.setMax(newItem.getMax());
		}

		return ModelMapper.toDWeightDto(repository.save(item));
	}

	public DWeightDto update(Long dkaId, Long disciplineId, DWeightDto newItem) {
		DWeight item = findByDkaAndDiscipline(dkaId, disciplineId);
		return update(item.getId(), newItem);
	}

	public void delete(Long id) {
		DWeight item = findById(id);
		item.setDka(null);
		item.setDiscipline(null);
		repository.save(item);
		repository.delete(item);
	}

}
