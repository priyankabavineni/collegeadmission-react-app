package cfg.clg.dto;

import lombok.Data;

@Data
public class ApplicationResponseDto {
    private int applicationId;
    private String email;
    private String program;
    private String department;
    private Integer adminId;
    private Boolean paymentDone;
    private Double entranceExamScore;
    private String status;
    private String rejectionReason;
    
}
