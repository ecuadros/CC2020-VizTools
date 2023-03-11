package org.acm.viztools.dto.discipline;

import java.util.List;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DisciplineDto {

	private Long id;

	private String name;

	private String acronym;

	private List<DWeightDto> weights;

}
