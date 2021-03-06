package dto.model;

import lombok.*;
import lombok.experimental.Accessors;

@Getter
@Setter
@NoArgsConstructor
@Accessors(chain = true)
@ToString
public class UserDto {

    private Long id;

    private String firstName;

    private String lastName;

    private String email;

    private String password;

    private Boolean isAdmin;

    private Long universityId;

    private Long userInfoId;

    public String getFullName() {
		return firstName + ' ' + lastName;
	}

}
