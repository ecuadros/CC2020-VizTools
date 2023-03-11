package org.acm.viztools.dto.institution;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class InstitutionDto {

	private Long id;

	private String name;

	private String acronym;

	private String url;

	private Long countryId;

	private String countryName;

	private Long programCount;

}
