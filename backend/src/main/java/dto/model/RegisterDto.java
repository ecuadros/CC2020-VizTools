package dto.model;

import lombok.*;
import lombok.experimental.Accessors;
import model.User;

@Getter
@Setter
@NoArgsConstructor
@Accessors(chain = true)
@ToString
public class RegisterDto {
    
    private UserDto user;

    private UserInfoDto userInfo;
    
    private UniversityDto university;

}
