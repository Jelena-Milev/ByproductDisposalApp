package com.fon.is.fpis.byproductdisposal.mapper;

import com.fon.is.fpis.byproductdisposal.dto.response.WarehouseResponseDto;
import com.fon.is.fpis.byproductdisposal.exception.EntityNotFoundException;
import com.fon.is.fpis.byproductdisposal.model.Warehouse;
import com.fon.is.fpis.byproductdisposal.repository.WarehouseRepository;
import org.mapstruct.Mapper;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@Mapper(componentModel = "spring")
public abstract class WarehouseMapper {

    @Autowired
    protected WarehouseRepository repository;

    public abstract WarehouseResponseDto mapToDto(Warehouse warehouse);

    public Warehouse mapToEntity(Long warehouseId){
        if(warehouseId == null){
            return null;
        }
        return repository.findById(warehouseId).orElseThrow(()-> new EntityNotFoundException("Nusproizvod", warehouseId));
    }

    public abstract List<WarehouseResponseDto> mapToDtos(List<Warehouse> warehouses);
}
