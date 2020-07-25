package com.fon.is.fpis.byproductdisposal.model;

import lombok.*;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Entity
@Table(name = "capacity_utilization_report")
public class Report {

    @Id
    @SequenceGenerator(name = "report_seq_ids", sequenceName = "report_seq_id", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "report_seq_id")
    private Long id;

    @Column(name = "report_number")
    @EqualsAndHashCode.Include
    private String number;

    private LocalDate date;

    @Column(name = "utilization_rate")
    private BigDecimal utilizationRate;

    private String note;

    @ManyToOne
    @JoinColumn(name = "warehouse_id")
    private Warehouse warehouse;

    @ManyToOne
    @JoinColumn(name = "employee_id")
    private Employee employee;

    @OneToMany(mappedBy = "report", orphanRemoval = true, cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private List<ReportItem> items;
}
