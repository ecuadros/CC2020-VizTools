package model;

import java.util.Set;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.hibernate.annotations.NaturalId;

import lombok.*;
import lombok.experimental.Accessors;

@Getter
@Setter
@NoArgsConstructor
@Accessors(chain = true)
@Entity
@Table(name = "users", uniqueConstraints = {
	@UniqueConstraint(columnNames = { "email" })
})
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Email
	@NotNull
	@NaturalId
	@Size(min = 3, max = 50)
	private String email;

	@NotNull
	private String password;

	@NotNull
	private String name;
	
	@NotNull
	private String lastName;

	@NotNull
	private Boolean enabled;

	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(name = "user_roles", 
		joinColumns = @JoinColumn(name = "user_id"), 
		inverseJoinColumns = @JoinColumn(name = "role_id"))
	private Set<Role> roles;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "university_id", nullable = true)
	private University university;

	@OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	@JoinColumn(name = "user_info_id", referencedColumnName = "id")
	private UserInfo userInfo;

}
