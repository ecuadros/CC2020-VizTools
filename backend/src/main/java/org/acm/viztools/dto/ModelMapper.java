package org.acm.viztools.dto;

import org.acm.viztools.dto.discipline.*;
import org.acm.viztools.dto.institution.*;
import org.acm.viztools.dto.user.*;
import org.acm.viztools.dto.util.*;
import org.acm.viztools.model.discipline.*;
import org.acm.viztools.model.institution.*;
import org.acm.viztools.model.user.*;
import org.acm.viztools.model.util.*;

public class ModelMapper {

	public static UserDto toUserDto(User item) {
		return UserDto.builder()
				.id(item.getId())
				.firstName(item.getFirstName())
				.lastName(item.getLastName())
				.email(item.getEmail())
				.password(item.getPassword())
				.userInfoId(item.getUserInfo() != null ? item.getUserInfo().getId() : null)
				.build();
	}

	public static UserInfoDto toUserInfoDto(UserInfo item) {
		return UserInfoDto.builder()
				.id(item.getId())
				.institutionId(item.getInstitution() != null ? item.getInstitution().getId() : null)
				.countryId(item.getCountry() != null ? item.getCountry().getId() : null)
				.city(item.getCity())
				.occupation(item.getOccupation())
				.build();
	}

	public static CountryDto toCountryDto(Country item) {
		return CountryDto.builder()
				.id(item.getId())
				.name(item.getNameEn())
				.acronym(item.getIso2())
				.build();
	}

	public static InstitutionDto toInstitutionDto(Institution item) {
		return InstitutionDto.builder()
				.id(item.getId())
				.name(item.getName())
				.acronym(item.getAcronym())
				.url(item.getUrl())
				.countryId(item.getCountry() != null ? item.getCountry().getId() : null)
				.countryName(item.getCountry() != null ? item.getCountry().getNameEn() : null)
				.build();
	}

	public static ProgramDto toProgramDto(Program item) {
		return ProgramDto.builder()
				.id(item.getId())
				.name(item.getName())
				.nativeName(item.getNativeName())
				.acronym(item.getAcronym())
				.institutionId(item.getInstitution() != null ? item.getInstitution().getId() : null)
				.institutionAcronym(item.getInstitution() != null ? item.getInstitution().getAcronym() : null)
				.countryId(
						item.getInstitution().getCountry() != null ? item.getInstitution().getCountry().getId() : null)
				.countryAcronym(
						item.getInstitution().getCountry() != null ? item.getInstitution().getCountry().getIso2()
								: null)
				.disciplineId(item.getDisciplineId())
				.build();
	}

	public static DisciplineDto toDisciplineDto(Discipline item) {
		return DisciplineDto.builder()
				.id(item.getId())
				.name(item.getName())
				.acronym(item.getAcronym())
				.weights(item.getDweights().stream().map(ModelMapper::toDWeightDto).toList())
				.build();
	}

	public static DKAGDto toDKAGDto(DKAG item) {
		return DKAGDto.builder()
				.id(item.getId())
				.name(item.getName())
				.index(item.getIndex())
				.build();
	}

	public static DKADto toDKADto(DKA item) {
		return DKADto.builder()
				.id(item.getId())
				.name(item.getName())
				.description(item.getDescription())
				.index(item.getIndex())
				.dkagId(item.getDkag() != null ? item.getDkag().getId() : null)
				.dkagIndex(item.getDkag() != null ? item.getDkag().getIndex() : null)
				.build();
	}

	public static DWeightDto toDWeightDto(DWeight item) {
		return DWeightDto.builder()
				.id(item.getId())
				.dkaId(item.getDka() != null ? item.getDka().getId() : null)
				.disciplineId(item.getDiscipline() != null ? item.getDiscipline().getId() : null)
				.min(item.getMin())
				.max(item.getMax())
				.build();
	}

	public static PWeightDto toPWeightDto(PWeight item) {
		return PWeightDto.builder()
				.id(item.getId())
				.dkaId(item.getDka() != null ? item.getDka().getId() : null)
				.programId(item.getProgram() != null ? item.getProgram().getId() : null)
				.value(item.getValue())
				.build();
	}

}
