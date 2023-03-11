package org.acm.viztools.dto.user;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {

	private Long id;

	private String firstName;

	private String lastName;

	private String email;

	private String password;

	private Long userInfoId;

}
