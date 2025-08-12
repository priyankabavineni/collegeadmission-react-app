package cfg.clg.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import cfg.clg.dto.AdminStudentDTO;
import cfg.clg.dto.ApplicationActionDto;
import cfg.clg.dto.ApplicationResponseDto;
import cfg.clg.entity.ApplicationEntity;
import cfg.clg.service.AdminService;


@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired 
    private AdminService adminService;

    @GetMapping("/applications/{status}")
    public ResponseData getByStatus(@PathVariable("status") String status) {
        ResponseData resp = new ResponseData();
        try {
            List<ApplicationResponseDto> list = adminService.getApplicationsByStatus(status);
            resp.setStatus("success");
            resp.setData(list);
        } catch (Exception e) {
            resp.setStatus("failed");
            resp.setMessage(e.getMessage());
        }
        return resp;
    }


    @GetMapping("/applications")  // New endpoint to get ALL applications
    public ResponseData getAllApplications() {
        ResponseData resp = new ResponseData();
        try {
            List<ApplicationResponseDto> list = adminService.getAllApplications();
            resp.setStatus("success");
            resp.setData(list);
        } catch (Exception e) {
            e.printStackTrace();   // <-- logs full exception stack trace
            resp.setStatus("failed");
            resp.setMessage(e.getMessage() != null ? e.getMessage() : "Unknown error occurred");
        }

        return resp;
    }

    @PostMapping("/action")
    public ResponseData actOnApplication(@RequestBody ApplicationActionDto dto) {
        ResponseData resp = new ResponseData();
        try {
            ApplicationResponseDto updated = adminService.actOnApplication(dto);
            resp.setStatus("success");
            resp.setData(updated);
        } catch (Exception e) {
            e.printStackTrace();  // <-- Log the full stacktrace here
            resp.setStatus("failed");
            String msg = e.getMessage() != null ? e.getMessage() : "Unknown error occurred";
            resp.setMessage(msg);
        }
        return resp;
    }


  
    @GetMapping("/applications/program/{program}/department/{department}")
    public ResponseData getApplicationsByProgramAndDepartment(
            @PathVariable String program,
            @PathVariable String department) {

        ResponseData resp = new ResponseData();
        try {
            List<ApplicationResponseDto> list = adminService.getApplicationsByProgramAndDepartment(program, department);
            if (list.isEmpty()) {
                resp.setStatus("failed");
                resp.setMessage("No applications found for " + program + " - " + department);
            } else {
                resp.setStatus("success");
                resp.setData(list);
            }
        } catch (Exception e) {
            e.printStackTrace();
            resp.setStatus("failed");
            resp.setMessage(e.getMessage() != null ? e.getMessage() : "Unknown error occurred");
        }
        return resp;
    }
    @GetMapping("/student/email/{email}")
    public ResponseData getStudentByEmail(@PathVariable String email) {
        ResponseData resp = new ResponseData();
        try {
            AdminStudentDTO dto = adminService.getStudentByEmail(email);
            resp.setStatus("success");
            resp.setData(dto);
        } catch (Exception e) {
            resp.setStatus("failed");
            resp.setMessage(e.getMessage());
        }
        return resp;
    }


    
}