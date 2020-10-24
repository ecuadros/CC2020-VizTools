package dto.model;

import lombok.*;
import lombok.experimental.Accessors;

/**
 * Discipline Knowledge Area Group (DKAG)
 */

@Getter
@Setter
@NoArgsConstructor
@Accessors(chain = true)
@ToString
public class DKAGDto {

    private Long id;

    private String name;

    private Long index;

}
