package com.fon.is.fpis.byproductdisposal.mapper;

import com.fon.is.fpis.byproductdisposal.dto.ByproductInfoDto;
import com.fon.is.fpis.byproductdisposal.dto.ByproductDto;
import com.fon.is.fpis.byproductdisposal.model.Byproduct;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ByproductMapper {

    Byproduct map(ByproductDto byproductDto);

    ByproductInfoDto mapToDto(Byproduct byproduct);
}
