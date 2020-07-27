package com.fon.is.fpis.byproductdisposal.controller;

import com.fon.is.fpis.byproductdisposal.dto.ReportDto;
import com.fon.is.fpis.byproductdisposal.dto.ReportInfoDto;
import com.fon.is.fpis.byproductdisposal.service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;
@RestController
@RequestMapping(path = "report")
public class ReportController {

    private final ReportService service;

    @Autowired
    public ReportController(ReportService service) {
        this.service = service;
    }

    @PostMapping(consumes = APPLICATION_JSON_VALUE, produces = APPLICATION_JSON_VALUE)
    public ResponseEntity<ReportInfoDto> save(@RequestBody final ReportDto reportDto){
        final ReportInfoDto result = service.save(reportDto);
        return new ResponseEntity<>(result, HttpStatus.CREATED);
    }

    @GetMapping(produces = APPLICATION_JSON_VALUE)
    public ResponseEntity<ReportInfoDto> find(@RequestParam final String number){
        final ReportInfoDto result = service.find(number);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @GetMapping(path = "numbers", produces = APPLICATION_JSON_VALUE)
    public ResponseEntity<List<String >> getAllNumbers(){
        final List<String> result = service.getReportNumbers();
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
