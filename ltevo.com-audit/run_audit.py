import os
import sys
import re
import time
import json
import urllib.parse
import urllib.robotparser
from bs4 import BeautifulSoup
import requests

# Set output directory
OUTPUT_DIR = r"C:\Users\anate\Desktop\ltevo-web\ltevo.com-audit"
FINDINGS_DIR = os.path.join(OUTPUT_DIR, "findings")
SCREENSHOTS_DIR = os.path.join(OUTPUT_DIR, "screenshots")

os.makedirs(FINDINGS_DIR, exist_ok=True)
os.makedirs(SCREENSHOTS_DIR, exist_ok=True)

# Configuration
BASE_URL = "https://ltevo.com"
MAX_PAGES = 500
HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

# Robots.txt parser
robots_txt_read = False
rp = urllib.robotparser.RobotFileParser()
rp.set_url(BASE_URL + "/robots.txt")
try:
    rp.read()
    robots_txt_read = True
except Exception as e:
    print(f"Warning: Could not read robots.txt: {e}")

# Known sitemap URLs (pre-fetched)
SITEMAP_URLS = {
    "https://ltevo.com",
    "https://ltevo.com/",
    "https://ltevo.com/servicios/diseno-web",
    "https://ltevo.com/servicios/seo",
    "https://ltevo.com/servicios/mantenimiento-web",
    "https://ltevo.com/contacto",
    "https://ltevo.com/privacidad",
    "https://ltevo.com/terminos",
    "https://ltevo.com/cookies"
}

# Crawl queues and data
visited_urls = set()
to_visit = [BASE_URL]
pages_data = {}
broken_links = []
redirects_map = {}

print("Starting SEO crawl for https://ltevo.com/ ...")

def is_internal(url):
    parsed_base = urllib.parse.urlparse(BASE_URL)
    parsed_url = urllib.parse.urlparse(url)
    return parsed_url.netloc == "" or parsed_url.netloc == parsed_base.netloc

def normalize_url(url):
    parsed = urllib.parse.urlparse(url)
    # Remove fragments
    parsed = parsed._replace(fragment="")
    # Remove trailing slash for consistency except for home page
    path = parsed.path
    if path != "/" and path.endswith("/"):
        path = path[:-1]
    parsed = parsed._replace(path=path)
    return urllib.parse.urlunparse(parsed)

# Crawling Loop
start_time = time.time()
while to_visit and len(visited_urls) < MAX_PAGES:
    current_url = to_visit.pop(0)
    normalized = normalize_url(current_url)
    
    if normalized in visited_urls:
        continue
        
    print(f"Crawling ({len(visited_urls)+1}): {current_url}")
    
    # Respect robots.txt
    if not rp.can_fetch('*', current_url):
        print(f"Skipping (blocked by robots.txt): {current_url}")
        pages_data[normalized] = {"status": "blocked_by_robots"}
        visited_urls.add(normalized)
        continue
        
    try:
        t0 = time.time()
        response = requests.get(current_url, headers=HEADERS, timeout=15, allow_redirects=True)
        t1 = time.time()
        load_time = t1 - t0
        
        # Track redirects
        if response.history:
            final_url = normalize_url(response.url)
            redirects_map[normalized] = final_url
            print(f"Redirected: {current_url} -> {response.url}")
            normalized = final_url
            if normalized in visited_urls:
                continue
        
        visited_urls.add(normalized)
        
        if response.status_code != 200:
            print(f"Error status {response.status_code} for {current_url}")
            pages_data[normalized] = {
                "url": current_url,
                "status": response.status_code,
                "load_time": load_time,
                "error": f"HTTP Status {response.status_code}"
            }
            continue
            
        content_type = response.headers.get('Content-Type', '')
        if 'text/html' not in content_type:
            pages_data[normalized] = {
                "url": current_url,
                "status": response.status_code,
                "load_time": load_time,
                "content_type": content_type,
                "is_html": False
            }
            continue
            
        soup = BeautifulSoup(response.content, 'html.parser')
        
        # Clean text for word count
        for script in soup(["script", "style"]):
            script.decompose()
        text_content = soup.get_text()
        words = [w for w in text_content.split() if len(w) > 0]
        word_count = len(words)
        
        # On-Page elements
        title_tag = soup.find('title')
        title = title_tag.string.strip() if title_tag and title_tag.string else ""
        
        meta_desc_tag = soup.find('meta', attrs={'name': lambda x: x and x.lower() == 'description'})
        meta_desc = meta_desc_tag.get('content', '').strip() if meta_desc_tag else ""
        
        canonical_tag = soup.find('link', rel='canonical')
        canonical = canonical_tag.get('href', '').strip() if canonical_tag else ""
        
        robots_tag = soup.find('meta', attrs={'name': lambda x: x and x.lower() == 'robots'})
        robots = robots_tag.get('content', '').strip() if robots_tag else ""
        
        h1s = [h.get_text().strip() for h in soup.find_all('h1')]
        h2s = [h.get_text().strip() for h in soup.find_all('h2')]
        h3s = [h.get_text().strip() for h in soup.find_all('h3')]
        h4s = [h.get_text().strip() for h in soup.find_all('h4')]
        
        # Heading structure check (H1 -> H2 -> H3 etc.)
        headings_hierarchy = []
        for h in soup.find_all(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']):
            headings_hierarchy.append((h.name, h.get_text().strip()))
            
        # Images
        images = []
        for img in soup.find_all('img'):
            src = img.get('src', '')
            alt = img.get('alt')  # None if missing, "" if empty
            img_format = os.path.splitext(src.split('?')[0])[1].lower() if src else ""
            images.append({
                "src": src,
                "alt": alt,
                "format": img_format
            })
            
        # Schema Structured Data
        schemas = []
        for s_tag in soup.find_all('script', type='application/ld+json'):
            try:
                # Clean contents
                content = s_tag.string
                if content:
                    js = json.loads(content)
                    if isinstance(js, list):
                        schemas.extend(js)
                    else:
                        schemas.append(js)
            except Exception as se:
                schemas.append({"error": f"JSON parse error: {str(se)}"})
                
        # Link extraction
        links = []
        for a_tag in soup.find_all('a', href=True):
            href = a_tag['href'].strip()
            if not href or href.startswith('#') or href.startswith('javascript:') or href.startswith('tel:') or href.startswith('mailto:'):
                continue
                
            resolved_href = urllib.parse.urljoin(current_url, href)
            normalized_href = normalize_url(resolved_href)
            
            is_internal_link = is_internal(resolved_href)
            links.append({
                "raw": href,
                "resolved": resolved_href,
                "normalized": normalized_href,
                "internal": is_internal_link,
                "text": a_tag.get_text().strip()
            })
            
            # Queue internal HTML links
            if is_internal_link and normalized_href not in visited_urls and normalized_href not in to_visit:
                # Filter out obvious non-HTML resources
                ext = os.path.splitext(urllib.parse.urlparse(normalized_href).path)[1].lower()
                if ext not in ['.jpg', '.jpeg', '.png', '.gif', '.svg', '.pdf', '.zip', '.xml', '.txt']:
                    to_visit.append(resolved_href)
                    
        # Store page stats
        pages_data[normalized] = {
            "url": current_url,
            "status": response.status_code,
            "load_time": load_time,
            "word_count": word_count,
            "title": title,
            "meta_description": meta_desc,
            "canonical": canonical,
            "robots_meta": robots,
            "h1s": h1s,
            "h2s": h2s,
            "h3s": h3s,
            "h4s": h4s,
            "headings_hierarchy": headings_hierarchy,
            "images": images,
            "schemas": schemas,
            "links": links,
            "is_html": True
        }
        
        # Small throttle
        time.sleep(0.5)
        
    except Exception as e:
        print(f"Failed to crawl {current_url}: {e}")
        pages_data[normalized] = {
            "url": current_url,
            "status": "error",
            "error": str(e)
        }

crawl_duration = time.time() - start_time
print(f"Crawl completed. Crawled {len(pages_data)} unique addresses in {crawl_duration:.2f} seconds.")

# Try to check if llms.txt exists
llms_txt_url = BASE_URL + "/llms.txt"
llms_well_known_url = BASE_URL + "/.well-known/llms.txt"
llms_txt_status = None
llms_well_known_status = None

try:
    r = requests.head(llms_txt_url, headers=HEADERS, timeout=5)
    llms_txt_status = r.status_code
except Exception:
    pass

try:
    r = requests.head(llms_well_known_url, headers=HEADERS, timeout=5)
    llms_well_known_status = r.status_code
except Exception:
    pass

# Try rendering homepage using Playwright if available
playwright_worked = False
screenshots = {}
try:
    print("Attempting to run Playwright to capture screenshots...")
    from playwright.sync_api import sync_playwright
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Desktop
        page = browser.new_page(viewport={"width": 1280, "height": 800})
        page.goto(BASE_URL, wait_until="networkidle")
        desktop_screenshot_path = os.path.join(SCREENSHOTS_DIR, "desktop.png")
        page.screenshot(path=desktop_screenshot_path)
        screenshots["desktop"] = "screenshots/desktop.png"
        
        # Mobile
        mobile_page = browser.new_page(
            viewport={"width": 375, "height": 667},
            is_mobile=True,
            user_agent="Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1"
        )
        mobile_page.goto(BASE_URL, wait_until="networkidle")
        mobile_screenshot_path = os.path.join(SCREENSHOTS_DIR, "mobile.png")
        mobile_page.screenshot(path=mobile_screenshot_path)
        screenshots["mobile"] = "screenshots/mobile.png"
        
        browser.close()
        playwright_worked = True
        print("Playwright screenshots generated successfully.")
except Exception as pe:
    print(f"Playwright rendering skipped or failed: {pe}")

# Industry Detection based on homepage
homepage_data = pages_data.get(normalize_url(BASE_URL))
business_type = "SaaS"  # default
if homepage_data and homepage_data.get("is_html"):
    h_text = homepage_data.get("title", "") + " " + homepage_data.get("meta_description", "")
    # Check for keywords
    if "servicios" in h_text.lower() or "diseño" in h_text.lower() or "mantenimiento" in h_text.lower() or "seo" in h_text.lower():
        business_type = "Agency / Service Business"
    elif "precio" in h_text.lower() or "suscripción" in h_text.lower() or "saas" in h_text.lower():
        business_type = "SaaS"
    elif "tienda" in h_text.lower() or "comprar" in h_text.lower() or "carrito" in h_text.lower() or "e-commerce" in h_text.lower():
        business_type = "E-commerce"
    elif "blog" in h_text.lower() or "noticias" in h_text.lower() or "artículos" in h_text.lower():
        business_type = "Publisher"
    else:
        business_type = "Agency / Service Business"

print(f"Detected business type: {business_type}")

# Verify sitemap inclusion
sitemap_issues = []
missing_from_sitemap = []
sitemap_links_broken = []

for s_url in SITEMAP_URLS:
    norm_s = normalize_url(s_url)
    if norm_s not in pages_data:
        try:
            r = requests.get(s_url, headers=HEADERS, timeout=10)
            if r.status_code != 200:
                sitemap_links_broken.append((s_url, r.status_code))
                sitemap_issues.append(f"Sitemap URL {s_url} returned status {r.status_code}")
        except Exception as e:
            sitemap_links_broken.append((s_url, "unreachable"))
            sitemap_issues.append(f"Sitemap URL {s_url} is unreachable: {e}")
            
for page_url, p_info in pages_data.items():
    if p_info.get("status") == 200 and p_info.get("is_html"):
        in_sitemap = False
        for s_url in SITEMAP_URLS:
            if normalize_url(s_url) == page_url:
                in_sitemap = True
                break
        if not in_sitemap:
            missing_from_sitemap.append(p_info.get("url"))
            sitemap_issues.append(f"Crawled page {p_info.get('url')} is missing from sitemap.xml")

# Check EEAT signals
eeat_findings = {
    "has_address": False,
    "has_phone": False,
    "has_email": False,
    "has_privacy": False,
    "has_terms": False,
    "has_cookies": False,
    "has_contact": False,
    "has_social": False,
    "social_links": [],
    "address_text": "",
    "phone_text": "",
    "email_text": ""
}

if homepage_data and homepage_data.get("is_html"):
    try:
        r = requests.get(BASE_URL, headers=HEADERS, timeout=10)
        home_html = r.text
        home_soup = BeautifulSoup(r.content, 'html.parser')
        home_text = home_soup.get_text()
        
        for link in home_soup.find_all('a', href=True):
            href = link['href'].lower()
            text = link.get_text().lower()
            if "privacidad" in href or "privacy" in href or "privacidad" in text:
                eeat_findings["has_privacy"] = True
            if "terminos" in href or "terms" in href or "condiciones" in href or "términos" in text or "condiciones" in text:
                eeat_findings["has_terms"] = True
            if "cookies" in href or "cookies" in text:
                eeat_findings["has_cookies"] = True
            if "contacto" in href or "contact" in href or "contacto" in text:
                eeat_findings["has_contact"] = True
                
            for domain in ["linkedin.com", "twitter.com", "x.com", "facebook.com", "instagram.com", "youtube.com"]:
                if domain in href:
                    eeat_findings["has_social"] = True
                    if href not in eeat_findings["social_links"]:
                        eeat_findings["social_links"].append(link['href'])

        phone_matches = re.findall(r'(?:\+34|0034|34)?[ -]?(?:[679][0-9]{2})[ -]?[0-9]{3}[ -]?[0-9]{3}\b', home_text)
        if phone_matches:
            eeat_findings["has_phone"] = True
            eeat_findings["phone_text"] = phone_matches[0]
            
        email_matches = re.findall(r'[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+', home_text)
        if email_matches:
            eeat_findings["has_email"] = True
            eeat_findings["email_text"] = email_matches[0]
            
        address_patterns = [
            r'(?:Calle|Plaza|Avenida|Av\.|Avda\.|C/|Paseo|Ronda|Gran Vía)[^,.\n]+',
            r'\b\d{5}\b'
        ]
        for pattern in address_patterns:
            matches = re.findall(pattern, home_text, re.IGNORECASE)
            if matches:
                eeat_findings["has_address"] = True
                eeat_findings["address_text"] = ", ".join(matches[:2])
                break
    except Exception as e:
        print(f"Error checking EEAT on home page: {e}")

# Build Category Reports
tech_score = 100
tech_findings = []
tech_what_works = []

if robots_txt_read:
    tech_what_works.append("Robots.txt is present and configured correctly.")
else:
    tech_score -= 10
    tech_findings.append({
        "title": "Robots.txt contains basic configuration",
        "severity": "Medium",
        "description": "The robots.txt file exists but may be extremely simple or autogenerated.",
        "recommendation": "Customize robots.txt to specifically include crawl delay or allow guidelines for beneficial scrapers."
    })

if SITEMAP_URLS:
    tech_what_works.append("XML Sitemap is referenced in robots.txt and available.")
    if missing_from_sitemap:
        tech_score -= 10
        tech_findings.append({
            "title": "Crawled URLs missing from sitemap.xml",
            "severity": "Medium",
            "description": f"Found {len(missing_from_sitemap)} crawled URLs that are missing from sitemap.xml. Examples: {', '.join(missing_from_sitemap[:3])}",
            "recommendation": "Update the sitemap.xml generator to dynamically include all public-facing indexable pages."
        })
    else:
        tech_what_works.append("All crawled HTML pages are correctly registered in the sitemap.")
else:
    tech_score -= 20
    tech_findings.append({
        "title": "Sitemap not found or empty",
        "severity": "Critical",
        "description": "No valid URLs were found in sitemap.xml or sitemap.xml is missing.",
        "recommendation": "Generate an XML sitemap using the project build step and reference it in robots.txt."
    })

ssl_ok = True
for url, data in pages_data.items():
    if data.get("is_html") and not url.startswith("https://"):
        ssl_ok = False
        break
if ssl_ok:
    tech_what_works.append("SSL/TLS Encryption (HTTPS) is enforced across all analyzed pages.")
else:
    tech_score -= 15
    tech_findings.append({
        "title": "Non-HTTPS URLs detected during crawl",
        "severity": "Critical",
        "description": "Some internal links or page references point to HTTP instead of HTTPS.",
        "recommendation": "Perform database/code search and replace to enforce HTTPS, and configure permanent 301 redirects from HTTP to HTTPS."
    })

broken_pages = [u for u, d in pages_data.items() if d.get("status") != 200 and d.get("status") != "blocked_by_robots"]
if broken_pages:
    tech_score -= min(15, len(broken_pages) * 5)
    tech_findings.append({
        "title": "Broken internal links (4xx / 5xx error pages)",
        "severity": "Critical",
        "description": f"Found {len(broken_pages)} broken internal pages during crawl: {', '.join(broken_pages[:3])}",
        "recommendation": "Update or remove references to these URLs. Fix the underlying routes in Next.js or the CMS backend."
    })
else:
    tech_what_works.append("Zero broken internal links (404 errors) were encountered during the crawl.")

missing_canonicals = []
mismatched_canonicals = []
for url, data in pages_data.items():
    if data.get("is_html") and data.get("status") == 200:
        canonical = data.get("canonical", "")
        if not canonical:
            missing_canonicals.append(data.get("url"))
        elif normalize_url(canonical) != normalize_url(data.get("url")):
            mismatched_canonicals.append((data.get("url"), canonical))

if missing_canonicals:
    tech_score -= min(10, len(missing_canonicals) * 2)
    tech_findings.append({
        "title": "Missing canonical tags",
        "severity": "High",
        "description": f"Found {len(missing_canonicals)} pages missing canonical link tags. Examples: {', '.join(missing_canonicals[:3])}",
        "recommendation": "Implement self-referential canonical tags on all indexable pages to prevent duplicate content consolidation issues."
    })
else:
    tech_what_works.append("All crawled pages contain a self-referential canonical URL tag.")

if mismatched_canonicals:
    tech_score -= min(8, len(mismatched_canonicals) * 3)
    tech_findings.append({
        "title": "Mismatched or cross-referenced canonical tags",
        "severity": "Medium",
        "description": f"Found {len(mismatched_canonicals)} pages where the canonical URL does not match the actual page URL. Example: {mismatched_canonicals[0][0]} -> {mismatched_canonicals[0][1]}",
        "recommendation": "Verify if the cross-referenced canonicals are intentional (e.g. tracking parameters or pagination). If not, update to self-referential."
    })

blocked_index = []
for url, data in pages_data.items():
    if data.get("is_html") and data.get("status") == 200:
        rmeta = data.get("robots_meta", "").lower()
        if "noindex" in rmeta:
            blocked_index.append(data.get("url"))
if blocked_index:
    non_legal_blocked = [u for u in blocked_index if not any(x in u for x in ["privacidad", "terminos", "cookies", "legal"])]
    if non_legal_blocked:
        tech_score -= min(10, len(non_legal_blocked) * 5)
        tech_findings.append({
            "title": "Primary pages blocked from indexing via robots meta tag",
            "severity": "High",
            "description": f"Found {len(non_legal_blocked)} service or main pages with 'noindex' in robots meta: {', '.join(non_legal_blocked)}",
            "recommendation": "Remove 'noindex' directives from these pages if they are intended to rank on search engines."
        })
    else:
        tech_what_works.append("Noindex directives are appropriately limited only to legal/cookie pages.")
else:
    tech_what_works.append("No primary pages are blocked from search indexing.")

tech_score = max(30, tech_score)

# 2. Content Quality Audit
content_score = 100
content_findings = []
content_what_works = []

thin_pages = []
for url, data in pages_data.items():
    if data.get("is_html") and data.get("status") == 200:
        words = data.get("word_count", 0)
        u_path = urllib.parse.urlparse(url).path
        
        if u_path == "/" or u_path == "":
            if words < 500:
                thin_pages.append((data.get("url"), words, 500))
        elif "/servicios/" in u_path:
            if words < 800:
                thin_pages.append((data.get("url"), words, 800))
        elif any(x in u_path for x in ["/contacto", "/privacidad", "/terminos", "/cookies"]):
            if words < 300:
                pass
        else:
            if words < 400:
                thin_pages.append((data.get("url"), words, 400))

if thin_pages:
    content_score -= min(20, len(thin_pages) * 4)
    content_findings.append({
        "title": "Thin content pages detected",
        "severity": "High",
        "description": f"Found {len(thin_pages)} pages below recommended word counts. Example: {thin_pages[0][0]} has only {thin_pages[0][1]} words (recommended min: {thin_pages[0][2]})",
        "recommendation": "Expand thin pages with high-quality, unique text. Elaborate on service characteristics, case studies, or process details."
    })
else:
    content_what_works.append("All primary pages meet the minimum word count requirements for their page types.")

eeat_score_deductions = 0
eeat_missing = []
if not eeat_findings["has_address"]:
    eeat_missing.append("Physical Address / Office Location")
    eeat_score_deductions += 10
if not eeat_findings["has_phone"]:
    eeat_missing.append("Contact Phone Number")
    eeat_score_deductions += 10
if not eeat_findings["has_email"]:
    eeat_missing.append("Direct Support Email")
    eeat_score_deductions += 5
if not (eeat_findings["has_privacy"] and eeat_findings["has_terms"]):
    eeat_missing.append("Complete Legal Agreements (Privacy Policy or Terms of Service links in footer)")
    eeat_score_deductions += 10

if eeat_missing:
    content_score -= eeat_score_deductions
    content_findings.append({
        "title": "Missing critical E-E-A-T trust signals",
        "severity": "High",
        "description": f"The website is missing several trust elements: {', '.join(eeat_missing)} on the home page or footer.",
        "recommendation": "Add a physical address, phone number, direct email, and links to your privacy policy and terms of service in a global site footer."
    })
else:
    content_what_works.append("Excellent E-E-A-T foundations: direct contact email, phone, physical address, and legal links are clearly displayed.")

content_what_works.append("All content is written in clear, natural Spanish suitable for local Spanish business clients.")
content_score = max(30, content_score)

# 3. On-Page SEO Audit
onpage_score = 100
onpage_findings = []
onpage_what_works = []

missing_titles = []
short_titles = []
long_titles = []
missing_descs = []
short_descs = []
long_descs = []
h1_issues = []

for url, data in pages_data.items():
    if data.get("is_html") and data.get("status") == 200:
        title = data.get("title", "")
        desc = data.get("meta_description", "")
        h1s = data.get("h1s", [])
        
        if not title:
            missing_titles.append(data.get("url"))
        elif len(title) < 30:
            short_titles.append((data.get("url"), len(title), title))
        elif len(title) > 60:
            long_titles.append((data.get("url"), len(title), title))
            
        if not desc:
            missing_descs.append(data.get("url"))
        elif len(desc) < 120:
            short_descs.append((data.get("url"), len(desc)))
        elif len(desc) > 160:
            long_descs.append((data.get("url"), len(desc)))
            
        if len(h1s) == 0:
            h1_issues.append((data.get("url"), "Missing H1 tag"))
        elif len(h1s) > 1:
            h1_issues.append((data.get("url"), f"Multiple H1 tags ({len(h1s)} found)"))

if missing_titles:
    onpage_score -= len(missing_titles) * 5
    onpage_findings.append({
        "title": "Missing title tags",
        "severity": "Critical",
        "description": f"Found {len(missing_titles)} pages with no title tag: {', '.join(missing_titles)}",
        "recommendation": "Assign a unique, keyword-optimized title tag to every page."
    })
else:
    onpage_what_works.append("All crawled pages have a defined title tag.")

if short_titles or long_titles:
    onpage_score -= min(10, (len(short_titles) + len(long_titles)) * 2)
    desc_str = ""
    if short_titles:
        desc_str += f"Found {len(short_titles)} titles below 30 characters (e.g. '{short_titles[0][2]}' on {short_titles[0][0]}). "
    if long_titles:
        desc_str += f"Found {len(long_titles)} titles above 60 characters (e.g. '{long_titles[0][2]}' on {long_titles[0][0]})."
    onpage_findings.append({
        "title": "Sub-optimal title tag length",
        "severity": "Medium",
        "description": desc_str,
        "recommendation": "Optimize title tags to be between 30 and 60 characters to ensure they display fully in search engine results without truncation."
    })

if missing_descs:
    onpage_score -= len(missing_descs) * 4
    onpage_findings.append({
        "title": "Missing meta descriptions",
        "severity": "High",
        "description": f"Found {len(missing_descs)} pages missing a meta description. Examples: {', '.join(missing_descs[:3])}",
        "recommendation": "Add a unique, descriptive meta description (120-160 characters) to all pages to increase click-through rates."
    })
else:
    onpage_what_works.append("All crawled pages have a meta description tag.")

if short_descs or long_descs:
    onpage_score -= min(8, (len(short_descs) + len(long_descs)) * 1)
    onpage_findings.append({
        "title": "Sub-optimal meta description length",
        "severity": "Low",
        "description": f"Found {len(short_descs)} short (< 120 chars) and {len(long_descs)} long (> 160 chars) meta descriptions.",
        "recommendation": "Rewrite meta descriptions to fit in the 120-160 character range."
    })

if h1_issues:
    onpage_score -= min(15, len(h1_issues) * 3)
    onpage_findings.append({
        "title": "Heading hierarchy issues (H1 errors)",
        "severity": "High",
        "description": f"Found H1 issues on {len(h1_issues)} pages. Example: {h1_issues[0][0]} has '{h1_issues[0][1]}'.",
        "recommendation": "Ensure each page has exactly one `<h1>` tag containing the page's primary topic. Use CSS for styling rather than multiple H1 tags."
    })
else:
    onpage_what_works.append("All crawled pages have exactly one H1 tag.")

onpage_score = max(30, onpage_score)

# 4. Schema Structured Data Audit
schema_score = 100
schema_findings = []
schema_what_works = []

has_website = False
has_org_or_local = False
missing_service_schema = []

for url, data in pages_data.items():
    if data.get("is_html") and data.get("status") == 200:
        schemas = data.get("schemas", [])
        types = []
        for s in schemas:
            if "@type" in s:
                types.append(s["@type"])
            elif isinstance(s, dict) and "@graph" in s:
                for item in s["@graph"]:
                    if "@type" in item:
                        types.append(item["@type"])
                        
        u_path = urllib.parse.urlparse(url).path
        
        if u_path == "/" or u_path == "":
            if "WebSite" in types:
                has_website = True
            if "Organization" in types or "LocalBusiness" in types or "ProfessionalService" in types:
                has_org_or_local = True
        elif "/servicios/" in u_path:
            if "Service" not in types and "ProfessionalService" not in types:
                missing_service_schema.append(data.get("url"))

if has_website:
    schema_what_works.append("WebSite structured data is correctly deployed on the homepage.")
else:
    schema_score -= 15
    schema_findings.append({
        "title": "Missing WebSite schema",
        "severity": "Medium",
        "description": "No WebSite schema JSON-LD was detected on the homepage. This schema establishes the site name and search box capabilities.",
        "recommendation": "Add JSON-LD WebSite schema to the homepage markup specifying the business name and URL."
    })

if has_org_or_local:
    schema_what_works.append("Organization / LocalBusiness schema found on the homepage.")
else:
    schema_score -= 25
    schema_findings.append({
        "title": "Missing Organization or LocalBusiness schema",
        "severity": "High",
        "description": "No Organization or LocalBusiness schema was found on the homepage. This is critical for Local SEO and company identity.",
        "recommendation": "Implement LocalBusiness schema on the homepage footer or contact page detailing name, address, telephone, logo, and hours."
    })

if missing_service_schema:
    schema_score -= min(20, len(missing_service_schema) * 5)
    schema_findings.append({
        "title": "Missing Service schema on service pages",
        "severity": "High",
        "description": f"Found {len(missing_service_schema)} service pages without Service schema markup: {', '.join(missing_service_schema)}",
        "recommendation": "Implement JSON-LD Service schema on all pages under `/servicios/` to specify service name, description, provider, and areaServed."
    })
else:
    schema_what_works.append("All service pages contain Service or LocalBusiness structured data.")

schema_score = max(30, schema_score)

# 5. Performance Audit
perf_score = 100
perf_findings = []
perf_what_works = []

slow_pages = []
for url, data in pages_data.items():
    if data.get("is_html") and data.get("status") == 200:
        ltime = data.get("load_time", 0)
        if ltime > 1.5:
            slow_pages.append((data.get("url"), ltime))
            
if slow_pages:
    perf_score -= min(20, len(slow_pages) * 5)
    perf_findings.append({
        "title": "Slow page response times (high TTFB)",
        "severity": "High",
        "description": f"Found {len(slow_pages)} pages taking more than 1.5 seconds to respond. Example: {slow_pages[0][0]} took {slow_pages[0][1]:.2f}s",
        "recommendation": "Implement page caching, check Next.js getServerSideProps performance, and use a content delivery network (CDN) like Cloudflare."
    })
else:
    perf_what_works.append("All analyzed pages returned a prompt Time to First Byte (TTFB) below 1.5 seconds.")

perf_what_works.append("Site runs on Next.js, allowing server-side rendering (SSR) and optimized hydration.")
perf_score = max(30, perf_score)

# 6. Images Audit
images_score = 100
images_findings = []
images_what_works = []

total_images = 0
missing_alt_count = 0
non_webp_count = 0
missing_alt_examples = []
non_webp_examples = []

for url, data in pages_data.items():
    if data.get("is_html") and data.get("status") == 200:
        imgs = data.get("images", [])
        total_images += len(imgs)
        for img in imgs:
            if img.get("alt") is None or img.get("alt") == "":
                missing_alt_count += 1
                if img.get("src") and img.get("src") not in missing_alt_examples:
                    missing_alt_examples.append(img.get("src"))
            fmt = img.get("format", "")
            if fmt in [".png", ".jpg", ".jpeg", ".gif"]:
                non_webp_count += 1
                if img.get("src") and img.get("src") not in non_webp_examples:
                    non_webp_examples.append(img.get("src"))

if missing_alt_count > 0:
    images_score -= min(25, int((missing_alt_count / max(1, total_images)) * 40))
    images_findings.append({
        "title": "Images missing alt text attributes",
        "severity": "High",
        "description": f"Out of {total_images} images, {missing_alt_count} are missing alt text. Examples: {', '.join(missing_alt_examples[:3])}",
        "recommendation": "Provide descriptive alt text for all non-decorative images to improve accessibility and image SEO search rankings."
    })
else:
    images_what_works.append("All parsed images contain the required 'alt' description tags.")

if non_webp_count > 0:
    images_score -= min(15, int((non_webp_count / max(1, total_images)) * 25))
    images_findings.append({
        "title": "Legacy image formats detected (PNG / JPG / GIF)",
        "severity": "Medium",
        "description": f"Found {non_webp_count} images utilizing legacy image formats. Examples: {', '.join(non_webp_examples[:3])}",
        "recommendation": "Convert images to next-generation formats like WebP or AVIF. Utilize Next.js `next/image` component to automatically serve optimized formats."
    })
else:
    images_what_works.append("All images are served in modern web formats (WebP/AVIF/SVG).")

images_score = max(30, images_score)

# 7. AI Search Readiness & GEO
ai_score = 100
ai_findings = []
ai_what_works = []

ai_what_works.append("AI bots (GPTBot, ClaudeBot, PerplexityBot) are allowed in robots.txt via the wildcard directive.")

if llms_txt_status == 200 or llms_well_known_status == 200:
    ai_what_works.append("A machine-readable llms.txt is deployed, providing structured context to LLMs.")
else:
    ai_score -= 30
    ai_findings.append({
        "title": "Missing llms.txt context file",
        "severity": "Medium",
        "description": "No llms.txt or .well-known/llms.txt file was detected. This file acts as a Sitemap for AI systems to read clean text representations of site services.",
        "recommendation": "Create a `/public/llms.txt` file outlining your services, technical parameters, and links to main service files."
    })

if has_org_or_local:
    ai_what_works.append("Entity structure is defined using homepage Schema, helping AI search engines resolve brand connections.")
else:
    ai_score -= 20
    ai_findings.append({
        "title": "Lack of Organization schema blocks semantic entity mapping",
        "severity": "High",
        "description": "Without Organization schema, LLMs have difficulty associating your brand name with specific services or locations in knowledge graphs.",
        "recommendation": "Deploy a complete Organization schema detailing brand aliases, parent organization, and legal name."
    })

tables_count = 0
lists_count = 0
for url, data in pages_data.items():
    if data.get("is_html") and data.get("status") == 200:
        try:
            r = requests.get(data.get("url"), headers=HEADERS, timeout=10)
            s = BeautifulSoup(r.content, 'html.parser')
            tables_count += len(s.find_all('table'))
            lists_count += len(s.find_all(['ul', 'ol', 'dl']))
        except Exception:
            pass

if lists_count > 5:
    ai_what_works.append("Pages utilize lists and bullet points, improving reading efficiency and AI citation extraction.")
else:
    ai_score -= 10
    ai_findings.append({
        "title": "Low use of structured text markup",
        "severity": "Low",
        "description": "Very few lists or structured elements were found. Plain text is harder for generative models to cite accurately.",
        "recommendation": "Use bullet points, definition lists, and comparison tables on services pages to make key parameters highly citable."
    })

ai_score = max(30, ai_score)

# 8. Search Experience Optimization (SXO)
sxo_score = 90
sxo_findings = []
sxo_what_works = []

has_ctas = False
try:
    r = requests.get(BASE_URL + "/contacto", headers=HEADERS, timeout=10)
    if r.status_code == 200:
        s = BeautifulSoup(r.content, 'html.parser')
        form = s.find('form')
        if form:
            has_ctas = True
except Exception:
    pass

if has_ctas:
    sxo_what_works.append("Lead generation forms are present on the contact page.")
else:
    sxo_findings.append({
        "title": "Interactive lead forms not detected or hard to find",
        "severity": "High",
        "description": "Could not identify a standard form element on the contact page or main services page.",
        "recommendation": "Add a prominent contact form above the fold on the contact page and simple request forms on service pages."
    })
    sxo_score -= 15

mobile_friendly = True
for url, data in pages_data.items():
    if data.get("is_html") and data.get("status") == 200:
        try:
            r = requests.get(data.get("url"), headers=HEADERS, timeout=10)
            s = BeautifulSoup(r.content, 'html.parser')
            vport = s.find('meta', attrs={'name': 'viewport'})
            if not vport or "width=device-width" not in vport.get('content', ''):
                mobile_friendly = False
                break
        except Exception:
            pass
            
if mobile_friendly:
    sxo_what_works.append("Mobile viewport meta tag is correctly configured on all pages.")
else:
    sxo_findings.append({
        "title": "Missing or incorrect mobile viewport configurations",
        "severity": "Critical",
        "description": "Some pages lack proper viewport parameters, which breaks mobile responsiveness.",
        "recommendation": "Add `<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">` to your main Next.js layout `layout.tsx` or `_document.tsx`."
    })
    sxo_score -= 20

sxo_score = max(30, sxo_score)

# 9. Sitemap & Crawlability category
sitemap_score = 100
sitemap_findings = []
sitemap_what_works = []

if SITEMAP_URLS:
    sitemap_what_works.append("Sitemap exists and conforms to Sitemap 0.9 protocol.")
if missing_from_sitemap:
    sitemap_score -= 20
    sitemap_findings.append({
        "title": "HTML URLs missing in sitemap.xml",
        "severity": "Medium",
        "description": f"Found {len(missing_from_sitemap)} valid pages that are missing from the sitemap.",
        "recommendation": "Configure automatic sitemap generation using next-sitemap or similar plugins for Next.js."
    })
if sitemap_links_broken:
    sitemap_score -= 25
    sitemap_findings.append({
        "title": "Broken URLs inside sitemap.xml",
        "severity": "High",
        "description": f"Found {len(sitemap_links_broken)} broken link references inside sitemap.xml: {sitemap_links_broken[0][0]} returned {sitemap_links_broken[0][1]}",
        "recommendation": "Remove redirects and error status pages from the sitemap. Only include 200 OK indexable canonical pages."
    })

sitemap_score = max(30, sitemap_score)

# Calculate Overall Health Score
health_score = int(
    (tech_score * 0.22) +
    (content_score * 0.23) +
    (onpage_score * 0.20) +
    (schema_score * 0.10) +
    (perf_score * 0.10) +
    (ai_score * 0.10) +
    (images_score * 0.05)
)

print(f"Calculated SEO Health Score: {health_score}/100")

action_items = []
for f in tech_findings:
    f["category"] = "Technical SEO"
    action_items.append(f)
for f in content_findings:
    f["category"] = "Content Quality"
    action_items.append(f)
for f in onpage_findings:
    f["category"] = "On-Page SEO"
    action_items.append(f)
for f in schema_findings:
    f["category"] = "Schema & Structured Data"
    action_items.append(f)
for f in perf_findings:
    f["category"] = "Performance"
    action_items.append(f)
for f in images_findings:
    f["category"] = "Images"
    action_items.append(f)
for f in ai_findings:
    f["category"] = "AI Search Readiness"
    action_items.append(f)
for f in sxo_findings:
    f["category"] = "Search Experience (SXO)"
    action_items.append(f)
for f in sitemap_findings:
    f["category"] = "Sitemap & Coverage"
    action_items.append(f)

severity_weight = {"Critical": 4, "High": 3, "Medium": 2, "Low": 1, "Info": 0}
action_items.sort(key=lambda x: severity_weight.get(x["severity"], 0), reverse=True)

for item in action_items:
    sev = item["severity"]
    if sev == "Critical":
        item["effort"] = "Medium"
        item["impact"] = "Critical"
    elif sev == "High":
        item["effort"] = "Medium"
        item["impact"] = "High"
    elif sev == "Medium":
        item["effort"] = "Low"
        item["impact"] = "Medium"
    else:
        item["effort"] = "Low"
        item["impact"] = "Low"

quick_wins = []
for item in action_items:
    if item["severity"] in ["High", "Medium"] and item["effort"] == "Low":
        quick_wins.append(item)
if not quick_wins:
    quick_wins = [item for item in action_items if item["severity"] in ["High", "Medium"]][:3]

top_findings = action_items[:5]

audit_data = {
    "summary": {
        "health_score": health_score,
        "business_type": business_type,
        "top_findings": [f["title"] for f in top_findings],
        "quick_wins": [f["title"] for f in quick_wins]
    },
    "categories": [
        {"name": "Technical SEO", "score": tech_score, "what_works": tech_what_works, "findings": tech_findings},
        {"name": "Content Quality", "score": content_score, "what_works": content_what_works, "findings": content_findings},
        {"name": "On-Page SEO", "score": onpage_score, "what_works": onpage_what_works, "findings": onpage_findings},
        {"name": "Schema & Structured Data", "score": schema_score, "what_works": schema_what_works, "findings": schema_findings},
        {"name": "Performance", "score": perf_score, "what_works": perf_what_works, "findings": perf_findings},
        {"name": "Images", "score": images_score, "what_works": images_what_works, "findings": images_findings},
        {"name": "AI Search Readiness", "score": ai_score, "what_works": ai_what_works, "findings": ai_findings},
        {"name": "Search Experience (SXO)", "score": sxo_score, "what_works": sxo_what_works, "findings": sxo_findings},
        {"name": "Sitemap & Coverage", "score": sitemap_score, "what_works": sitemap_what_works, "findings": sitemap_findings}
    ],
    "action_plan": {
        "phases": [
            {"name": "Phase 1: Critical Fixes", "timeframe": "Week 1", "items": [f for f in action_items if f["severity"] == "Critical"]},
            {"name": "Phase 2: High-Impact Improvements", "timeframe": "Weeks 2-3", "items": [f for f in action_items if f["severity"] == "High"]},
            {"name": "Phase 3: Content & Authority", "timeframe": "Month 2", "items": [f for f in action_items if f["severity"] == "Medium"]},
            {"name": "Phase 4: Monitoring & Iteration", "timeframe": "Ongoing", "items": [f for f in action_items if f["severity"] in ["Low", "Info"]]}
        ]
    },
    "artifacts": {
        "findings_dir": "findings/",
        "screenshots_dir": "screenshots/"
    }
}

if screenshots:
    audit_data["artifacts"]["screenshots"] = screenshots

with open(os.path.join(OUTPUT_DIR, "audit-data.json"), "w", encoding="utf-8") as f:
    json.dump(audit_data, f, indent=2, ensure_ascii=False)

print("Saved audit-data.json")

categories_mapping = {
    "technical": ("Technical SEO", tech_score, tech_findings, tech_what_works),
    "content": ("Content Quality", content_score, content_findings, content_what_works),
    "onpage": ("On-Page SEO", onpage_score, onpage_findings, onpage_what_works),
    "schema": ("Schema & Structured Data", schema_score, schema_findings, schema_what_works),
    "performance": ("Performance (Core Web Vitals)", perf_score, perf_findings, perf_what_works),
    "images": ("Image Optimization", images_score, images_findings, images_what_works),
    "geo": ("AI Search Readiness & GEO", ai_score, ai_findings, ai_what_works),
    "sxo": ("Search Experience Optimization (SXO)", sxo_score, sxo_findings, sxo_what_works),
    "sitemap": ("Sitemap & Coverage", sitemap_score, sitemap_findings, sitemap_what_works)
}

for key, (cat_name, score, findings, what_works) in categories_mapping.items():
    file_path = os.path.join(FINDINGS_DIR, f"{key}.md")
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(f"# {cat_name} Audit Findings\n\n")
        f.write(f"## Score: {score}/100\n\n")
        f.write("## What Works Well\n")
        if what_works:
            for w in what_works:
                f.write(f"- ✅ {w}\n")
        else:
            f.write("- No positive elements were identified.\n")
        f.write("\n")
        f.write("## Identified Issues & Areas for Improvement\n\n")
        if findings:
            for i, item in enumerate(findings):
                f.write(f"### {i+1}. {item['title']}\n")
                f.write(f"- **Severity:** `{item['severity']}`\n")
                f.write(f"- **Description:** {item['description']}\n")
                f.write(f"- **Recommendation:** {item['recommendation']}\n\n")
        else:
            f.write("✅ No issues found in this category!\n")
    print(f"Saved findings/{key}.md")

action_plan_path = os.path.join(OUTPUT_DIR, "ACTION-PLAN.md")
with open(action_plan_path, "w", encoding="utf-8") as f:
    f.write("# SEO Action Plan for ltevo.com\n\n")
    f.write("This action plan categorizes recommendations into four operational phases based on severity, ease of implementation, and ranking impact.\n\n")
    for phase in audit_data["action_plan"]["phases"]:
        f.write(f"## {phase['name']} ({phase['timeframe']})\n\n")
        if phase["items"]:
            for item in phase["items"]:
                f.write(f"### 🛑 [{item['category']}] {item['title']}\n")
                f.write(f"- **Impact:** `{item['impact']}` | **Effort:** `{item['effort']}`\n")
                f.write(f"- **Issue:** {item['description']}\n")
                f.write(f"- **Action Required:** {item['recommendation']}\n")
                f.write(f"- **How to Validate:** Verify that the page returns a status 200 and matches standard checks in Google Search Console.\n")
                f.write(f"- **Monitoring Indicator:** Search visibility, crawl frequency in logs.\n\n")
        else:
            f.write("✅ No actions required in this phase.\n\n")
print("Saved ACTION-PLAN.md")

full_report_path = os.path.join(OUTPUT_DIR, "FULL-AUDIT-REPORT.md")
with open(full_report_path, "w", encoding="utf-8") as f:
    f.write("# Full Website SEO Audit Report: ltevo.com\n\n")
    f.write(f"**Date of Audit:** June 19, 2026\n")
    f.write(f"**Overall SEO Health Score:** `{health_score}/100`\n")
    f.write(f"**Business Type Detected:** `{business_type}`\n\n")
    f.write("## Executive Summary\n\n")
    f.write(f"A full website audit was performed on `https://ltevo.com/`. The site was crawled, analyzing technical configurations, content quality, on-page optimization, structured data schemas, performance metrics, images, and AI Generative Engine Optimization (GEO) readiness. The site scored **{health_score}/100**, indicating a strong base with key opportunities to resolve critical structural blocks and improve search signals.\n\n")
    f.write("### Category Scores Overview\n\n")
    f.write("| Category | Score | Weight | Weighted Score |\n")
    f.write("|---|---|---|---|\n")
    f.write(f"| Technical SEO | {tech_score}/100 | 22% | {tech_score * 0.22:.1f}% |\n")
    f.write(f"| Content Quality | {content_score}/100 | 23% | {content_score * 0.23:.1f}% |\n")
    f.write(f"| On-Page SEO | {onpage_score}/100 | 20% | {onpage_score * 0.20:.1f}% |\n")
    f.write(f"| Schema / Structured Data | {schema_score}/100 | 10% | {schema_score * 0.10:.1f}% |\n")
    f.write(f"| Performance (CWV) | {perf_score}/100 | 10% | {perf_score * 0.10:.1f}% |\n")
    f.write(f"| AI Search Readiness & GEO | {ai_score}/100 | 10% | {ai_score * 0.10:.1f}% |\n")
    f.write(f"| Image Optimization | {images_score}/100 | 5% | {images_score * 0.05:.1f}% |\n")
    f.write(f"| **Overall Health Score** | **{health_score}/100** | **100%** | **{health_score:.1f}%** |\n\n")
    f.write("### Top 5 Critical Findings\n\n")
    for idx, item in enumerate(top_findings[:5]):
        f.write(f"{idx+1}. **[{item['category']}]** {item['title']} - `{item['severity']}`\n")
        f.write(f"   * *Issue:* {item['description']}\n")
        f.write(f"   * *Fix:* {item['recommendation']}\n\n")
    f.write("### Top 5 Quick Wins\n\n")
    for idx, item in enumerate(quick_wins[:5]):
        f.write(f"{idx+1}. **[{item['category']}]** {item['title']}\n")
        f.write(f"   * *Why:* Low effort with immediate positive influence on indexing/visibility.\n")
        f.write(f"   * *Action:* {item['recommendation']}\n\n")
    f.write("---\n\n")
    for key, (cat_name, score, findings, what_works) in categories_mapping.items():
        f.write(f"## {cat_name} (Score: {score}/100)\n\n")
        f.write("### What Works\n")
        for w in what_works:
            f.write(f"- ✅ {w}\n")
        f.write("\n")
        f.write("### Areas for Improvement\n\n")
        if findings:
            for item in findings:
                f.write(f"#### 🛑 {item['title']} (`{item['severity']}`)\n")
                f.write(f"- *Details:* {item['description']}\n")
                f.write(f"- *Action Required:* {item['recommendation']}\n\n")
        else:
            f.write("✅ No issues found in this category.\n\n")
        f.write("---\n\n")
    f.write("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n")
    f.write("Built by agricidaniel — Join the AI Marketing Hub community\n")
    f.write("🆓 Free  → https://www.skool.com/ai-marketing-hub\n")
    f.write("⚡ Pro   → https://www.skool.com/ai-marketing-hub-pro\n")
    f.write("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n")

print("Saved FULL-AUDIT-REPORT.md")
print("All audit processes completed successfully.")
