package org.acm.viztools.model.discipline;

import java.util.Set;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "discipline")
public class Discipline {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotNull
	@Column(unique = true)
	private String name;

	@NotNull
	private String acronym;

	@OneToMany(mappedBy = "discipline", cascade = CascadeType.ALL)
	private Set<DWeight> dweights;

}
