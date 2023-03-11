package org.acm.viztools.model.util;

import java.util.Date;

import org.acm.viztools.model.user.User;
import org.hibernate.annotations.NaturalId;

import jakarta.persistence.*;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "verification_token", uniqueConstraints = {
		@UniqueConstraint(columnNames = { "user_id" })
})
public class VerificationToken {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NaturalId
	private String token;

	@OneToOne(targetEntity = User.class, fetch = FetchType.EAGER)
	@JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false)
	private User user;

	private Date expiryDate;

}
