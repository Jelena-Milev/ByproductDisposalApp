package com.fon.is.fpis.byproductdisposal.service;

import com.fon.is.fpis.byproductdisposal.dto.ReportDto;
import com.fon.is.fpis.byproductdisposal.dto.ReportInfoDto;

public interface ReportService {

    ReportInfoDto save(ReportDto dto);
}
