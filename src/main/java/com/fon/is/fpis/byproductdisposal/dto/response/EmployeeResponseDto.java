package com.fon.is.fpis.byproductdisposal.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
public class EmployeeResponseDto {
    private Long id;
    private String firstName;
    private String lastName;
}
