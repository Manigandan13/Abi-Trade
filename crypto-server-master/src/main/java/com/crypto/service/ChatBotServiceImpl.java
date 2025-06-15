package com.crypto.service;


import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class ChatBotServiceImpl implements ChatBotService {

    @Value("${gemini.api.key}")
    private String API_KEY;

    @Override
    public String simpleChat(String prompt) {
        String GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" + API_KEY;

        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        // Build request body
        JSONObject requestBody = new JSONObject();
        JSONArray contentsArray = new JSONArray();
        JSONObject contentsObject = new JSONObject();
        JSONArray partsArray = new JSONArray();
        JSONObject textObject = new JSONObject();
        textObject.put("text", prompt);
        partsArray.put(textObject);
        contentsObject.put("parts", partsArray);
        contentsArray.put(contentsObject);
        requestBody.put("contents", contentsArray);

        HttpEntity<String> requestEntity = new HttpEntity<>(requestBody.toString(), headers);

        try {
            ResponseEntity<String> response = restTemplate.postForEntity(GEMINI_API_URL, requestEntity, String.class);
            String responseBody = response.getBody();

            JSONObject responseJson = new JSONObject(responseBody);
            JSONArray candidates = responseJson.getJSONArray("candidates");
            JSONObject firstCandidate = candidates.getJSONObject(0);

            // ✅ FIX STARTS HERE
            JSONObject contentObject = firstCandidate.getJSONObject("content");
            JSONArray partsArrayResponse = contentObject.getJSONArray("parts");
            JSONObject firstPart = partsArrayResponse.getJSONObject(0);
            String answer = firstPart.getString("text");
            // ✅ FIX ENDS HERE

            return answer;

        } catch (Exception e) {
            e.printStackTrace();
            return "Sorry, I'm unable to process your request at the moment.";
        }
    }
}


