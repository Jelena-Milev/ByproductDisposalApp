package com.fon.is.fpis.byproductdisposal.dto;

import lombok.*;

import java.math.BigDecimal;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class ReportItemInfoDto {
    private Long id;
    private String byproductName;
    private BigDecimal quantityForDisposal;
}
