package org.acm.viztools.service.user;

import org.acm.viztools.dto.ModelMapper;
import org.acm.viztools.dto.user.UserInfoDto;
import org.acm.viztools.model.institution.Institution;
import org.acm.viztools.model.user.UserInfo;
import org.acm.viztools.model.util.Country;
import org.acm.viztools.repository.user.UserInfoRepository;
import org.acm.viztools.service.institution.InstitutionService;
import org.acm.viztools.service.util.CountryService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class UserInfoService {

	private final UserInfoRepository repository;

	private final InstitutionService institutionService;

	private final CountryService countryService;

	public UserInfo findById(Long id) {
		return repository.findById(id)
				.orElseThrow(() -> new RuntimeException("User info not found"));
	}

	public UserInfo findByUser(Long userId) {
		return repository.findByUserId(userId)
				.orElseThrow(() -> new RuntimeException("User info not found"));
	}

	public UserInfoDto create(UserInfoDto itemDto) {
		Institution institution = institutionService.findById(itemDto.getInstitutionId());
		Country country = countryService.findById(itemDto.getCountryId());

		UserInfo item = UserInfo.builder()
				.institution(institution)
				.country(country)
				.city(itemDto.getCity())
				.occupation(itemDto.getOccupation())
				.build();

		return ModelMapper.toUserInfoDto(repository.save(item));
	}

	public UserInfoDto readById(Long id) {
		return ModelMapper.toUserInfoDto(findById(id));
	}

	public UserInfoDto update(Long id, UserInfoDto newItem) {
		UserInfo item = findById(id);

		if (newItem.getOccupation() != null) {
			item.setOccupation(newItem.getOccupation());
		}

		return ModelMapper.toUserInfoDto(repository.save(item));
	}

	public void delete(Long id) {
		UserInfo item = findById(id);
		repository.delete(item);
	}

}
