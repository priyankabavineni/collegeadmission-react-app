package cfg.clg.repo;

import cfg.clg.entity.ChatHistoryEntity;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChatHistoryRepository extends JpaRepository<ChatHistoryEntity, Integer> {

	List<ChatHistoryEntity> findByUserId(String userId);
	List<ChatHistoryEntity> findBySender(String sender);

}