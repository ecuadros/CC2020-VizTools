package dto.model;

import java.util.List;

import lombok.*;
import lombok.experimental.Accessors;

@Getter
@Setter
@NoArgsConstructor
@Accessors(chain = true)
@ToString
public class UProgramDto {

    private Long id;

    private String name;

    private String nativeName;

    private String acronym;

    private Long universityId;

    private String universityName;

    private String countryName;

    private Long programId;

    private List<UWeightDto> weights;

}
