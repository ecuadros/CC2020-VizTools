package org.acm.viztools.dto.user;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserInfoDto {

	private Long id;

	private Long institutionId;

	private Long countryId;

	private String city;

	private String occupation;

}
