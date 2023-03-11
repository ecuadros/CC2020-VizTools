package org.acm.viztools.service.institution;

import java.util.*;

import org.acm.viztools.dto.ModelMapper;
import org.acm.viztools.dto.institution.ProgramDto;
import org.acm.viztools.model.discipline.Discipline;
import org.acm.viztools.model.institution.*;
import org.acm.viztools.repository.institution.PWeightRepository;
import org.acm.viztools.repository.institution.ProgramRepository;
import org.acm.viztools.service.discipline.DisciplineService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class ProgramService {

	private final ProgramRepository repository;

	private final PWeightRepository pWeightRepository;

	private final InstitutionService institutionService;

	private final DisciplineService disciplineService;

	public Program findById(Long id) {
		return repository.findById(id)
				.orElseThrow(() -> new RuntimeException("Program not found"));
	}

	public ProgramDto create(ProgramDto itemDto) {
		Institution institution = institutionService.findById(itemDto.getInstitutionId());
		Discipline discipline = disciplineService.findById(itemDto.getDisciplineId());

		Program item = Program.builder()
				.name(itemDto.getName())
				.acronym(itemDto.getAcronym())
				.nativeName(itemDto.getNativeName())
				.institution(institution)
				.disciplineId(discipline.getId())
				.build();

		return ModelMapper.toProgramDto(repository.save(item));
	}

	public List<ProgramDto> read() {
		return repository.findAll().stream().map(ModelMapper::toProgramDto).toList();
	}

	public ProgramDto readById(Long id) {
		return ModelMapper.toProgramDto(findById(id));
	}

	public List<ProgramDto> readByInstitutionId(Long institutionId) {
		return repository.findByInstitutionId(institutionId).stream().map(ModelMapper::toProgramDto).toList();
	}

	public List<ProgramDto> readByMultipleIds(List<Long> ids) {
		return repository.findAllById(ids).stream().map(ModelMapper::toProgramDto).toList();
	}

	public ProgramDto update(Long id, ProgramDto newItem) {
		Program item = findById(id);

		if (newItem.getName() != null) {
			item.setName(newItem.getName());
		}

		if (newItem.getAcronym() != null) {
			item.setAcronym(newItem.getAcronym());
		}

		if (newItem.getNativeName() != null) {
			item.setNativeName(newItem.getNativeName());
		}

		if (newItem.getInstitutionId() != null) {
			Institution institution = institutionService.findById(newItem.getInstitutionId());
			item.setInstitution(institution);
		}

		return ModelMapper.toProgramDto(repository.save(item));
	}

	public void delete(Long id) {
		Program item = findById(id);
		pWeightRepository.deleteByProgramId(item.getId());
		repository.delete(item);
	}

}
