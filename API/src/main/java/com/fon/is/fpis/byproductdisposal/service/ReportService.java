package com.fon.is.fpis.byproductdisposal.service;

import com.fon.is.fpis.byproductdisposal.dto.request.ReportRequestDto;
import com.fon.is.fpis.byproductdisposal.dto.response.ReportResponseDto;

import java.util.List;

public interface ReportService {

    ReportResponseDto save(ReportRequestDto dto);

    ReportResponseDto findById(Long id);

    List<Long> getReportIds();

    ReportResponseDto update(Long id, ReportRequestDto dto);
}
