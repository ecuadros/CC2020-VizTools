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
    
    private Boolean isAdmin;

    private Long universityId;

}
