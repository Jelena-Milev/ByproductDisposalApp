package com.fon.is.fpis.byproductdisposal.mapper;

import com.fon.is.fpis.byproductdisposal.dto.response.ByproductResponseDto;
import com.fon.is.fpis.byproductdisposal.dto.request.ByproductRequestDto;
import com.fon.is.fpis.byproductdisposal.exception.EntityNotFoundException;
import com.fon.is.fpis.byproductdisposal.model.Byproduct;
import com.fon.is.fpis.byproductdisposal.repository.ByproductRepository;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@Mapper(uses = {WarehouseMapper.class, MeasurementUnitMapper.class}, componentModel = "spring")
public abstract class ByproductMapper {

    @Autowired
    protected ByproductRepository repository;

    @Mapping(source = "byproductRequestDto.warehouseId", target = "warehouse")
    @Mapping(source = "byproductRequestDto.measurementUnitId", target = "measurementUnit")
    public abstract Byproduct map(ByproductRequestDto byproductRequestDto);

    public abstract ByproductResponseDto mapToDto(Byproduct byproduct);


    @Mapping(target = "id", ignore = true)
    @Mapping(source = "byproductRequestDto.warehouseId", target = "warehouse")
    @Mapping(source = "byproductRequestDto.measurementUnitId", target = "measurementUnit")
    public abstract void updateByproduct(ByproductRequestDto byproductRequestDto, @MappingTarget Byproduct byproduct);

    public abstract List<ByproductResponseDto> mapToDtos(List<Byproduct> byproducts);

    public Byproduct mapToEntity(Long byproductId){
        if(byproductId == null){
            return null;
        }
        return repository.findById(byproductId).orElseThrow(()-> new EntityNotFoundException("Nusproizvod", byproductId));
    }
}
