package org.acm.viztools.dto.institution;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PWeightDto {

	private Long id;

	private Long dkaId;

	private Long programId;

	private Integer value;

}
