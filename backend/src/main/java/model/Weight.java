package model;

import javax.persistence.*;
import javax.validation.constraints.*;

import lombok.*;
import lombok.experimental.Accessors;


@Getter
@Setter
@NoArgsConstructor
@Accessors(chain = true)
@Entity
@Table(name = "weight", uniqueConstraints = {
    @UniqueConstraint(columnNames = { "dka_id", "program_id" })
})
public class Weight {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private Integer min;

    @NotNull
    private Integer max;

    @ManyToOne
    @JoinColumn (name = "program_id", nullable = true)
    private Program program;

    @ManyToOne
    @JoinColumn (name = "dka_id", nullable = true)
    private DKA dka;

}
