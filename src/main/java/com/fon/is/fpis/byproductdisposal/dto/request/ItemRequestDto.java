package com.fon.is.fpis.byproductdisposal.dto.request;

import lombok.*;

import java.math.BigDecimal;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class ItemRequestDto {
    private Long byproductId;
    private BigDecimal quantityForDisposal;
}
