package com.fon.is.fpis.byproductdisposal.mapper.impl;

import com.fon.is.fpis.byproductdisposal.dto.*;
import com.fon.is.fpis.byproductdisposal.mapper.ByproductMapper;
import com.fon.is.fpis.byproductdisposal.mapper.EmployeeMapper;
import com.fon.is.fpis.byproductdisposal.mapper.ReportMapper;
import com.fon.is.fpis.byproductdisposal.mapper.WarehouseMapper;
import com.fon.is.fpis.byproductdisposal.model.*;
import com.fon.is.fpis.byproductdisposal.repository.ByproductRepository;
import com.fon.is.fpis.byproductdisposal.repository.EmployeeRepository;
import com.fon.is.fpis.byproductdisposal.repository.WarehouseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class ReportMapperImpl implements ReportMapper {

    private final ByproductRepository byproductRepository;
    private final WarehouseRepository warehouseRepository;
    private final EmployeeRepository employeeRepository;
    private final WarehouseMapper warehouseMapper;
    private final EmployeeMapper employeeMapper;
    private final ByproductMapper byproductMapper;

    @Autowired
    public ReportMapperImpl(ByproductRepository byproductRepository, WarehouseRepository warehouseRepository, EmployeeRepository employeeRepository, WarehouseMapper warehouseMapper, EmployeeMapper employeeMapper, ByproductMapper byproductMapper) {
        this.byproductRepository = byproductRepository;
        this.warehouseRepository = warehouseRepository;
        this.employeeRepository = employeeRepository;
        this.warehouseMapper = warehouseMapper;
        this.employeeMapper = employeeMapper;
        this.byproductMapper = byproductMapper;
    }

    @Override
    public Report mapToEntity(ReportDto dto) {
        final Warehouse warehouse = warehouseRepository.findById(dto.getWarehouseId()).get();
        final Employee employee = employeeRepository.findById(dto.getEmployeeId()).get();

        final Report.ReportBuilder reportBuilder = Report.builder();
        reportBuilder
                .date(dto.getDate())
                .utilizationRate(dto.getUtilizationRate())
                .note(dto.getNote())
                .warehouse(warehouse)
                .employee(employee);
        final Report report = reportBuilder.build();
        setItems(report, dto.getItems());
        return report;
    }

    @Override
    public ReportInfoDto mapToDto(Report report) {
        final WarehouseDto warehouseDto = warehouseMapper.mapToDto(report.getWarehouse());
        final EmployeeDto employeeDto = employeeMapper.mapToDto(report.getEmployee());
        ReportInfoDto.ReportInfoDtoBuilder builder = ReportInfoDto.builder();
        builder
                .id(report.getId())
                .date(report.getDate())
                .number(report.getNumber())
                .utilizationRate(report.getUtilizationRate())
                .note(report.getNote())
                .warehouseDto(warehouseDto)
                .employeeDto(employeeDto)
                .items(getReportItemsDtos(report));
        final ReportInfoDto dto = builder.build();
        return dto;
    }

    private List<ReportItemInfoDto> getReportItemsDtos(Report report){
        List<ReportItemInfoDto> items = new ArrayList<>(report.getItems().size());
        report.getItems().forEach(item -> {
            final ReportItemInfoDto itemDto = mapToReportItemDto(item);
            items.add(itemDto);
        });
        return items;
    }

    private ReportItemInfoDto mapToReportItemDto(ReportItem item){
        final ReportItemInfoDto.ReportItemInfoDtoBuilder builder = ReportItemInfoDto.builder();
        builder.id(item.getId())
                .byproductName(item.getByproduct().getName())
                .quantityForDisposal(item.getQuantityForDisposal());
        final ReportItemInfoDto dto = builder.build();
        return dto;
    }

    private ReportItem mapToReportItem(ReportItemDto itemDto) {
        final Byproduct byproduct = byproductRepository.findById(itemDto.getByproductId()).get();
        final ReportItem.ReportItemBuilder builder = ReportItem.builder();
        builder.byproduct(byproduct)
                .quantityForDisposal(itemDto.getQuantityForDisposal());
        final ReportItem item = builder.build();
        return item;
    }

    private void setItems(Report report, List<ReportItemDto> itemDtos) {
        itemDtos.forEach(itemDto -> {
            final ReportItem item = mapToReportItem(itemDto);
            report.addItem(item);
        });
    }

}
