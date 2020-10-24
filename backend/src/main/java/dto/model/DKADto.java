package dto.model;

import lombok.*;
import lombok.experimental.Accessors;

/**
 * Discipline Knowledge Area (DKA)
 */

@Getter
@Setter
@NoArgsConstructor
@Accessors(chain = true)
@ToString
public class DKADto {

    private Long id;

    private String name;

    private Long index;

    private Long dkagId;

    private Long dkagIndex;

}
