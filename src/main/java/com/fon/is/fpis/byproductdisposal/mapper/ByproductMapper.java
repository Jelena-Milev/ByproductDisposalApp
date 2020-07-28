package com.fon.is.fpis.byproductdisposal.mapper;

import com.fon.is.fpis.byproductdisposal.dto.ByproductResponseDto;
import com.fon.is.fpis.byproductdisposal.dto.ByproductRequestDto;
import com.fon.is.fpis.byproductdisposal.model.Byproduct;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import java.util.List;

@Mapper(uses = {WarehouseMapper.class, MeasurementUnitMapper.class}, componentModel = "spring")
public interface ByproductMapper {

    @Mapping(source = "byproductRequestDto.warehouseId", target = "warehouse")
    @Mapping(source = "byproductRequestDto.measurementUnitId", target = "measurementUnit")
    Byproduct map(ByproductRequestDto byproductRequestDto);

    ByproductResponseDto mapToDto(Byproduct byproduct);


    @Mapping(target = "id", ignore = true)
    @Mapping(source = "byproductRequestDto.warehouseId", target = "warehouse")
    @Mapping(source = "byproductRequestDto.measurementUnitId", target = "measurementUnit")
    void updateByproduct(ByproductRequestDto byproductRequestDto, @MappingTarget Byproduct byproduct);

    List<ByproductResponseDto> mapToDtos(List<Byproduct> byproducts);
}
