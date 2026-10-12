const mode = process.env.NEWS_FIXTURE;
const oldArticle = '<article class="elementor-post"><h3 class="elementor-post__title"><a href="https://example.org/old">OpenHW RISC-V release</a></h3><time datetime="2000-01-01">2000-01-01</time><span class="elementor-post-date">2000-01-01</span></article>';
const chipsArticle = '<article class=blog-post><h3 class=blog-post-title><a href="https://example.org/old">OpenHW RISC-V release</a></h3><div class=blog-post-date>January 1, 2000</div></article>';
const lowriscArticle = '<h6 class="wp-block-post-title"><a href="https://example.org/old">OpenTitan release</a></h6><div class="wp-block-post-date"><time datetime="2000-01-01">January 1, 2000</time></div>';
globalThis.fetch = async (input) => {
  const url = String(input);
  if (mode === "timeout") throw new DOMException("Fixture timeout", "TimeoutError");
  if (mode === "429") return new Response("rate limited", { status: 429 });
  if (mode === "invalid") return new Response("<html>Unexpected success page</html>");
  if (mode === "broken-xml") return new Response("<rss><channel><item></rss>");
  if (mode === "partial" && url.includes("riscv.org")) throw new DOMException("Fixture single-source timeout", "TimeoutError");
  if (url.includes("api.github.com")) return new Response("[]", { headers: { "content-type": "application/json" } });
  if (url === "https://openhwfoundation.org/events/") return new Response(oldArticle);
  if (url === "https://www.chipsalliance.org/categories/blog/") return new Response(chipsArticle);
  if (url === "https://lowrisc.org/news/") return new Response(lowriscArticle);
  if (mode === "ocp-feed") {
    if (url !== "https://www.opencompute.org/feed/") return new Response("<rss><channel/></rss>");
    return new Response('<rss><channel><item><title>Switch platform architecture draft</title><link>https://www.opencompute.org/news/switch-platform-fixture/</link><pubDate>' + new Date().toISOString().slice(0, 10) + '</pubDate><description>Platform management proposal for public review</description></item></channel></rss>');
  }
  if (mode === "empty") return new Response("<rss><channel/></rss>");
  if (mode === "atom") return new Response('<feed xmlns="http://www.w3.org/2005/Atom"><title>OpenHW</title></feed>');
  const item = "<item><title>OpenHW CORE-V verification release</title><link>https://example.org/current</link><pubDate>" + new Date().toISOString().slice(0, 10) + "</pubDate><description>OpenHW RISC-V verification</description></item>";
  return new Response("<rss><channel>" + item + item + "</channel></rss>");
};
