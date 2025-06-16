package com.crypto.service;

import com.crypto.model.ChartData;
import com.crypto.model.Coin;
import com.crypto.model.CoinDTO;
import com.crypto.repository.ChartDataRepository;
import com.crypto.repository.CoinRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CoinServiceImpl implements CoinService {

    @Autowired
    private CoinRepository coinRepository;

    @Autowired
    private ChartDataRepository chartDataRepository;

    // Conversion from Coin to DTO
    private CoinDTO convertToDTO(Coin coin) {
        CoinDTO dto = new CoinDTO();
        dto.setId(coin.getId());
        dto.setSymbol(coin.getSymbol());
        dto.setName(coin.getName());
        dto.setImage(coin.getImage());
        dto.setCurrentPrice(coin.getCurrentPrice());
        dto.setMarketCap(coin.getMarketCap());
        dto.setMarketCapRank(coin.getMarketCapRank());
        dto.setTotalVolume(coin.getTotalVolume());
        dto.setHigh24h(coin.getHigh24h());
        dto.setLow24h(coin.getLow24h());
        dto.setPriceChange24h(coin.getPriceChange24h());
        dto.setPriceChangePercentage24h(coin.getPriceChangePercentage24h());
        dto.setMarketCapChange24h(coin.getMarketCapChange24h());
        dto.setMarketCapChangePercentage24h(coin.getMarketCapChangePercentage24h());
        dto.setCirculatingSupply(coin.getCirculatingSupply());
        dto.setTotalSupply(coin.getTotalSupply());
        dto.setAth((long) coin.getAth());
        dto.setAthChangePercentage((long) coin.getAthChangePercentage());
        dto.setAthDate(coin.getAthDate());
        dto.setAtl((long) coin.getAtl());
        dto.setAtlChangePercentage((long) coin.getAtlChangePercentage());
        dto.setAtlDate(coin.getAtlDate());
        dto.setLastUpdated(coin.getLastUpdated());
        return dto;
    }

    @Override
    public List<CoinDTO> getCoinList(int page) {
        int pageSize = 10;
        Pageable pageable = PageRequest.of(page, pageSize);
        List<Coin> coins = coinRepository.findAll(pageable).getContent();
        return coins.stream()
                    .map(this::convertToDTO)
                    .collect(Collectors.toList());
    }


    @Override
    public String getMarketChart(String coinId, int days) throws Exception {
        Optional<ChartData> chartDataOpt = chartDataRepository.findByCoinIdAndDays(coinId, days);
        if (chartDataOpt.isPresent()) {
            return chartDataOpt.get().getPricesJson();
        }
        return "{\"message\": \"Market chart data not available locally.\"}";
    }

    @Override
    public CoinDTO getCoinDetails(String coinId) throws Exception {
        Coin coin = coinRepository.findById(coinId)
                    .orElseThrow(() -> new Exception("Coin not found"));
        return convertToDTO(coin); // use your existing method
    }


@Override
public Coin findById(String coinId) throws Exception {
    return coinRepository.findById(coinId)
            .orElseThrow(() -> new Exception("Coin not found with ID: " + coinId));
}

@Override
public List<CoinDTO> searchCoin(String keyword) {
    List<Coin> coins = coinRepository.findAll();

    return coins.stream()
        .filter(c -> c.getName().toLowerCase().contains(keyword.toLowerCase()) ||
                     c.getSymbol().toLowerCase().contains(keyword.toLowerCase()))
        .map(this::convertToDTO)
        .collect(Collectors.toList());
}



@Override
public String getTop50CoinsByMarketCapRank() {
    List<Coin> coins = coinRepository.findAll();
    List<Coin> top50 = coins.stream()
            .sorted(Comparator.comparingInt(Coin::getMarketCapRank))
            .limit(50)
            .collect(Collectors.toList());
    return top50.toString(); // or convert to JSON if needed
}

@Override
public String getTreadingCoins() {
    // "Trending" is subjective — we'll assume top gainers in 24h by percentage
    List<Coin> coins = coinRepository.findAll();
    List<Coin> trending = coins.stream()
            .sorted(Comparator.comparingDouble(Coin::getPriceChangePercentage24h).reversed())
            .limit(10)
            .collect(Collectors.toList());
    return trending.toString(); // or return JSON string
}

}
