package org.acm.viztools.model.institution;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "program", uniqueConstraints = {
	@UniqueConstraint(columnNames = { "name", "institution_id"})
})
public class Program {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotNull
	private String name;

	private String nativeName;

	private String acronym;

	private Long disciplineId;

	@ManyToOne
	@JoinColumn (name = "institution_id", nullable = false)
	private Institution institution;

}
