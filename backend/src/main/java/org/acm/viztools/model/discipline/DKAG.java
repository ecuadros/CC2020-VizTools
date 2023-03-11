package org.acm.viztools.model.discipline;

import java.util.Set;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

/**
 * Discipline Knowledge Area Group (DKAG)
 */

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "dkag")
public class DKAG {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotNull
	private Long index;

	@NotNull
	@Column(unique = true)
	private String name;

	@OneToMany(mappedBy = "dkag", cascade = CascadeType.ALL)
	private Set<DKA> dkas;

}
