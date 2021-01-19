package dto.model;

import lombok.*;
import lombok.experimental.Accessors;

@Getter
@Setter
@NoArgsConstructor
@Accessors(chain = true)
@ToString
public class UniversityDto {

    private Long id;

    private String name;

    private String acronym;

    private String url;

    private Long countryId;

    private String countryName;

}
