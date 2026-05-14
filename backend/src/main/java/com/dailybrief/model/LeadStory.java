package com.dailybrief.model;

public record LeadStory(
    String category,
    String label,
    String time,
    String source,
    String title,
    String summary
) {
}
