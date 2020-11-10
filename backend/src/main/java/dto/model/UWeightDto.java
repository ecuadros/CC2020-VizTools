package dto.model;

import lombok.*;
import lombok.experimental.Accessors;


@Getter
@Setter
@NoArgsConstructor
@Accessors(chain = true)
@ToString
public class UWeightDto {

    private Long id;

    private Integer value;

    private String dkaTitle;

    private String dkagTitle;

    private Long programId;

    private Long dkaId;

    private Long dkaIndex;

    private Long dkagIndex;

}
