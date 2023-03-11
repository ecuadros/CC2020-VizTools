package org.acm.viztools.model.discipline;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

/**
 * Discipline Knowledge Area (DKA)
 */

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "dka")
public class DKA {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotNull
	private Long index;

	@NotNull
	@Column(unique = true)
	private String name;

	private String description;

	@ManyToOne
	@JoinColumn(name = "dkag_id", nullable = false)
	private DKAG dkag;

}
