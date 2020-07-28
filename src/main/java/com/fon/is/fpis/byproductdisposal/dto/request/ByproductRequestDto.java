package com.fon.is.fpis.byproductdisposal.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
public class ByproductRequestDto {

    private Long id;
    private String name;
    private BigDecimal quantity;
    private BigDecimal weightPerUM;
    private Long warehouseId;
    private Long measurementUnitId;

}
