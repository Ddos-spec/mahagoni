import os, re, urllib.parse, requests

output_dir = r"D:\code\mahagoni"
base_url = "https://mahoganiutama.com"
headers = {'User-Agent': 'Mozilla/5.0'}

missing_assets = set()

# Scan all html and css
for root, dirs, files in os.walk(output_dir):
    for f in files:
        if f.endswith('.html') or f.endswith('.css'):
            path = os.path.join(root, f)
            try:
                with open(path, 'r', encoding='utf-8', errors='ignore') as fh:
                    content = fh.read()
                    # regex for urls
                    urls = re.findall(r'(?:src|href)=[\'"]([^\'\"]+)[\'"]|url\(\s*[\'"]?([^\'\")]+)[\'"]?\s*\)', content)
                    for u1, u2 in urls:
                        u = u1 or u2
                        if not u or u.startswith('data:') or u.startswith('#') or u.startswith('javascript:') or u.startswith('mailto:') or u.startswith('tel:'):
                            continue
                        # check if internal
                        if u.startswith('/') or 'mahoganiutama.com' in u or u.startswith('wp-content') or u.startswith('wp-includes'):
                            # parse path
                            p = urllib.parse.urlparse(u).path
                            if p and p != '/' and not p.endswith('/'):
                                local_p = os.path.join(output_dir, p.lstrip('/').replace('/', os.sep))
                                if not os.path.exists(local_p):
                                    missing_assets.add(p)
            except:
                pass

print(f"Total missing asset references found: {len(missing_assets)}")
fixed = 0
for asset_path in missing_assets:
    full_remote = urllib.parse.urljoin(base_url, asset_path)
    try:
        r = requests.get(full_remote, headers=headers, timeout=10)
        if r.status_code == 200:
            local = os.path.join(output_dir, asset_path.lstrip('/').replace('/', os.sep))
            os.makedirs(os.path.dirname(local), exist_ok=True)
            with open(local, 'wb') as out_f:
                out_f.write(r.content)
            print(f"[FETCHED MISSING] {asset_path} ({len(r.content)} bytes)")
            fixed += 1
        else:
            print(f"[UNAVAILABLE REMOTE] {asset_path} -> {r.status_code}")
    except Exception as e:
        print(f"[ERR] {asset_path} -> {e}")

print(f"Total fixed: {fixed}/{len(missing_assets)}")
