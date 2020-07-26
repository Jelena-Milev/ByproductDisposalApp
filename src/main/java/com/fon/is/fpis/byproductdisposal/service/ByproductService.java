package com.fon.is.fpis.byproductdisposal.service;

import com.fon.is.fpis.byproductdisposal.dto.ByproductDto;
import com.fon.is.fpis.byproductdisposal.dto.ByproductInfoDto;

import java.util.List;

public interface ByproductService {

    ByproductInfoDto save(ByproductDto byproductDto);

    ByproductInfoDto update(Long id, ByproductDto byproductInfoDto);

    List<ByproductInfoDto> getAll();

    ByproductInfoDto get(Long id);
}
