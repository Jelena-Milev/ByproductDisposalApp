package com.fon.is.fpis.byproductdisposal.service;

import com.fon.is.fpis.byproductdisposal.dto.response.EmployeeResponseDto;

import java.util.List;

public interface EmployeeService {

    List<EmployeeResponseDto> getAll();
}
