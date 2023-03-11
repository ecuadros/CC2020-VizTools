package org.acm.viztools.service.institution;

import java.util.*;

import org.acm.viztools.dto.ModelMapper;
import org.acm.viztools.dto.institution.InstitutionDto;
import org.acm.viztools.model.institution.Institution;
import org.acm.viztools.model.util.Country;
import org.acm.viztools.repository.institution.InstitutionRepository;
import org.acm.viztools.service.util.CountryService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class InstitutionService {

	private final InstitutionRepository repository;

	private final CountryService countryService;

	public Institution findById(Long id) {
		return repository.findById(id)
				.orElseThrow(() -> new RuntimeException("Institution not found"));
	}

	public InstitutionDto create(InstitutionDto itemDto) {
		Country country = countryService.findById(itemDto.getCountryId());

		repository.findByNameAndCountryId(itemDto.getName(), itemDto.getCountryId())
				.ifPresent(item -> {
					throw new RuntimeException("Institution already exists");
				});

		Institution item = Institution.builder()
				.name(itemDto.getName())
				.acronym(itemDto.getAcronym())
				.url(itemDto.getUrl())
				.country(country)
				.build();

		itemDto = ModelMapper.toInstitutionDto(repository.save(item));
		return setProgramCountToInstitution(itemDto);
	}

	public List<InstitutionDto> read() {
		List<InstitutionDto> itemsDto = repository.findAll().stream().map(ModelMapper::toInstitutionDto).toList();
		return setProgramCountToInstitutions(itemsDto);
	}

	public InstitutionDto readById(Long id) {
		InstitutionDto itemDto = ModelMapper.toInstitutionDto(findById(id));
		return setProgramCountToInstitution(itemDto);
	}

	public List<InstitutionDto> readByCountryId(Long countryId) {
		List<InstitutionDto> itemsDto = repository.findByCountryId(countryId).stream()
				.map(ModelMapper::toInstitutionDto).toList();
		return setProgramCountToInstitutions(itemsDto);
	}

	public InstitutionDto update(Long id, InstitutionDto newItem) {
		Institution item = findById(id);

		if (newItem.getName() != null) {
			item.setName(newItem.getName());
		}

		if (newItem.getAcronym() != null) {
			item.setAcronym(newItem.getAcronym());
		}

		if (newItem.getUrl() != null) {
			item.setUrl(newItem.getUrl());
		}

		if (newItem.getCountryId() != null) {
			Country country = countryService.findById(newItem.getCountryId());
			item.setCountry(country);
		}

		InstitutionDto itemDto = ModelMapper.toInstitutionDto(repository.save(item));
		return setProgramCountToInstitution(itemDto);
	}

	public void delete(Long id) {
		Institution item = findById(id);
		repository.delete(item);
	}

	private InstitutionDto setProgramCountToInstitution(InstitutionDto itemDto) {
		Object[] result = repository.countProgramsByInstitutionId(itemDto.getId());
		itemDto.setProgramCount(result != null ? (Long) result[0] : 0);
		return itemDto;
	}

	private List<InstitutionDto> setProgramCountToInstitutions(List<InstitutionDto> itemsDto) {
		List<Object[]> results = repository.countProgramsPerInstitution();
		for (InstitutionDto itemDto : itemsDto) {
			for (Object[] result : results) {
				if (itemDto.getId().equals((Long) result[0])) {
					itemDto.setProgramCount((Long) result[1]);
				} else {
					itemDto.setProgramCount(0L);
				}
			}
		}
		return itemsDto;
	}

}
