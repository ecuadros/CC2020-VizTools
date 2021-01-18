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
@Table(name = "uprogram", uniqueConstraints = {
    @UniqueConstraint(columnNames = { "name",  "university_id"})
})
public class UProgram {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private String name;

    private String nativeName;

    private String acronym;

    private Long programId;

    @ManyToOne
    @JoinColumn (name = "university_id", nullable = false)
    private University university;

    @OneToMany(mappedBy = "uprogram", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private Set<UWeight> uweights;

}
