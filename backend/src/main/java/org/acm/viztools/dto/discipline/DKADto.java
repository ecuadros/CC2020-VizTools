package org.acm.viztools.dto.discipline;

import jakarta.persistence.Column;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DKADto {

	private Long id;

	private String name;

	private Long index;

	@Column(columnDefinition = "text")
	private String description;

	private Long dkagId;

	private Long dkagIndex;

}
