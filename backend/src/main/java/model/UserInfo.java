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
@Table(name = "user_info")
public class UserInfo {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
	@JoinColumn(name = "country_id", referencedColumnName = "id")
    private Country country;
    
    private String city;

    private String state;

    private String zipCode;

    private String phone;

    private Boolean whatsApp;

    private Boolean telegram;

    private String occupation;

    @OneToOne(mappedBy = "userInfo")
	private User user;

}
