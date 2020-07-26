package com.fon.is.fpis.byproductdisposal.dto;

import lombok.*;

import java.math.BigDecimal;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class ReportItemDto {
    private Long byproductId;
    private BigDecimal quantityForDisposal;
}
