package org.acm.viztools.model.user;

import org.acm.viztools.model.institution.Institution;
import org.acm.viztools.model.util.Country;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "user_info")
public class UserInfo {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne
	@JoinColumn(name = "institution_id", nullable = false, updatable = false)
	private Institution institution;

	@ManyToOne
	@JoinColumn(name = "country_id", nullable = false, updatable = false)
	private Country country;

	@NotNull
	private String city;

	@NotNull
	private String occupation;

	@OneToOne(mappedBy = "userInfo")
	private User user;

}
