package com.fon.is.fpis.byproductdisposal.model.auth;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
@Setter
@Entity
@Table(name="user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String identifier;
    private String username;
    private String password;
//    private String email;
    private String firstName;
    private String lastName;
    private String role;


}
