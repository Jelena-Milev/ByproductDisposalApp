package com.fon.is.fpis.byproductdisposal.service.impl;

import com.fon.is.fpis.byproductdisposal.dto.ReportDto;
import com.fon.is.fpis.byproductdisposal.dto.ReportInfoDto;
import com.fon.is.fpis.byproductdisposal.mapper.ReportMapper;
import com.fon.is.fpis.byproductdisposal.model.Report;
import com.fon.is.fpis.byproductdisposal.repository.ReportRepository;
import com.fon.is.fpis.byproductdisposal.service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.List;

@Service
public class ReportServiceImpl implements ReportService {

    private final ReportMapper mapper;
    private final ReportRepository repository;

    @Autowired
    public ReportServiceImpl(ReportMapper mapper, ReportRepository reportRepository) {
        this.mapper = mapper;
        this.repository = reportRepository;
    }

    @Override
    public ReportInfoDto save(ReportDto dto) {
        final Report report = mapper.mapToEntity(dto);
        report.setNumber(generateReportNumber(report));
        final Report savedReport = repository.save(report);
        return mapper.mapToDto(savedReport);
    }

    @Override
    public ReportInfoDto find(String number) {
        final Report report = repository.findByNumber(number);
        return mapper.mapToDto(report);
    }

    @Override
    public List<String> getReportNumbers() {
        return repository.getNumber();
    }


    private String generateReportNumber(Report report){
        SimpleDateFormat format = new SimpleDateFormat("dd.MM.yyyy");
        String date = format.format(report.getDate());
        return "IzvestajOPopunjenostiKapaciteta - "+date;
    }
}
