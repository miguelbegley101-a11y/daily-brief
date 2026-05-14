package com.dailybrief.controller;

import com.dailybrief.model.BriefResponse;
import com.dailybrief.model.HealthResponse;
import com.dailybrief.service.BriefService;
import java.time.Instant;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BriefController {
  private final BriefService briefService;

  public BriefController(BriefService briefService) {
    this.briefService = briefService;
  }

  @GetMapping("/api/brief")
  public BriefResponse brief() {
    return briefService.today();
  }

  @GetMapping("/api/health")
  public HealthResponse health() {
    return new HealthResponse("ok", "daily-brief-backend", Instant.now());
  }
}
