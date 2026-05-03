/**
 * Loads custom meta tags from /meta-tags.html and ad scripts from /ads.html
 * and injects them into the document. This lets you edit those two files
 * (in /public) without touching the rest of the codebase.
 */

async function fetchSnippet(url: string): Promise<string> {
  try {
    const res = await fetch(url, { cache: "no-cache" });
    if (!res.ok) return "";
    return await res.text();
  } catch {
    return "";
  }
}

function stripHtmlComments(html: string): string {
  return html.replace(/<!--[\s\S]*?-->/g, "");
}

function injectMetaTags(html: string) {
  const clean = stripHtmlComments(html).trim();
  if (!clean) return;
  const tpl = document.createElement("template");
  tpl.innerHTML = clean;
  document.head.appendChild(tpl.content.cloneNode(true));
}

function injectAds(html: string, target: HTMLElement) {
  const clean = stripHtmlComments(html).trim();
  if (!clean) return;
  const tpl = document.createElement("template");
  tpl.innerHTML = clean;

  // Re-create <script> nodes so the browser actually executes them
  tpl.content.querySelectorAll("script").forEach((oldScript) => {
    const newScript = document.createElement("script");
    for (const attr of Array.from(oldScript.attributes)) {
      newScript.setAttribute(attr.name, attr.value);
    }
    newScript.text = oldScript.textContent || "";
    oldScript.replaceWith(newScript);
  });

  target.appendChild(tpl.content.cloneNode(true));
}

export async function loadExternalSnippets() {
  const [meta, ads] = await Promise.all([
    fetchSnippet("/meta-tags.html"),
    fetchSnippet("/ads.html"),
  ]);
  injectMetaTags(meta);
  injectAds(ads, document.body);
}
