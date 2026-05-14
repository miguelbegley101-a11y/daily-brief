package com.dailybrief.model;

import java.util.List;

public record BriefResponse(
    String dateLabel,
    LeadStory lead,
    List<SummaryItem> summaries,
    List<Topic> topics,
    List<Story> stories
) {
}
