package cfg.clg.controller;

import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import cfg.clg.entity.ChatBotEntity;
import cfg.clg.entity.ChatHistoryEntity;
import cfg.clg.repo.ChatBotRepository;
import cfg.clg.repo.ChatHistoryRepository;

@RestController
@RequestMapping("/api/chat")
public class ChatBotController {

    @Autowired
    private ChatBotRepository chatrepo;

    @Autowired
    private ChatHistoryRepository historyRepo;

    // Main chat endpoint (simplified)
    @PostMapping
    public Map<String, String> chat(@RequestBody Map<String, String> request) {
        String rawMsg = Optional.ofNullable(request.get("message")).orElse("").trim();
        if (rawMsg.isEmpty()) {
            return Collections.singletonMap("reply", "Please enter a message.");
        }

        String userMsg = rawMsg.toLowerCase();
        String userId = Optional.ofNullable(request.get("userId")).orElse("anonymous");
        LocalDateTime now = LocalDateTime.now();

        // Save user message
        historyRepo.save(new ChatHistoryEntity(0, userId, "USER", rawMsg, now));

        String reply = "Sorry, I didn't get that. Please contact admissions at <b>9876543210</b>.";

        List<ChatBotEntity> faqs = chatrepo.findAll();

        // Exact match check
        for (ChatBotEntity faq : faqs) {
            String question = Optional.ofNullable(faq.getQuestion()).orElse("").trim().toLowerCase();
            if (userMsg.equals(question)) {
                reply = faq.getAnswer();
                historyRepo.save(new ChatHistoryEntity(0, userId, "BOT", reply, LocalDateTime.now()));
                return Collections.singletonMap("reply", reply);
            }
        }

        // Partial match by word count
        int maxMatch = 0;
        for (ChatBotEntity faq : faqs) {
            String question = Optional.ofNullable(faq.getQuestion()).orElse("").toLowerCase();
            int count = 0;
            for (String word : question.split("\\s+")) {
                if (!word.isBlank() && userMsg.contains(word)) {
                    count++;
                }
            }
            if (count > maxMatch) {
                maxMatch = count;
                reply = faq.getAnswer();
            }
        }

        if (rawMsg.length() > 100) {
            return Collections.singletonMap("reply", "Your message is too long. Please shorten it.");
        }

        // Save bot reply
        historyRepo.save(new ChatHistoryEntity(0, userId, "BOT", reply, LocalDateTime.now()));

        return Collections.singletonMap("reply", reply);
    }

    // Get top 10 most used user queries
    @GetMapping("/top-queries")
    public List<Map<String, Object>> getTopQueries() {
        // Fetch all messages sent by USER
        List<ChatHistoryEntity> userMessages = historyRepo.findBySender("USER");

        // Group messages and count frequency
        Map<String, Long> freqMap = userMessages.stream()
            .collect(Collectors.groupingBy(ChatHistoryEntity::getMessage, Collectors.counting()));

        // Sort descending and limit top 10
        return freqMap.entrySet().stream()
            .sorted(Map.Entry.<String, Long>comparingByValue().reversed())
            .limit(10)
            .map(e -> {
                Map<String, Object> m = new HashMap<>();
                m.put("query", e.getKey());
                m.put("count", e.getValue());
                return m;
            })
            .collect(Collectors.toList());
    }

    // Export full chat history as CSV for download — returns raw CSV string with correct content type
    @GetMapping(value = "/export-history", produces = "text/csv")
    public String exportChatHistory() {
        List<ChatHistoryEntity> allHistory = historyRepo.findAll();

        // Prepare CSV header and rows (escape quotes in messages)
        String csvHeader = "ID,UserId,Sender,Message,Timestamp\n";
        String csvBody = allHistory.stream()
            .map(h -> String.format("%d,%s,%s,\"%s\",%s",
                h.getId(),
                h.getUserId(),
                h.getSender(),
                h.getMessage().replace("\"", "\"\""),
                h.getTimestamp()))
            .collect(Collectors.joining("\n"));

        return csvHeader + csvBody;
    }
   
}
