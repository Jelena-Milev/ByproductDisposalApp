package com.fon.is.fpis.byproductdisposal.mapper;

import com.fon.is.fpis.byproductdisposal.dto.WarehouseDto;
import com.fon.is.fpis.byproductdisposal.model.Warehouse;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface WarehouseMapper {

    WarehouseDto mapToDto(Warehouse measurementUnit);
}
