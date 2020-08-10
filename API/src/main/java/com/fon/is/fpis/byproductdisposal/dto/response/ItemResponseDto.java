package com.fon.is.fpis.byproductdisposal.dto.response;

import lombok.*;

import java.math.BigDecimal;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class ItemResponseDto {
    private Long id;
    private ByproductResponseDto byproduct;
    private BigDecimal quantityForDisposal;
}
