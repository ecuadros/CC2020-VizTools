package model;

import javax.persistence.*;

import lombok.*;
import lombok.experimental.Accessors;

@Getter
@Setter
@NoArgsConstructor
@Accessors(chain = true)
@Entity
@Table(name = "session_info")
public class SessionInfo {

    @Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long selectedProgram;

    @OneToOne(mappedBy = "sessionInfo")
	private User user;

}
