package com.fon.is.fpis.byproductdisposal.controller;

import com.fon.is.fpis.byproductdisposal.dto.response.ByproductResponseDto;
import com.fon.is.fpis.byproductdisposal.dto.request.ByproductRequestDto;
import com.fon.is.fpis.byproductdisposal.service.ByproductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

import static org.springframework.http.MediaType.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(path = "byproduct")
public class ByproductController {

    private final ByproductService service;

    @Autowired
    public ByproductController(ByproductService service) {
        this.service = service;
    }

    @GetMapping(produces = APPLICATION_JSON_VALUE)
    public ResponseEntity<List<ByproductResponseDto>> getAll() {
        List<ByproductResponseDto> result = service.getAll();
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @GetMapping(path = "{id}", produces = APPLICATION_JSON_VALUE)
    public ResponseEntity<ByproductResponseDto> get(@PathVariable final Long id) {
        ByproductResponseDto result = service.get(id);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @CrossOrigin()
    @PostMapping(produces = APPLICATION_JSON_VALUE, consumes = APPLICATION_JSON_VALUE)
    public ResponseEntity<ByproductResponseDto> save(@RequestBody @Valid ByproductRequestDto byproductRequestDto) {
        ByproductResponseDto result = service.save(byproductRequestDto);
        return new ResponseEntity<>(result, HttpStatus.CREATED);
    }

    @CrossOrigin()
    @PatchMapping(path = "{id}", produces = APPLICATION_JSON_VALUE, consumes = APPLICATION_JSON_VALUE)
    public ResponseEntity<ByproductResponseDto> update(@PathVariable final Long id, @RequestBody @Valid final ByproductRequestDto byproductRequestDto) {
        ByproductResponseDto result = service.update(id, byproductRequestDto);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @CrossOrigin()
    @DeleteMapping(path = "{id}", produces = APPLICATION_JSON_VALUE)
    public ResponseEntity delete(@PathVariable final Long id){
        service.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
