package com.dailybrief.service;

import com.dailybrief.model.BriefResponse;
import com.dailybrief.model.LeadStory;
import com.dailybrief.model.Story;
import com.dailybrief.model.SummaryItem;
import com.dailybrief.model.Topic;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Locale;
import org.springframework.stereotype.Service;

@Service
public class BriefService {
  private static final DateTimeFormatter DATE_FORMATTER =
      DateTimeFormatter.ofPattern("yyyy/MM/dd E", Locale.CHINA);

  public BriefResponse today() {
    var stories = stories();
    return new BriefResponse(
        LocalDate.now().format(DATE_FORMATTER),
        new LeadStory(
            "world",
            "国际",
            "08:30",
            "Global Desk",
            "多国会议聚焦供应链韧性，能源与芯片议题继续升温",
            "今日国际议程围绕关键矿产、港口运输和区域安全展开，市场正在观察政策文本是否会转化为新的产业补贴和贸易限制。"
        ),
        List.of(
            new SummaryItem("宏观", "亚洲主要股指分化，投资者等待新一轮通胀数据。"),
            new SummaryItem("科技", "端侧 AI、开源模型和芯片供给仍是行业主线。"),
            new SummaryItem("社会", "多地发布高温与强降雨提示，城市应急能力受关注。"),
            new SummaryItem("文化", "暑期档内容竞争提前升温，线下演出复苏延续。")
        ),
        List.of(
            new Topic("all", "总览", "red"),
            new Topic("world", "国际视野", "blue"),
            new Topic("tech", "科技雷达", "cyan"),
            new Topic("finance", "财经脉冲", "amber"),
            new Topic("society", "城市社会", "indigo"),
            new Topic("culture", "文化现场", "violet")
        ),
        stories
    );
  }

  private List<Story> stories() {
    return List.of(
        new Story(
            1,
            "world",
            "国际",
            "08:30",
            "Global Desk",
            "多国会议聚焦供应链韧性，能源与芯片议题继续升温",
            "关键矿产、港口运输和区域安全成为讨论重点，市场关注相关政策是否会继续影响制造业投资。",
            List.of("供应链", "能源", "贸易")
        ),
        new Story(
            2,
            "tech",
            "科技",
            "09:10",
            "Tech Wire",
            "端侧 AI 应用加速落地，设备厂商转向更轻量模型",
            "新一代手机与 PC 强调本地推理能力，开发者生态正从单纯参数规模转向延迟、功耗和隐私体验。",
            List.of("端侧AI", "开源模型", "芯片")
        ),
        new Story(
            3,
            "finance",
            "财经",
            "09:45",
            "Market Note",
            "亚洲市场早盘分化，资金继续等待通胀和利率信号",
            "投资者在科技股盈利预期和政策不确定性之间重新定价，避险资产和成长板块同步受到关注。",
            List.of("市场", "利率", "通胀")
        ),
        new Story(
            4,
            "society",
            "社会",
            "10:20",
            "City Lens",
            "多地发布极端天气提醒，城市排涝与电力保障进入高压测试",
            "强降雨和高温预警交替出现，交通、电网、社区服务的联动响应成为今日公共治理观察点。",
            List.of("天气", "城市治理", "民生")
        ),
        new Story(
            5,
            "culture",
            "文化",
            "11:00",
            "Culture Lab",
            "暑期档内容竞争提前升温，线下演出和短剧市场继续扩容",
            "院线、长视频和现场演出开始争夺年轻用户时长，平台更重视话题扩散与二次创作效率。",
            List.of("电影", "演出", "短剧")
        ),
        new Story(
            6,
            "tech",
            "科技",
            "11:35",
            "Builder Daily",
            "开源工具链更新频繁，企业内部知识库成为 AI 落地入口",
            "围绕检索、权限和审计的基础设施需求上升，团队开始把 AI 功能嵌入已有工作流，而非独立产品。",
            List.of("知识库", "RAG", "开发者")
        ),
        new Story(
            7,
            "finance",
            "财经",
            "12:05",
            "Industry View",
            "新能源产业链价格企稳，机构关注海外需求与库存周期",
            "组件、储能和充电基础设施的订单结构出现差异，企业利润修复仍取决于去库存速度。",
            List.of("新能源", "库存", "出海")
        ),
        new Story(
            8,
            "world",
            "国际",
            "13:15",
            "Policy Room",
            "区域安全会谈重启，外交表态释放谨慎降温信号",
            "各方仍在边界条件上保持分歧，但沟通机制恢复本身降低了短期误判风险。",
            List.of("外交", "安全", "谈判")
        )
    );
  }
}
