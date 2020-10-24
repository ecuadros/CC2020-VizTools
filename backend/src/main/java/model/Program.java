package model;

import java.util.Set;

import javax.persistence.*;
import javax.validation.constraints.*;

import lombok.*;
import lombok.experimental.Accessors;

@Getter
@Setter
@NoArgsConstructor
@Accessors(chain = true)
@Entity
@Table(name = "program", uniqueConstraints = {
    @UniqueConstraint(columnNames = { "name" })
})
public class Program {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private String name;

    private String acronym;

    @OneToMany(mappedBy = "program", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private Set<Weight> weights;

}
