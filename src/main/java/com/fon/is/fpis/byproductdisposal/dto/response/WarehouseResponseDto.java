package com.fon.is.fpis.byproductdisposal.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
public class WarehouseResponseDto {

    private Long id;
    private String name;
    private BigDecimal capacity;

}
