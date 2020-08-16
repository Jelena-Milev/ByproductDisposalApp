package com.fon.is.fpis.byproductdisposal.service.impl;

import com.fon.is.fpis.byproductdisposal.dto.request.ReportRequestDto;
import com.fon.is.fpis.byproductdisposal.dto.response.ReportResponseDto;
import com.fon.is.fpis.byproductdisposal.exception.EntityAlreadyExistsException;
import com.fon.is.fpis.byproductdisposal.exception.EntityNotFoundException;
import com.fon.is.fpis.byproductdisposal.exception.NotEnoughByproductException;
import com.fon.is.fpis.byproductdisposal.mapper.ReportMapper;
import com.fon.is.fpis.byproductdisposal.mapper.ReportUpdateMapper;
import com.fon.is.fpis.byproductdisposal.model.Report;
import com.fon.is.fpis.byproductdisposal.model.ReportItem;
import com.fon.is.fpis.byproductdisposal.repository.ReportRepository;
import com.fon.is.fpis.byproductdisposal.service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReportServiceImpl implements ReportService {

    private final ReportMapper mapper;
    private final ReportUpdateMapper updateMapper;
    private final ReportRepository repository;

    @Autowired
    public ReportServiceImpl(ReportMapper mapper, ReportUpdateMapper updateMapper, ReportRepository reportRepository) {
        this.mapper = mapper;
        this.updateMapper = updateMapper;
        this.repository = reportRepository;
    }

    @Override
    public ReportResponseDto save(ReportRequestDto dto) {
        final Report report = mapper.mapToEntity(dto);
        if(repository.existsByDateAndWarehouseAndUtilizationRate(report.getDate(), report.getWarehouse(), report.getUtilizationRate()))
            throw new EntityAlreadyExistsException("Izvestaj");
        for (ReportItem item : report.getItems()) {
            if(item.getQuantityForDisposal().compareTo(item.getByproduct().getQuantity()) == 1)
                throw new NotEnoughByproductException(item.getByproduct().getName(), item.getByproduct().getQuantity());
        }
        final Report savedReport = repository.save(report);
        return mapper.mapToDto(savedReport);
    }

    @Override
    public ReportResponseDto findById(Long id) {
        final Report report = repository.findById(id).orElseThrow(()->new EntityNotFoundException("Izvestaj", id));;
        return mapper.mapToDto(report);
    }

    @Override
    public List<Long> getReportIds() {
        return repository.getIds();
    }

    @Override
    public ReportResponseDto update(Long id, ReportRequestDto dto) {
        final Report reportToUpdate = repository.findById(id).orElseThrow(()->new EntityNotFoundException("Izvestaj", id));;
        updateMapper.updateReport(dto, reportToUpdate);
        for (ReportItem item : reportToUpdate.getItems()) {
            if(item.getQuantityForDisposal().compareTo(item.getByproduct().getQuantity()) == 1)
                throw new NotEnoughByproductException(item.getByproduct().getName(), item.getByproduct().getQuantity());
        }
        final Report updatedReport = repository.save(reportToUpdate);
        return mapper.mapToDto(updatedReport);
    }
}
