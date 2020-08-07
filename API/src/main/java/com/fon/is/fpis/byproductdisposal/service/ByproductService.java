package com.fon.is.fpis.byproductdisposal.service;

import com.fon.is.fpis.byproductdisposal.dto.request.ByproductRequestDto;
import com.fon.is.fpis.byproductdisposal.dto.response.ByproductResponseDto;

import java.util.List;

public interface ByproductService {

    ByproductResponseDto save(ByproductRequestDto byproductRequestDto);

    ByproductResponseDto update(Long id, ByproductRequestDto byproductInfoDto);

    List<ByproductResponseDto> getAll();

    ByproductResponseDto get(Long id);

    void delete(Long id);
}
