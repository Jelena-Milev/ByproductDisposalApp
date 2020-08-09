package com.fon.is.fpis.byproductdisposal.mapper;

import com.fon.is.fpis.byproductdisposal.dto.request.ItemRequestDto;
import com.fon.is.fpis.byproductdisposal.dto.request.ReportRequestDto;
import com.fon.is.fpis.byproductdisposal.dto.response.ItemResponseDto;
import com.fon.is.fpis.byproductdisposal.dto.response.ReportResponseDto;
import com.fon.is.fpis.byproductdisposal.model.Report;
import com.fon.is.fpis.byproductdisposal.model.ReportItem;
import org.mapstruct.CollectionMappingStrategy;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(uses = {EmployeeMapper.class, WarehouseMapper.class, ByproductMapper.class}, componentModel = "spring",
collectionMappingStrategy = CollectionMappingStrategy.ADDER_PREFERRED)
public interface ReportMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(source = "dto.employeeId", target = "employee")
    @Mapping(source = "dto.warehouseId", target = "warehouse")
    Report mapToEntity(ReportRequestDto dto);

    ReportResponseDto mapToDto(Report report);

    @Mapping(source = "dto.byproductId", target = "byproduct")
    ReportItem mapItemDtoToEntity(ItemRequestDto dto);

    @Mapping(source = "item.byproduct.name", target = "byproductName")
    ItemResponseDto mapItemEntityToDto(ReportItem item);
}
