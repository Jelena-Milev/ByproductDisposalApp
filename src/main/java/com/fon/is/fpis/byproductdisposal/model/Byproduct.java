package com.fon.is.fpis.byproductdisposal.model;


import lombok.*;

import javax.persistence.*;
import java.math.BigDecimal;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Entity
@Table(name = "byproduct")
public class Byproduct {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @EqualsAndHashCode.Include
    private String name;

    private BigDecimal quantity;
    private BigDecimal weight_per_um;

    @ManyToOne
    @JoinColumn(name = "warehouse_id")
    private Warehouse warehouse;

    @ManyToOne
    @JoinColumn(name = "measurement_unit_id")
    private MeasurementUnit measurementUnit;
}
