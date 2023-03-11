package org.acm.viztools.dto.auth;

import org.acm.viztools.dto.institution.InstitutionDto;
import org.acm.viztools.dto.user.*;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RegisterDto {

	private UserDto user;

	private UserInfoDto userInfo;
	
	private InstitutionDto institution;

}
