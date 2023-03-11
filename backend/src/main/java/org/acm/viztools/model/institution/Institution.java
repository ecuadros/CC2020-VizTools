package org.acm.viztools.model.institution;

import org.acm.viztools.model.util.Country;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "institution")
public class Institution {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotNull
	private String name;

	private String acronym;

	private String url;

	@ManyToOne
	@JoinColumn(name = "country_id", nullable = false)
	private Country country;

}
