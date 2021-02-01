package com.fon.is.fpis.byproductdisposal.service.impl;

import com.fon.is.fpis.byproductdisposal.dto.request.ItemRequestDto;
import com.fon.is.fpis.byproductdisposal.dto.request.ReportRequestDto;
import com.fon.is.fpis.byproductdisposal.dto.response.ReportResponseDto;
import com.fon.is.fpis.byproductdisposal.exception.EntityAlreadyExistsException;
import com.fon.is.fpis.byproductdisposal.exception.EntityNotFoundException;
import com.fon.is.fpis.byproductdisposal.exception.NotEnoughByproductException;
import com.fon.is.fpis.byproductdisposal.mapper.ReportMapper;
import com.fon.is.fpis.byproductdisposal.mapper.ReportUpdateMapper;
import com.fon.is.fpis.byproductdisposal.model.Byproduct;
import com.fon.is.fpis.byproductdisposal.model.Report;
import com.fon.is.fpis.byproductdisposal.model.ReportItem;
import com.fon.is.fpis.byproductdisposal.repository.ByproductRepository;
import com.fon.is.fpis.byproductdisposal.repository.ReportRepository;
import com.fon.is.fpis.byproductdisposal.service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReportServiceImpl implements ReportService {

    private final ReportMapper mapper;
    private final ReportUpdateMapper updateMapper;
    private final ReportRepository repository;
    private final ByproductRepository byproductRepository;

    private Report oldReport;

    @Autowired
    public ReportServiceImpl(ReportMapper mapper, ReportUpdateMapper updateMapper, ReportRepository reportRepository, ByproductRepository byproductRepository) {
        this.mapper = mapper;
        this.updateMapper = updateMapper;
        this.repository = reportRepository;
        this.byproductRepository = byproductRepository;
    }

    @Override
    public ReportResponseDto save(ReportRequestDto newReportDto) {
        final Report report = mapper.mapToEntity(newReportDto);
        if (repository.existsByDateAndWarehouseAndUtilizationRate(report.getDate(), report.getWarehouse(), report.getUtilizationRate()))
            throw new EntityAlreadyExistsException("Izvestaj");
        checkItemsQuantity(newReportDto);
        reduceByproductsQuantity(newReportDto.getItems());
        final Report savedReport = repository.save(report);
        return mapper.mapToDto(savedReport);
    }

    private void reduceByproductsQuantity(List<ItemRequestDto> items) {
        for (ItemRequestDto item : items) {
            final Byproduct byproduct = byproductRepository.findById(item.getByproductId()).get();
            byproduct.setQuantity(byproduct.getQuantity().add(item.getQuantityForDisposal().negate()));
            byproductRepository.save(byproduct);
        }
    }

    @Override
    public ReportResponseDto findById(Long id) {
        final Report report = repository.findById(id).orElseThrow(() -> new EntityNotFoundException("Izvestaj", id));
        return mapper.mapToDto(report);
    }

    @Override
    public List<Long> getReportIds() {
        return repository.getIds();
    }

    @Override
    public ReportResponseDto update(Long id, ReportRequestDto reportDto) {
        final Report reportToUpdate = repository.findById(id).orElseThrow(() -> new EntityNotFoundException("Izvestaj", id));
        this.oldReport = reportToUpdate;

        resetByproductsQuantities(reportToUpdate);
        checkItemsQuantityBeforeUpdate(reportDto);
        updateMapper.updateReport(reportDto, reportToUpdate);
        reduceByproductsQuantity(reportDto.getItems());
        final Report updatedReport = repository.save(reportToUpdate);
        return mapper.mapToDto(updatedReport);
    }

    private void checkItemsQuantity(ReportRequestDto modifiedReport) {
        for (ItemRequestDto item : modifiedReport.getItems()) {
            final Byproduct byproduct = byproductRepository.findById(item.getByproductId()).orElseThrow(() -> new EntityNotFoundException("Nusproizvod", item.getByproductId()));
            if (item.getQuantityForDisposal().compareTo(byproduct.getQuantity()) == 1){
                final BigDecimal totalQuantity = byproduct.getQuantity();
                throw new NotEnoughByproductException(byproduct.getName(), totalQuantity);
            }
        }
    }

    private void checkItemsQuantityBeforeUpdate(ReportRequestDto modifiedReport) {
        for (ItemRequestDto item : modifiedReport.getItems()) {
            final Byproduct byproduct = byproductRepository.findById(item.getByproductId()).orElseThrow(() -> new EntityNotFoundException("Nusproizvod", item.getByproductId()));
            if (item.getQuantityForDisposal().compareTo(byproduct.getQuantity()) == 1){
                final BigDecimal totalQuantity = byproduct.getQuantity();
                undoByproductsQuantitiesReset(this.oldReport);
                throw new NotEnoughByproductException(byproduct.getName(), totalQuantity);
            }
        }
    }

    protected void resetByproductsQuantities(Report report) {
        for (ReportItem item : report.getItems()) {
            final Byproduct byproduct = item.getByproduct();
            byproduct.setQuantity(byproduct.getQuantity().add(item.getQuantityForDisposal()));
            byproductRepository.save(byproduct);
        }
    }

    protected void undoByproductsQuantitiesReset(Report report) {
        for (ReportItem item : report.getItems()) {
            final Byproduct byproduct = item.getByproduct();
            byproduct.setQuantity(byproduct.getQuantity().subtract(item.getQuantityForDisposal()));
            byproductRepository.save(byproduct);
        }
    }


}
