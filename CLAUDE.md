# 陳怡彣 Sophia — UX 作品集

## 專案概述

多頁式靜態 UX 作品集網站，供求職使用。純 HTML + CSS + 原生 JS，無框架、無打包工具。
內容源稿：各專案根目錄的 `.md` 檔（例如 `鱗屋之中.md`）。

---

## 檔案結構

```
index.html              ← 首頁：Hero + 5 張專案卡片 + About
project-1.html          ← 鱗屋之中
project-2.html          ← G-EIGHT 展場規劃
project-3.html          ← 名偵探柯南 IP 活動
project-4.html          ← 親職教育手冊
project-5.html          ← 廣告成效 Dashboard
style.css               ← 全站共用樣式（含 CSS variables）
main.js                 ← TOC active state + scroll fade-in（IntersectionObserver）
robots.txt

assets/
  鱗屋之中/             ← 鱗屋cover.jpg, photo1.png, photo2.png, 鱗屋result.png
  G-EIGHT展場/          ← G8-cover.jpg + 其他素材
  名偵探柯南/           ← 柯南cover.jpg + 其他素材
  親職教育手冊/         ← 親職教育cover.png + 其他素材
  廣告Dashboard/        ← cover.jpeg, gemini-demo1.jpg, gemini-demo2.png, gemini-demo3.jpeg, 資料上傳檢查區.png

鱗屋之中.md             ← 內容源稿（各專案各一份）
G-EIGHT展場.md
名偵探柯南IP.md
親職教育手冊.md
廣告Dashboard.md
```

---

## CSS Design System

所有顏色與字型透過 CSS variables 統一管理（定義於 `style.css :root`）：

| Variable       | 值          | 用途             |
|----------------|-------------|------------------|
| `--bg`         | `#faf8f5`   | 主背景（暖米白）  |
| `--bg-card`    | `#fff9f4`   | 卡片背景         |
| `--bg-dark`    | `#2d2014`   | 深色區塊         |
| `--accent`     | `#b5723a`   | 主色（赭土橙）   |
| `--accent-lt`  | `#e8c9a8`   | 淡主色（奶茶）   |
| `--accent-bg`  | `#f5ede3`   | 超淡背景用       |
| `--text`       | `#2d2014`   | 主文字           |
| `--muted`      | `#8a7060`   | 次要文字         |
| `--rule`       | `#e8ddd4`   | 分隔線           |
| `--font`       | Noto Sans TC → PingFang TC | 內文 |
| `--font-heading` | Montserrat → Noto Sans TC | 標題 |

`.container` max-width: 900px，padding: 0 32px。

---

## 每個 Case Study 頁面的 HTML 結構

```html
<nav>                          <!-- sticky，含返回 index.html 的連結 -->
<div class="project-hero project-hero--image-only">  <!-- 全寬封面圖 -->
<div class="project-content">
  <div class="project-layout">       <!-- 兩欄：sidebar TOC + 主內容 -->
    <aside class="toc">              <!-- 桌機固定側欄，含章節錨點 -->
    <div class="project-main">
      <div class="project-intro">   <!-- tags + h1 + 一句話摘要 -->
      <div class="project-meta">    <!-- 公司/時間/角色/團隊規模 -->
      <div class="content-section" id="section-bg">       <!-- 背景 -->
      <div class="content-section" id="section-problem">  <!-- 問題定義 -->
      <div class="content-section" id="section-research"> <!-- 研究過程 -->
      <div class="content-section" id="section-decision"> <!-- 關鍵設計決策 -->
      <div id="section-outcome">                          <!-- 成果 -->
      <nav class="project-nav">    <!-- 上一個 / 下一個專案 -->
```

**Section id 命名規則**（TOC 錨點對應）：
`section-bg` / `section-problem` / `section-research` / `section-decision` / `section-outcome`

---

## 常用 UI 元件（CSS class）

| Class | 用途 |
|-------|------|
| `.insight-pull` | 核心洞察引言框（深色底） |
| `.validation-flow` | 多步驟流程橫排（含 `.validation-step` / `.validation-arrow`） |
| `.decision-compare` | 兩選項對比（`.decision-reject` / `.decision-adopt`） |
| `.stat-compare` | 數據前後對比（含 `.stat-frac`） |
| `.trello-board-demo` | Trello 看板示意圖 |
| `.card-tag` | 標籤 pill |
| `.image-caption` | 圖片說明文字 |
| `.thumb-link` | 可點擊放大的圖片按鈕 |
| `<dialog id="lb-*">` | 放大燈箱（lightbox） |

---

## JS 行為（main.js）

- **TOC active state**：IntersectionObserver 偵測 `.content-section` 與 `#section-outcome`，捲動時自動更新 `.toc ul li a.active`
- **Scroll fade-in**：對相同目標加 `.fade-in` class，進入 viewport 後加 `.visible`（threshold: 0.07）

---

## 各專案摘要

| # | 檔案 | 展示重點 | 關鍵數據 |
|---|------|----------|----------|
| 1 | project-1.html | UX 研究・Prototype 迭代 | 評分穩定 4.8–4.9★ |
| 2 | project-2.html | 空間認知・展場 UX | 來店轉化率 +8% |
| 3 | project-3.html | 服務藍圖・大規模執行 | 累計動員 7,000 名玩家 |
| 4 | project-4.html | 包容性設計・標案策略 | 得標 273 萬教育部標案 |
| 5 | project-5.html | 數據分析・AI 工具應用 | Google 成本 -10%、ROAS 3–4 |

---

## 修改內容的原則

- **文案**：先改對應的 `.md` 源稿，再同步更新 HTML（兩份要一致）
- **新增圖片**：放入 `assets/<專案名>/`，在 HTML 用 `<img>` 引用，加 `alt` 文字
- **新增 section**：複製 `<div class="content-section" id="section-xxx">` 結構，並在 `.toc ul` 新增對應錨點 `<li>`
- **不使用任何 JS 框架或打包工具**，維持純靜態

---

## 聯絡資訊（about section）

- Mail：sophlinchennn@gmail.com
- Tel：+886 910 603 069
- 學歷：國立彰化師範大學 企業管理學系
