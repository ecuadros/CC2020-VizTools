package org.acm.viztools.dto.institution;

import java.util.List;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProgramDto {

	private Long id;

	private String name;

	private String nativeName;

	private String acronym;

	private Long institutionId;

	private String institutionAcronym;

	private Long countryId;

	private String countryAcronym;

	private Long disciplineId;

	private List<PWeightDto> weights;

}
