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
@Table(name = "uweight", uniqueConstraints = {
    @UniqueConstraint(columnNames = { "dka_id", "uprogram_id" })
})
public class UWeight {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private Integer value;

    @ManyToOne
    @JoinColumn (name = "uprogram_id", nullable = false)
    private UProgram uprogram;

    @ManyToOne
    @JoinColumn (name = "dka_id", nullable = false)
    private DKA dka;

}
