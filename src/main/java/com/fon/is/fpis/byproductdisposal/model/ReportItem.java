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
@Table(name = "capacity_utilization_report_item")
public class ReportItem {

    @Id
    @SequenceGenerator(name = "report_item_ids", sequenceName = "report_item_id", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "report_item_id")
    private Long id;

    @Column(name = "item_number")
    @EqualsAndHashCode.Include
    private Long number;

    private BigDecimal quantity;

    @ManyToOne
    @JoinColumn(name = "byproduct_id")
    private Byproduct byproduct;

    @ManyToOne
    @JoinColumn(name = "report_id")
    @EqualsAndHashCode.Include
    private Report report;
}
