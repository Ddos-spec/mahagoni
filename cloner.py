import os
import re
import sys
import json
import urllib.parse
import requests
from bs4 import BeautifulSoup
from concurrent.futures import ThreadPoolExecutor

BASE_URL = "https://mahoganiutama.com"
DOMAIN = "mahoganiutama.com"
OUTPUT_DIR = r"D:\code\mahagoni"

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.9,id;q=0.8",
}

visited_urls = set()
downloaded_assets = set()
html_pages = {} # url: soup/content
queue = set()

session = requests.Session()
session.headers.update(HEADERS)

def normalize_url(url, current_url=BASE_URL):
    if not url or url.startswith("data:") or url.startswith("javascript:") or url.startswith("mailto:") or url.startswith("tel:") or url.startswith("#"):
        return None
    joined = urllib.parse.urljoin(current_url, url)
    parsed = urllib.parse.urlparse(joined)
    cleaned = parsed._replace(fragment="").geturl()
    return cleaned

def get_local_path_for_url(url, is_html=False):
    parsed = urllib.parse.urlparse(url)
    path = parsed.path
    if not path or path == "/":
        path = "/index.html"
    elif path.endswith("/"):
        path = path + "index.html"
    elif is_html and not os.path.splitext(path)[1]:
        path = path + "/index.html"
    
    # Strip leading slash
    rel_path = path.lstrip("/")
    # Replace invalid chars on Windows
    rel_path = rel_path.replace(":", "_").replace("?", "_").replace("*", "_")
    return os.path.join(OUTPUT_DIR, rel_path.replace("/", os.sep))

def save_file(local_path, content, is_binary=False):
    os.makedirs(os.path.dirname(local_path), exist_ok=True)
    mode = "wb" if is_binary else "w"
    encoding = None if is_binary else "utf-8"
    try:
        with open(local_path, mode, encoding=encoding) as f:
            f.write(content)
    except Exception as e:
        print(f"[ERR] File write failed: {local_path} -> {e}")

def download_asset(url, referer=BASE_URL):
    norm_url = normalize_url(url, referer)
    if not norm_url or norm_url in downloaded_assets:
        return
    parsed = urllib.parse.urlparse(norm_url)
    if DOMAIN not in parsed.netloc:
        if not any(ext in parsed.path.lower() for ext in ['.css', '.js', '.woff', '.woff2', '.ttf', '.png', '.jpg', '.jpeg', '.svg', '.webp', '.gif']):
            return

    downloaded_assets.add(norm_url)
    try:
        r = session.get(norm_url, timeout=20)
        if r.status_code == 200:
            local_path = get_local_path_for_url(norm_url, is_html=False)
            content_type = r.headers.get("Content-Type", "")
            is_css = ".css" in parsed.path.lower() or "text/css" in content_type
            
            if is_css:
                css_text = r.text
                css_urls = re.findall(r'url\(\s*[\'"]?([^\'")]+)[\'"]?\s*\)', css_text)
                for nested_u in css_urls:
                    nested_full = normalize_url(nested_u, norm_url)
                    if nested_full:
                        download_asset(nested_full, norm_url)
                save_file(local_path, css_text, is_binary=False)
            else:
                save_file(local_path, r.content, is_binary=True)
            print(f"[ASSET] Saved: {parsed.path} ({len(r.content)} bytes)")
    except Exception as e:
        print(f"[ERR] Asset failed: {norm_url} -> {e}")

def discover_wp_routes():
    print("[+] Discovering WordPress pages and posts via REST API...")
    endpoints = [
        f"{BASE_URL}/wp-json/wp/v2/pages?per_page=100",
        f"{BASE_URL}/wp-json/wp/v2/posts?per_page=100",
        f"{BASE_URL}/wp-json/wp/v2/categories?per_page=100",
        f"{BASE_URL}/wp-json/wp/v2/tags?per_page=100",
        f"{BASE_URL}/wp-json/wp/v2/media?per_page=100"
    ]
    for ep in endpoints:
        try:
            r = session.get(ep, timeout=15)
            if r.status_code == 200:
                data = r.json()
                for item in data:
                    if isinstance(item, dict):
                        link = item.get("link")
                        if link:
                            queue.add(link)
                        src = item.get("source_url")
                        if src:
                            download_asset(src)
        except Exception as e:
            print(f"[!] WP API error on {ep}: {e}")

def extract_assets_from_html(soup, page_url):
    for link in soup.find_all("link"):
        href = link.get("href")
        if href:
            download_asset(href, page_url)
            
    for script in soup.find_all("script"):
        src = script.get("src")
        if src:
            download_asset(src, page_url)
            
    for img in soup.find_all(["img", "source", "video", "audio"]):
        src = img.get("src")
        if src:
            download_asset(src, page_url)
        srcset = img.get("srcset")
        if srcset:
            for part in srcset.split(","):
                u = part.strip().split(" ")[0]
                if u:
                    download_asset(u, page_url)
        data_src = img.get("data-src") or img.get("data-lazy-src") or img.get("data-original")
        if data_src:
            download_asset(data_src, page_url)

    for tag in soup.find_all(style=True):
        style_val = tag.get("style", "")
        matches = re.findall(r'url\(\s*[\'"]?([^\'")]+)[\'"]?\s*\)', style_val)
        for m in matches:
            download_asset(m, page_url)
            
    for style in soup.find_all("style"):
        if style.string:
            matches = re.findall(r'url\(\s*[\'"]?([^\'")]+)[\'"]?\s*\)', style.string)
            for m in matches:
                download_asset(m, page_url)

def crawl_site():
    queue.add(BASE_URL)
    discover_wp_routes()
    
    print(f"[+] Total starting URLs in queue: {len(queue)}")
    
    while queue:
        url = queue.pop()
        norm_url = normalize_url(url)
        if not norm_url or norm_url in visited_urls:
            continue
        parsed = urllib.parse.urlparse(norm_url)
        if DOMAIN not in parsed.netloc:
            continue
            
        visited_urls.add(norm_url)
        print(f"[CRAWL] Fetching: {norm_url}")
        try:
            r = session.get(norm_url, timeout=20)
            if r.status_code != 200:
                print(f"[!] HTTP {r.status_code} for {norm_url}")
                continue
                
            content_type = r.headers.get("Content-Type", "")
            if "text/html" not in content_type:
                download_asset(norm_url)
                continue
                
            soup = BeautifulSoup(r.text, "html.parser")
            html_pages[norm_url] = (r.text, soup)
            
            for a in soup.find_all("a", href=True):
                href = a["href"]
                full_href = normalize_url(href, norm_url)
                if full_href and full_href not in visited_urls:
                    p = urllib.parse.urlparse(full_href)
                    if DOMAIN in p.netloc:
                        if not any(x in p.path for x in ['/wp-json', '/feed', '/wp-admin', '/xmlrpc.php']):
                            queue.add(full_href)
                            
            extract_assets_from_html(soup, norm_url)
            
        except Exception as e:
            print(f"[ERR] Crawl failed for {norm_url}: {e}")

def rewrite_and_save_html():
    print("[+] Rewriting and saving all HTML pages for standalone offline / local hosting...")
    for page_url, (raw_html, soup) in html_pages.items():
        local_path = get_local_path_for_url(page_url, is_html=True)
        html_str = str(soup)
        html_str = html_str.replace("https://mahoganiutama.com/", "/")
        html_str = html_str.replace("http://mahoganiutama.com/", "/")
        html_str = html_str.replace("https:\\/\\/mahoganiutama.com\\/", "\\/")
        
        save_file(local_path, html_str, is_binary=False)
        print(f"[HTML] Saved page: {local_path}")

if __name__ == "__main__":
    print(f"[*] Starting Blackhole Full Cloner for {BASE_URL} -> {OUTPUT_DIR}")
    crawl_site()
    rewrite_and_save_html()
    print("[*] Cloning Complete!")
