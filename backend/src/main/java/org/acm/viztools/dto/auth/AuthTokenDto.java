package org.acm.viztools.dto.auth;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AuthTokenDto {

	private String token;

	private String name;

	private String email;

	private Long institutionId;

	private String institutionName;

}
