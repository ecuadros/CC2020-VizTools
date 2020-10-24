package model;

import java.util.Set;

import javax.persistence.*;
import javax.validation.constraints.*;

import lombok.*;
import lombok.experimental.Accessors;

/**
 * Discipline Knowledge Area (DKA)
 */

@Getter
@Setter
@NoArgsConstructor
@Accessors(chain = true)
@Entity
@Table(name = "dka", uniqueConstraints = {
    @UniqueConstraint(columnNames = { "name" }),
    @UniqueConstraint(columnNames = { "dkag_id", "index" })
})
public class DKA {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private String name;

    @NotNull
    private Long index;

    @ManyToOne
    @JoinColumn(name = "dkag_id", nullable = false)
    private DKAG dkag;

    @OneToMany(mappedBy = "dka", cascade = CascadeType.ALL)
    private Set<Weight> weights;

}
