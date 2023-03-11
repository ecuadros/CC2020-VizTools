package org.acm.viztools.model.institution;

import org.acm.viztools.model.discipline.DKA;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "p_weight")
public class PWeight {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotNull
	private Integer value;

	@ManyToOne
	@JoinColumn (name = "program_id", nullable = false)
	private Program program;

	@ManyToOne
	@JoinColumn (name = "dka_id", nullable = false)
	private DKA dka;

}
