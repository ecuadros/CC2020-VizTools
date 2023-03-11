package org.acm.viztools.service.util;

import java.util.List;

import org.acm.viztools.dto.ModelMapper;
import org.acm.viztools.dto.util.CountryDto;
import org.acm.viztools.model.util.Country;
import org.acm.viztools.repository.util.CountryRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class CountryService {

	private final CountryRepository repository;

	public Country findById(Long id) {
		return repository.findById(id)
				.orElseThrow(() -> new RuntimeException("Country not found"));
	}

	public List<Object[]> countInstitutionsAndProgramsPerCountry() {
		return repository.countInstitutionsAndProgramsPerCountry();
	}

	public CountryDto create(CountryDto itemDto) {
		Country item = Country.builder()
				.nameEn(itemDto.getName())
				.iso2(itemDto.getAcronym())
				.build();

		itemDto = ModelMapper.toCountryDto(repository.save(item));
		return setInstitutionAndProgramCountToCountry(itemDto);
	}

	public List<CountryDto> read() {
		List<CountryDto> itemsDto = repository.findAll().stream().map(ModelMapper::toCountryDto).toList();
		return setInstitutionAndProgramCountToCountries(itemsDto);
	}

	public CountryDto readById(Long id) {
		CountryDto itemDto = ModelMapper.toCountryDto(findById(id));
		return setInstitutionAndProgramCountToCountry(itemDto);
	}

	public CountryDto update(Long id, CountryDto newItem) {
		Country item = findById(id);

		if (newItem.getName() != null) {
			item.setNameEn(newItem.getName());
		}

		if (newItem.getAcronym() != null) {
			item.setIso2(newItem.getAcronym());
		}

		CountryDto itemDto = ModelMapper.toCountryDto(item);

		return setInstitutionAndProgramCountToCountry(itemDto);
	}

	public void delete(Long id) {
		Country item = findById(id);
		repository.delete(item);
	}

	private CountryDto setInstitutionAndProgramCountToCountry(CountryDto itemDto) {
		Object[] result = repository.countInstitutionsAndProgramsByCountryId(itemDto.getId());
		itemDto.setInstitutionCount(result != null ? (Long) result[0] : 0);
		itemDto.setProgramCount(result != null ? (Long) result[1] : 0);
		return itemDto;
	}

	private List<CountryDto> setInstitutionAndProgramCountToCountries(List<CountryDto> itemsDto) {
		List<Object[]> results = repository.countInstitutionsAndProgramsPerCountry();
		for (CountryDto itemDto : itemsDto) {
			for (Object[] result : results) {
				if (itemDto.getId().equals((Long) result[0])) {
					itemDto.setInstitutionCount((Long) result[1]);
					itemDto.setProgramCount((Long) result[2]);
				} else {
					itemDto.setInstitutionCount(0L);
					itemDto.setProgramCount(0L);
				}
			}
		}
		return itemsDto;
	}

}
