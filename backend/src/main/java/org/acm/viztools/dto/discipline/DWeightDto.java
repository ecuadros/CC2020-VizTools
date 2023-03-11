package org.acm.viztools.dto.discipline;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DWeightDto {

	private Long id;

	private Long dkaId;

	private Long disciplineId;

	private Integer min;

	private Integer max;

}
