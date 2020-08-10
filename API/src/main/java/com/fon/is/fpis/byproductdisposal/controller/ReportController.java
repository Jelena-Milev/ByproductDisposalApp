package com.fon.is.fpis.byproductdisposal.controller;

import com.fon.is.fpis.byproductdisposal.dto.request.ReportRequestDto;
import com.fon.is.fpis.byproductdisposal.dto.response.ReportResponseDto;
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

    @GetMapping(path = "numbers", produces = APPLICATION_JSON_VALUE)
    public ResponseEntity<List<String >> getAllNumbers(){
        final List<String> result = service.getReportIds();
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @GetMapping(path = "{id}", produces = APPLICATION_JSON_VALUE)
    public ResponseEntity<ReportResponseDto> find(@PathVariable final Long id){
        final ReportResponseDto result = service.findById(id);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @CrossOrigin
    @PostMapping(consumes = APPLICATION_JSON_VALUE, produces = APPLICATION_JSON_VALUE)
    public ResponseEntity<ReportResponseDto> save(@RequestBody final ReportRequestDto reportRequestDto){
        final ReportResponseDto result = service.save(reportRequestDto);
        return new ResponseEntity<>(result, HttpStatus.CREATED);
    }

    @CrossOrigin
    @PatchMapping(path = "{id}", consumes = APPLICATION_JSON_VALUE, produces = APPLICATION_JSON_VALUE)
    public ResponseEntity<ReportResponseDto> update(@RequestBody final ReportRequestDto reportRequestDto, @PathVariable final Long id){
        final ReportResponseDto result = service.update(id, reportRequestDto);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
