package org.acm.viztools.dto.auth;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LoginDto {

	private String email;

	private String password;

}
