package com.fon.is.fpis.byproductdisposal.mapper;

import com.fon.is.fpis.byproductdisposal.dto.WarehouseDto;
import com.fon.is.fpis.byproductdisposal.model.Warehouse;
import com.fon.is.fpis.byproductdisposal.repository.WarehouseRepository;
import org.mapstruct.Mapper;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@Mapper(componentModel = "spring")
public abstract class WarehouseMapper {

    @Autowired
    protected WarehouseRepository repository;

    public abstract WarehouseDto mapToDto(Warehouse measurementUnit);

    public Warehouse mapToEntity(Long warehouseId){
        if(warehouseId == null){
            return null;
        }
        return repository.findById(warehouseId).get();
    }

    public abstract List<WarehouseDto> mapToDtos(List<Warehouse> warehouses);
}
