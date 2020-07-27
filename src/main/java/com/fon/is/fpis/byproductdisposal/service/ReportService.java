package com.fon.is.fpis.byproductdisposal.service;

import com.fon.is.fpis.byproductdisposal.dto.ReportDto;
import com.fon.is.fpis.byproductdisposal.dto.ReportInfoDto;

import java.util.List;

public interface ReportService {

    ReportInfoDto save(ReportDto dto);

    ReportInfoDto find(String number);

    List<String> getReportNumbers();
}
