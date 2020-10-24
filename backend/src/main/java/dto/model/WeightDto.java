package dto.model;

import lombok.*;
import lombok.experimental.Accessors;


@Getter
@Setter
@NoArgsConstructor
@Accessors(chain = true)
@ToString
public class WeightDto {

    private Long id;

    private Integer min;

    private Integer max;

    private String dkaTitle;

    private String dkagTitle;

    private String programTitle;

    private Long programId;

    private Long dkaId;

    private Long dkagId;

    private Long dkaIndex;

    private Long dkagIndex;

}
