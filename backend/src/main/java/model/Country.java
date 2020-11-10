package model;

import java.util.Set;

import javax.persistence.*;

import lombok.*;
import lombok.experimental.Accessors;

@Getter
@Setter
@NoArgsConstructor
@Accessors(chain = true)
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

    @OneToMany(mappedBy = "country", cascade = CascadeType.ALL)
    private Set<University> universities;

    @OneToOne(mappedBy = "country")
    private UserInfo userInfo;

}
