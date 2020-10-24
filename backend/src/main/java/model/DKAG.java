package model;

import java.util.Set;

import javax.persistence.*;
import javax.validation.constraints.*;

import lombok.*;
import lombok.experimental.Accessors;

/**
 * Discipline Knowledge Area Group (DKAG)
 */

@Getter
@Setter
@NoArgsConstructor
@Accessors(chain = true)
@Entity
@Table(name = "dkag", uniqueConstraints = {
    @UniqueConstraint(columnNames = { "name" })
})
public class DKAG {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private String name;

    @NotNull
    private Long index;

    @OneToMany(mappedBy = "dkag", cascade = CascadeType.ALL)
    private Set<DKA> dkas;

}
