package com.fon.is.fpis.byproductdisposal.model;

import lombok.*;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Entity
@Table(name = "capacity_utilization_report")
public class Report {

    @Id
    @SequenceGenerator(name = "report_ids", sequenceName = "report_ids", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "report_ids")
    private Long id;

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

    public void addItem(ReportItem item){
        if(this.items == null){
            this.items = new ArrayList<>();
        }
        this.items.add(item);
        item.setReport(this);
    }

    public void removeItems(List<ReportItem> itemsToDelete) {
        this.items.removeAll(itemsToDelete);
    }
}
