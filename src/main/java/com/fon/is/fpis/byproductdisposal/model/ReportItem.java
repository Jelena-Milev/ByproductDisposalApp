package com.fon.is.fpis.byproductdisposal.model;

import lombok.*;

import javax.persistence.*;
import java.math.BigDecimal;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Entity
@Table(name = "capacity_utilization_report_item")
public class ReportItem {

    @Id
    @SequenceGenerator(name = "report_item_ids", sequenceName = "report_item_ids", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "report_item_ids")
    private Long id;

    private BigDecimal quantityForDisposal;

    @ManyToOne
    @JoinColumn(name = "byproduct_id")
    @EqualsAndHashCode.Include
    private Byproduct byproduct;

    @ManyToOne
    @JoinColumn(name = "report_id")
    private Report report;
}
