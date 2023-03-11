package org.acm.viztools.service.discipline;

import java.util.*;

import org.acm.viztools.dto.ModelMapper;
import org.acm.viztools.dto.discipline.DisciplineDto;
import org.acm.viztools.model.discipline.Discipline;
import org.acm.viztools.repository.discipline.DisciplineRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class DisciplineService {

	private final DisciplineRepository repository;

	public Discipline findById(Long id) {
		return repository.findById(id)
				.orElseThrow(() -> new RuntimeException("Discipline not found"));
	}

	public DisciplineDto create(DisciplineDto itemDto) {
		Discipline item = Discipline.builder()
				.name(itemDto.getName())
				.acronym(itemDto.getAcronym())
				.build();

		return ModelMapper.toDisciplineDto(repository.save(item));
	}

	public List<DisciplineDto> read() {
		return repository.findAll().stream().map(ModelMapper::toDisciplineDto).toList();
	}

	public DisciplineDto readById(Long id) {
		return ModelMapper.toDisciplineDto(findById(id));
	}

	public List<DisciplineDto> readByMultipleIds(List<Long> ids) {
		return repository.findAllById(ids).stream().map(ModelMapper::toDisciplineDto).toList();
	}

	public DisciplineDto update(Long id, DisciplineDto newItem) {
		Discipline item = findById(id);

		if (newItem.getName() != null) {
			item.setName(newItem.getName());
		}

		if (newItem.getAcronym() != null) {
			item.setAcronym(newItem.getAcronym());
		}

		return ModelMapper.toDisciplineDto(repository.save(item));
	}

	public void delete(Long id) {
		Discipline item = findById(id);
		repository.delete(item);
	}

}
