package org.acm.viztools.model.discipline;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "d_weight")
public class DWeight {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotNull
	private Integer min;

	@NotNull
	private Integer max;

	@ManyToOne
	@JoinColumn (name = "discipline_id", nullable = true)
	private Discipline discipline;

	@ManyToOne
	@JoinColumn (name = "dka_id", nullable = true)
	private DKA dka;

}
