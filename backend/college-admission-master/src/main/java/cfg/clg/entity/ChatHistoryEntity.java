
package cfg.clg.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;

import jakarta.persistence.Entity;

import jakarta.persistence.GeneratedValue;

import jakarta.persistence.GenerationType;

import jakarta.persistence.Id;

import jakarta.persistence.Table;

import lombok.AllArgsConstructor;

import lombok.Data;

import lombok.NoArgsConstructor;

@Data

@NoArgsConstructor

@AllArgsConstructor

@Entity

@Table(schema = "collegeadmissionproject", name = "chat_history")

public class ChatHistoryEntity {

	@Id

	@GeneratedValue(strategy = GenerationType.IDENTITY)

	private int id;

	private String userId;

	private String sender;

	@Column(length = 32672)

	private String message;

	private LocalDateTime timestamp;

}
