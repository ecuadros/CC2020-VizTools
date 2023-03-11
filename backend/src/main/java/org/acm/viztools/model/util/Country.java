package org.acm.viztools.model.util;

import jakarta.persistence.*;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "country")
public class Country {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String nameEs;

	private String nameEn;

	private String nativeName;

	private String iso2;

	private String iso3;

}
