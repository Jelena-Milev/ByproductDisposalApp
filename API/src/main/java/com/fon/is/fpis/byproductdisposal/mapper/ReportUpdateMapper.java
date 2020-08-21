package com.fon.is.fpis.byproductdisposal.mapper;

import com.fon.is.fpis.byproductdisposal.dto.request.ItemRequestDto;
import com.fon.is.fpis.byproductdisposal.dto.request.ReportRequestDto;
import com.fon.is.fpis.byproductdisposal.model.Byproduct;
import com.fon.is.fpis.byproductdisposal.model.Report;
import com.fon.is.fpis.byproductdisposal.model.ReportItem;
import org.mapstruct.AfterMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Mapper(uses = {WarehouseMapper.class, EmployeeMapper.class, ByproductMapper.class}, componentModel = "spring")
public abstract class ReportUpdateMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "items", ignore = true)
    @Mapping(source = "reportRequestDto.warehouseId", target = "warehouse")
    @Mapping(source = "reportRequestDto.employeeId", target = "employee")
    public abstract void updateReport(ReportRequestDto reportRequestDto, @MappingTarget Report report);

    @AfterMapping
    protected void updateReportItems(ReportRequestDto reportRequestDto, @MappingTarget Report report) {
        final List<Long> newItemsByproductIds = reportRequestDto.getItems().stream().map(item -> item.getByproductId()).collect(Collectors.toList());
        final List<ReportItem> itemsToDelete = new ArrayList<>(report.getItems().size());
        for (ReportItem item : report.getItems()) {
            if (!newItemsByproductIds.contains(item.getByproduct().getId()))
                itemsToDelete.add(item);
        }
        report.removeItems(itemsToDelete);
        for (ItemRequestDto itemDto : reportRequestDto.getItems()) {
            final ReportItem newItem = mapToEntity(itemDto);
            int index = report.getItems().indexOf(newItem);
            if (index == -1)
                report.addItem(newItem);
            else
                updateItem(itemDto, report.getItems().get(index));
        }
    }

    @Mapping(target = "report", ignore = true)
    @Mapping(source = "itemDto.byproductId", target = "byproduct")
    protected abstract ReportItem mapToEntity(ItemRequestDto itemDto);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "report", ignore = true)
    @Mapping(source = "reportRequestDto.byproductId", target = "byproduct")
    protected abstract void updateItem(ItemRequestDto reportRequestDto, @MappingTarget ReportItem report);
}
