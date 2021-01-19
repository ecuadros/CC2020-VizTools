package dto.model;

import java.util.List;

import lombok.*;
import lombok.experimental.Accessors;

@Getter
@Setter
@NoArgsConstructor
@Accessors(chain = true)
@ToString
public class ProgramDto {

    private Long id;

    private String name;

    private String nativeName;

    private String acronym;

    private List<WeightDto> weights;

}
