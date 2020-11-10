package dto.model;

import lombok.*;
import lombok.experimental.Accessors;

@Getter
@Setter
@NoArgsConstructor
@Accessors(chain = true)
@ToString
public class AuthTokenDto {

    private Long id;

    private String name;
    
    private String token;

    private String email;
    
    private Boolean isAdmin;

    private String universityName;

    private Long universityId;

}
