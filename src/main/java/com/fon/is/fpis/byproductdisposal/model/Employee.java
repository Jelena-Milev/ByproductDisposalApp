package com.fon.is.fpis.byproductdisposal.model;

import lombok.*;

import javax.persistence.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Entity
@Table(name = "employee")
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "first_name")
    @EqualsAndHashCode.Include
    private String firstName;

    @Column(name = "last_name")
    @EqualsAndHashCode.Include
    private String lastName;
}
