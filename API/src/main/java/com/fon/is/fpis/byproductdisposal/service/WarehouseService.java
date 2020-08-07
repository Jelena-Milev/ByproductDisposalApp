package com.fon.is.fpis.byproductdisposal.service;

import com.fon.is.fpis.byproductdisposal.dto.response.WarehouseResponseDto;

import java.util.List;

public interface WarehouseService {
    List<WarehouseResponseDto> getAll();

    WarehouseResponseDto get(Long id);
}
