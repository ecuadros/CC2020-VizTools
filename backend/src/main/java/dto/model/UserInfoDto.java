package dto.model;

import lombok.*;
import lombok.experimental.Accessors;

@Getter
@Setter
@NoArgsConstructor
@Accessors(chain = true)
@ToString
public class UserInfoDto {

    private Long id;

    private String city;

    private String state;

    private String zipCode;

    private String phone;

    private String occupation;

    private Boolean whatsApp;

    private Boolean telegram;

    private Long countryId;

    private Long userId;

}
