package com.fon.is.fpis.byproductdisposal.dto.request;

import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class ReportRequestDto {
    private LocalDate date;
    private BigDecimal utilizationRate;
    private String note;
    private Long warehouseId;
    private Long employeeId;
    private List<ItemRequestDto> items;
}
