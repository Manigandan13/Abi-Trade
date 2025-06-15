package com.crypto.service;
import com.crypto.model.Coin;
import com.crypto.model.CoinDTO;

import java.util.List;

public interface CoinService {
    List<CoinDTO> getCoinList(int page) throws Exception;
    String getMarketChart(String coinId,int days) throws Exception;
    CoinDTO getCoinDetails(String coinId) throws Exception;

    Coin findById(String coinId) throws Exception;

    List<CoinDTO> searchCoin(String keyword);

    String getTop50CoinsByMarketCapRank();

    String getTreadingCoins();
}
