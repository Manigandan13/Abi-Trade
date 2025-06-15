package com.crypto.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.crypto.model.ChartData;

@Repository
public interface ChartDataRepository extends JpaRepository<ChartData, Long> {
    Optional<ChartData> findByCoinIdAndDays(String coinId, int days);
}

