<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:atom="http://www.w3.org/2005/Atom">
  <xsl:output method="html" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html lang="en">
      <head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <title><xsl:value-of select="/rss/channel/title"/> - RSS Feed</title>
        <style>
          *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
          body {
            font-family: 'Geist', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            background: #fff;
            color: #18181b;
            line-height: 1.6;
            -webkit-font-smoothing: antialiased;
          }
          @media (prefers-color-scheme: dark) {
            body { background: #000; color: #fff; }
            .banner { background: #18181b; border-color: #27272a; }
            .banner-title { color: #fff; }
            .banner-text { color: #a1a1aa; }
            .banner-url { background: #09090b; border-color: #27272a; color: #d4d4d8; }
            .article { border-color: #27272a; }
            .article:hover { border-color: #3f3f46; }
            .article-title a { color: #fff; }
            .article-desc { color: #a1a1aa; }
            .article-meta { color: #71717a; }
            .tag { border-color: #27272a; color: #a1a1aa; }
            .back-link { color: #a1a1aa; }
            .back-link:hover { color: #fff; }
            .step-num { background: #27272a; color: #d4d4d8; }
          }
          .container { max-width: 720px; margin: 0 auto; padding: 128px 24px 96px; }
          .banner {
            background: #f4f4f5;
            border: 1px solid #e4e4e7;
            border-radius: 12px;
            padding: 32px;
            margin-bottom: 48px;
          }
          .rss-icon {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 40px;
            height: 40px;
            background: #f97316;
            border-radius: 8px;
            margin-bottom: 16px;
          }
          .rss-icon svg { width: 20px; height: 20px; color: #fff; }
          .banner-title {
            font-size: 20px;
            font-weight: 600;
            margin-bottom: 8px;
          }
          .banner-text {
            font-size: 14px;
            color: #71717a;
            margin-bottom: 20px;
          }
          .steps { margin-bottom: 20px; }
          .step {
            display: flex;
            align-items: baseline;
            gap: 12px;
            margin-bottom: 8px;
            font-size: 14px;
            color: #52525b;
          }
          .step-num {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 22px;
            height: 22px;
            border-radius: 50%;
            background: #e4e4e7;
            color: #52525b;
            font-size: 12px;
            font-weight: 600;
            flex-shrink: 0;
          }
          .url-wrap {
            position: relative;
          }
          .banner-url {
            display: block;
            width: 100%;
            padding: 10px 40px 10px 14px;
            background: #fff;
            border: 1px solid #e4e4e7;
            border-radius: 8px;
            font-family: monospace;
            font-size: 13px;
            color: #52525b;
            word-break: break-all;
            cursor: text;
          }
          .copy-btn {
            position: absolute;
            right: 8px;
            top: 50%;
            transform: translateY(-50%);
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 28px;
            height: 28px;
            border: none;
            border-radius: 6px;
            background: transparent;
            color: #a1a1aa;
            cursor: pointer;
            transition: color 0.15s, background 0.15s;
          }
          .copy-btn:hover { color: #18181b; background: #e4e4e7; }
          .copy-btn svg { width: 16px; height: 16px; }
          @media (prefers-color-scheme: dark) {
            .copy-btn:hover { color: #fff; background: #27272a; }
          }
          .readers {
            margin-top: 16px;
            font-size: 13px;
            color: #71717a;
          }
          .readers a {
            color: #52525b;
            text-decoration: underline;
            text-underline-offset: 2px;
          }
          .readers a:hover { color: #18181b; }
          @media (prefers-color-scheme: dark) {
            .readers a { color: #a1a1aa; }
            .readers a:hover { color: #fff; }
            .step { color: #a1a1aa; }
          }
          .section-title {
            font-size: 11px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            color: #71717a;
            margin-bottom: 24px;
          }
          .articles { display: flex; flex-direction: column; gap: 16px; }
          .article {
            border: 1px solid #e4e4e7;
            border-radius: 12px;
            padding: 24px;
            transition: border-color 0.15s;
          }
          .article:hover { border-color: #a1a1aa; }
          .article-title {
            font-size: 16px;
            font-weight: 600;
            margin-bottom: 8px;
            line-height: 1.4;
          }
          .article-title a { color: #18181b; text-decoration: none; }
          .article-title a:hover { text-decoration: underline; text-underline-offset: 2px; }
          .article-desc {
            font-size: 14px;
            color: #71717a;
            margin-bottom: 12px;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
          .article-meta {
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            gap: 8px;
            font-size: 12px;
            color: #a1a1aa;
          }
          .tag {
            border: 1px solid #e4e4e7;
            border-radius: 9999px;
            padding: 2px 10px;
            font-size: 11px;
            color: #71717a;
          }
          .back-link {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            margin-top: 48px;
            font-size: 14px;
            color: #71717a;
            text-decoration: none;
          }
          .back-link:hover { color: #18181b; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="banner">
            <div class="rss-icon">
              <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12.75 19.5v-.75a7.5 7.5 0 0 0-7.5-7.5H4.5m0-6.75h.75c7.87 0 14.25 6.38 14.25 14.25v.75M6 18.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"/>
              </svg>
            </div>
            <h1 class="banner-title">Subscribe to this RSS feed</h1>
            <p class="banner-text">Copy the URL below into your RSS reader to get notified when new articles are published.</p>
            <div class="steps">
              <div class="step">
                <span class="step-num">1</span>
                <span>Copy the feed URL below</span>
              </div>
              <div class="step">
                <span class="step-num">2</span>
                <span>Open your RSS reader and add a new subscription</span>
              </div>
              <div class="step">
                <span class="step-num">3</span>
                <span>Paste the URL and confirm</span>
              </div>
            </div>
            <div class="url-wrap">
              <input class="banner-url" id="feed-url" type="text" readonly="readonly">
                <xsl:attribute name="value">
                  <xsl:value-of select="/rss/channel/atom:link/@href"/>
                </xsl:attribute>
              </input>
              <button class="copy-btn" id="copy-btn" type="button" title="Copy URL">
                <svg id="icon-copy" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75m11.25-1.5h-9.75a1.125 1.125 0 0 0-1.125 1.125v12.75c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V6.375c0-.621-.504-1.125-1.125-1.125Z"/>
                </svg>
                <svg id="icon-check" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" style="display:none">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5"/>
                </svg>
              </button>
            </div>
            <p class="readers">
              Popular readers:
              <a href="https://feedly.com" target="_blank" rel="noopener">Feedly</a>,
              <a href="https://netnewswire.com" target="_blank" rel="noopener">NetNewsWire</a>,
              <a href="https://newsblur.com" target="_blank" rel="noopener">NewsBlur</a>,
              <a href="https://www.inoreader.com" target="_blank" rel="noopener">Inoreader</a>
            </p>
          </div>

          <h2 class="section-title">Recent articles</h2>
          <div class="articles">
            <xsl:for-each select="/rss/channel/item">
              <article class="article">
                <h3 class="article-title">
                  <a>
                    <xsl:attribute name="href"><xsl:value-of select="link"/></xsl:attribute>
                    <xsl:value-of select="title"/>
                  </a>
                </h3>
                <p class="article-desc"><xsl:value-of select="description"/></p>
                <div class="article-meta">
                  <time><xsl:value-of select="pubDate"/></time>
                  <xsl:for-each select="category">
                    <span class="tag"><xsl:value-of select="."/></span>
                  </xsl:for-each>
                </div>
              </article>
            </xsl:for-each>
          </div>

          <a class="back-link" href="/">
            <xsl:text>&#8592; Back to site</xsl:text>
          </a>
        </div>
        <script>
          document.getElementById('copy-btn').addEventListener('click', function() {
            var url = document.getElementById('feed-url').value;
            navigator.clipboard.writeText(url).then(function() {
              document.getElementById('icon-copy').style.display = 'none';
              document.getElementById('icon-check').style.display = 'block';
              setTimeout(function() {
                document.getElementById('icon-copy').style.display = 'block';
                document.getElementById('icon-check').style.display = 'none';
              }, 2000);
            });
          });
        </script>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
