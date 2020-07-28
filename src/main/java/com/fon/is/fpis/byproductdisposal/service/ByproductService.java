package com.fon.is.fpis.byproductdisposal.service;

import com.fon.is.fpis.byproductdisposal.dto.ByproductRequestDto;
import com.fon.is.fpis.byproductdisposal.dto.ByproductResponseDto;

import java.util.List;

public interface ByproductService {

    ByproductResponseDto save(ByproductRequestDto byproductRequestDto);

    ByproductResponseDto update(Long id, ByproductRequestDto byproductInfoDto);

    List<ByproductResponseDto> getAll();

    ByproductResponseDto get(Long id);
}
