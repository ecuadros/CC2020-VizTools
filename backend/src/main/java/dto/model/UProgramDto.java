package dto.model;

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

    private List<UWeightDto> weights;

}
