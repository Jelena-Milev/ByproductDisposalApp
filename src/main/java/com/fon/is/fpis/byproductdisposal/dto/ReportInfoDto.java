package com.fon.is.fpis.byproductdisposal.dto;

import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class ReportInfoDto {
    private Long id;
    private String number;
    private LocalDate date;
    private BigDecimal utilizationRate;
    private String note;
    private WarehouseDto warehouseDto;
    private EmployeeDto employeeDto;
    private List<ReportItemInfoDto> items;
}
