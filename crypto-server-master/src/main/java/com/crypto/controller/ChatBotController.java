package com.crypto.controller;

import com.crypto.model.CoinDTO;
import com.crypto.request.PromptBody;
import com.crypto.response.ApiResponse;
import com.crypto.service.ChatBotService;
import com.crypto.service.ChatBotServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/chat")
public class ChatBotController {

    @Autowired
    private ChatBotService chatBotService;

    @PostMapping("/bot")
    public ResponseEntity<String> simpleChat(@RequestBody PromptBody promptBody) {
        String response = chatBotService.simpleChat(promptBody.getPrompt());
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}

