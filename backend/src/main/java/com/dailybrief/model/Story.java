package com.dailybrief.model;

import java.util.List;

public record Story(
    long id,
    String category,
    String label,
    String time,
    String source,
    String title,
    String summary,
    List<String> tags
) {
}
