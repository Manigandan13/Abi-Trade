package com.crypto.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.crypto.model.Coin;
import com.crypto.model.CoinDTO;
import com.crypto.service.CoinService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/coins")
public class CoinController {

    @Autowired
    private CoinService coinService;

    @Autowired
    private ObjectMapper objectMapper;

    // ✅ 1. Get paginated coin list from DB
    @GetMapping
    public ResponseEntity<List<CoinDTO>> getCoinList(@RequestParam("page") int page) throws Exception {
        List<CoinDTO> coins = coinService.getCoinList(page);
        System.out.println(coins);
        return ResponseEntity.ok(coins);
    }


    @GetMapping("/{coinId}/chart")
    public ResponseEntity<JsonNode> getMarketChart(@PathVariable String coinId,
                                                   @RequestParam("days") int days) throws Exception {
        String chartData = coinService.getMarketChart(coinId, days);
        JsonNode jsonNode = objectMapper.readTree(chartData);
        return ResponseEntity.ok(jsonNode);
    }

    // ✅ 3. Get coin details (by ID)
    @GetMapping("details/{coinId}")
public ResponseEntity<CoinDTO> getCoinDetails(@PathVariable String coinId) throws Exception {
    CoinDTO coinDTO = coinService.getCoinDetails(coinId);
    return ResponseEntity.ok(coinDTO);
}

    // ✅ 4. Search for a coin by keyword
    @GetMapping("/search")
    public ResponseEntity<List<CoinDTO>> searchCoin(@RequestParam("keyword") String keyword) {
        List<CoinDTO> result = coinService.searchCoin(keyword);
        return ResponseEntity.ok(result);
    }


    // ✅ 5. Get top 50 coins by market cap rank
    @GetMapping("/top50")
    public ResponseEntity<JsonNode> getTop50CoinsByMarketCapRank() throws Exception {
        String result = coinService.getTop50CoinsByMarketCapRank();
        JsonNode jsonNode = objectMapper.readTree(result);
        return ResponseEntity.ok(jsonNode);
    }

    // ✅ 6. Get trending coins (top gainers)
    @GetMapping("/trending")
    public ResponseEntity<JsonNode> getTrendingCoins() throws Exception {
        String result = coinService.getTreadingCoins();
        JsonNode jsonNode = objectMapper.readTree(result);
        return ResponseEntity.ok(jsonNode);
    }
}
