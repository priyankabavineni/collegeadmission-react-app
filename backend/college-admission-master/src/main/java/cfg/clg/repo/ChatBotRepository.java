package cfg.clg.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import cfg.clg.entity.ChatBotEntity;

public interface ChatBotRepository extends JpaRepository<ChatBotEntity, Integer> {

	List<ChatBotEntity> findAll();

}