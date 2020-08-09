package com.fon.is.fpis.byproductdisposal.dto.response;

import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class ReportResponseDto {
    private Long id;
    private LocalDate date;
    private BigDecimal utilizationRate;
    private String note;
    private WarehouseResponseDto warehouse;
    private EmployeeResponseDto employee;
    private List<ItemResponseDto> items;
}
