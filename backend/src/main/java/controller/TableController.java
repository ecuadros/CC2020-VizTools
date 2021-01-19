package controller;

import service.*;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import dto.model.*;

@RestController
@RequestMapping("/table")
@CrossOrigin(origins = "*")
public class TableController {

    @Autowired
    private WeightService weightService;

    @Autowired
    private UWeightService uWeightService;

    @Autowired
    private ProgramService programService;

    @Autowired
    private UProgramService uProgramService;

    @GetMapping("/program/{programId}")
    public ResponseEntity<?> readByProgram(@PathVariable Long programId) {
        return new ResponseEntity<>(weightService.createTable(programId), HttpStatus.OK);
    }

    @PostMapping("/program")
    public ResponseEntity<?> readByNPrograms(
            @RequestBody List<Long> programIds) {
        List<List<WeightDto>> weights = new ArrayList<>();

        for (Long programId : programIds) {
            weights.add(weightService.createTable(programId));
        }

        return new ResponseEntity<>(weights, HttpStatus.OK);
    }

    @PostMapping("/program/complete")
    public ResponseEntity<?> readByNProgramsComplete(
            @RequestBody List<Long> programIds) {
        List<ProgramDto> programs = new ArrayList<>();

        ProgramDto program;

        for (Long programId : programIds) {
            program = programService.read(programId);
            program.setWeights(weightService.createTable(programId));
            programs.add(program);
        }

        return new ResponseEntity<>(programs, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping("/program/{dkaId}/{programId}")
    public ResponseEntity<?> updateWeight(
            @PathVariable Long dkaId,
            @PathVariable Long programId,
            @RequestBody WeightDto input) {
        return new ResponseEntity<>(weightService.update(dkaId, programId, input), HttpStatus.OK);
    }

    @GetMapping("/uprogram/{uprogramId}")
    public ResponseEntity<?> readByUProgram(@PathVariable Long uprogramId) {
        return new ResponseEntity<>(uWeightService.createTable(uprogramId), HttpStatus.OK);
    }

    @PostMapping("/uprogram")
    public ResponseEntity<?> readByNUPrograms(
            @RequestBody List<Long> uProgramIds) {
        List<List<UWeightDto>> weights = new ArrayList<>();

        for (Long uProgramId : uProgramIds) {
            weights.add(uWeightService.createTable(uProgramId));
        }

        return new ResponseEntity<>(weights, HttpStatus.OK);
    }

    @PostMapping("/uprogram/complete")
    public ResponseEntity<?> readByNUProgramsComplete(
            @RequestBody List<Long> uProgramIds) {
        List<UProgramDto> programs = new ArrayList<>();

        UProgramDto program;

        for (Long uProgramId : uProgramIds) {
            program = uProgramService.read(uProgramId);
            program.setWeights(uWeightService.createTable(uProgramId));
            programs.add(program);
        }

        return new ResponseEntity<>(programs, HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    @PutMapping("/uprogram/{id}")
    public ResponseEntity<?> updateUWeight(
            @PathVariable Long id,
            @RequestBody UWeightDto input) {
        return new ResponseEntity<>(uWeightService.update(input, id), HttpStatus.OK);
    }

}
