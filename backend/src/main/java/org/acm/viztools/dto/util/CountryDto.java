package org.acm.viztools.dto.util;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CountryDto {

	private Long id;

	private String name;

	private String acronym;

	private Long institutionCount;

	private Long programCount;

}
