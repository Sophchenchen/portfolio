# 陳怡彣 Sophia — UX 作品集

## 專案概述

多頁式靜態 UX 作品集網站。純 HTML + CSS + 原生 JS，無框架、無打包工具。
線上網址：`https://sophchenchen.github.io/portfolio/`
內容源稿：各專案根目錄的 `.md` 檔（例如 `鱗屋之中.md`）。

---

## 檔案結構

```
index.html              ← 首頁
project-1.html          ← 鱗屋之中
project-2.html          ← G-EIGHT 展場規劃
project-3.html          ← 名偵探柯南 IP 活動
project-4.html          ← 親職教育手冊
project-5.html          ← 廣告成效 Dashboard
style.css               ← 全站共用樣式（含 CSS variables）
main.js                 ← 所有互動行為（IntersectionObserver）
robots.txt

assets/
  鱗屋之中/             ← 鱗屋cover.jpg, photo1.png, photo2.png, 鱗屋result.png
  G-EIGHT展場/          ← G8-cover.jpg + 其他素材
  名偵探柯南/           ← 柯南cover.jpg + 其他素材
  親職教育手冊/         ← 親職教育cover.png + 其他素材
  廣告Dashboard/        ← cover.jpeg, gemini-demo1.jpg, gemini-demo2.png, gemini-demo3.jpeg

鱗屋之中.md             ← 內容源稿（各專案各一份）
G-EIGHT展場.md
名偵探柯南IP.md
親職教育手冊.md
廣告Dashboard.md
```

---

## 首頁（index.html）結構

```
nav
Hero                ← 標題 + stats + scroll hint（.hero-animate stagger 進場）
Intro               ← 我是誰／怎麼工作（.intro，id="about"，nav 錨點指向此）
Projects            ← 5 張卡片（.projects，.container--wide 1200px）
Closing             ← 設計哲學收尾（.closing，深色背景）
Footer              ← 聯絡方式 + 版權
```

### 首頁卡片結構

```html
<a href="project-N.html" class="project-card">
  <div class="card-image">
    <img src="..." alt="...">
    <div class="card-overlay">   <!-- hover（桌機）/ scroll（手機）顯示 -->
      <ul>
        <li>亮點一</li>
        <li>亮點二</li>
        <li>亮點三</li>
      </ul>
    </div>
  </div>
  <div class="card-body">
    <div class="card-tags">...</div>
    <h3>標題</h3>
    <p class="card-stat">數字成果</p>
    <span class="card-link">查看案例</span>
  </div>
</a>
```

**卡片 Grid**：`.container--wide`（1200px）+ `grid-template-columns: 1fr 1fr`，第 5 張半寬置中。
**手機**：單欄，卡片滾入畫面時自動顯示 overlay（IntersectionObserver threshold 0.45）。

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

**容器寬度**：
- `.container`：max-width 900px，padding 0 32px（文字閱讀區、nav、hero、closing、footer）
- `.container--wide`：max-width 1200px，padding 0 40px（專案卡片區專用）
- 手機（≤640px）：`.container--wide` padding 縮為 0 20px

---

## Case Study 頁面結構（project-1～5）

```html
<nav>
<div class="project-hero project-hero--image-only">  <!-- 全寬封面圖 -->
<div class="project-content">
  <div class="project-layout">
    <aside class="toc">              <!-- 桌機固定側欄，768px 以下隱藏 -->
    <div class="project-main">
      <div class="project-intro">   <!-- tags + h1 + 摘要（fade-in） -->
      <div class="project-meta">    <!-- 公司/時間/角色/團隊（fade-in） -->
      <div class="content-section" id="section-bg">
      <div class="content-section" id="section-problem">
      <div class="content-section" id="section-research">
      <div class="content-section" id="section-decision">
      <div id="section-outcome">
      <nav class="project-nav">
```

相鄰 `content-section` 之間有細分隔線（`border-top: 1px solid var(--rule)`）。
TOC 點擊後對應 `h2` 左側 bar 加粗（`:target` selector）。

---

## 常用 UI 元件

| Class | 用途 |
|-------|------|
| `.insight-pull` | 核心洞察引言框 |
| `.validation-flow` | 多步驟流程橫排 |
| `.decision-compare` | 兩選項對比（`.decision-reject` / `.decision-adopt`） |
| `.stat-compare` | 數據前後對比 |
| `.design-card` | 設計決策卡片（hover 有微浮動效果） |
| `.trello-board-demo` | Trello 看板示意圖 |
| `.card-tag` | 標籤 pill |
| `.image-caption` | 圖片說明文字 |
| `.thumb-link` | 可點擊放大的圖片按鈕 |
| `<dialog id="lb-*">` | 放大燈箱（lightbox） |
| `.intro-motto` | 我是誰區塊的強調句 |
| `.closing-tagline` | 結論區塊的主標語（Montserrat，白色） |

---

## JS 行為（main.js）

| 功能 | 觸發條件 | 說明 |
|------|----------|------|
| TOC active state | 捲動 project 頁 | IntersectionObserver，rootMargin `-10% 0px -75% 0px` |
| Scroll fade-in | `.project-intro`、`.project-meta`、`.content-section`、`#section-outcome`、`.section-header` | threshold 0.07，加 `.fade-in` + `.visible` |
| Project cards stagger | index.html 卡片進入視窗 | 每張 `transitionDelay` 遞增 0.08s |
| Hero stagger | 頁面載入 | CSS animation `hero-enter`，5 個子元素 delay 0.05–0.52s |
| Hero stats count-up | `.hero-stat-num` 進入視窗 | easeOutQuart，800ms，保留 `+` suffix |
| Mobile overlay | 手機（≤640px）卡片進入視窗 | threshold 0.45，toggle `.overlay-active` |

---

## OG Meta Tags

所有 6 個 HTML 頁面均已加上 `og:title`、`og:description`、`og:image`、`og:url`。
圖片 URL 使用 URL 編碼（中文路徑轉 `%xx` 格式）。

---

## 修改原則

- **文案**：先改對應 `.md` 源稿，再同步更新 HTML
- **新增圖片**：放入 `assets/<專案名>/`，HTML 用 `<img>` 引用並加 `alt`
- **新增 case study section**：複製 `<div class="content-section" id="section-xxx">` 結構，在 `.toc ul` 新增對應 `<li>`
- **首頁卡片 overlay 文字**：修改各 `.card-overlay ul` 內的 `<li>` 即可
- **不使用任何 JS 框架或打包工具**

---

## 聯絡資訊

- Mail：sophlinchennn@gmail.com
- Tel：+886 910 603 069
- 學歷：國立彰化師範大學 企業管理學系
