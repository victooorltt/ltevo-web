import os
import json

OUTPUT_DIR = r"C:\Users\anate\Desktop\ltevo-web\ltevo.com-audit"
DATA_FILE = os.path.join(OUTPUT_DIR, "audit-data.json")
REPORT_FILE = os.path.join(OUTPUT_DIR, "report.html")

if not os.path.exists(DATA_FILE):
    print(f"Error: Data file not found at {DATA_FILE}")
    exit(1)

with open(DATA_FILE, "r", encoding="utf-8") as f:
    data = json.load(f)

summary = data["summary"]
categories = data["categories"]
phases = data["action_plan"]["phases"]

# Helper to map severity to color
def get_severity_badge(sev):
    colors = {
        "Critical": "bg-red-soft text-red",
        "High": "bg-orange-soft text-orange",
        "Medium": "bg-yellow-soft text-yellow",
        "Low": "bg-blue-soft text-blue",
        "Info": "bg-gray-soft text-gray"
    }
    cls = colors.get(sev, "bg-gray-soft text-gray")
    return f'<span class="badge {cls}">{sev}</span>'

def get_score_color(score):
    if score >= 90:
        return "text-green"
    elif score >= 70:
        return "text-yellow"
    else:
        return "text-red"

# Category score circular gauges (SVG)
def make_svg_gauge(score):
    # Dasharray of circle is 2 * pi * r = 2 * 3.14159 * 40 = 251.2
    offset = 251.2 - (score / 100) * 251.2
    color = "#10b981" if score >= 90 else ("#f59e0b" if score >= 70 else "#ef4444")
    return f"""
    <svg class="gauge" viewBox="0 0 100 100">
        <circle class="bg" cx="50" cy="50" r="40" stroke="#f1f5f9" stroke-width="8" fill="transparent"/>
        <circle class="fg" cx="50" cy="50" r="40" stroke="{color}" stroke-width="8" fill="transparent"
                stroke-dasharray="251.2" stroke-dashoffset="{offset}" stroke-linecap="round" transform="rotate(-90 50 50)"/>
        <text class="text" x="50" y="55" fill="#0f172a" text-anchor="middle" font-weight="700" font-size="20">{score}</text>
    </svg>
    """

# Build Category Cards
categories_html = ""
for cat in categories:
    score = cat["score"]
    name = cat["name"]
    what_works = cat["what_works"]
    findings = cat["findings"]
    
    findings_html = ""
    if findings:
        for idx, item in enumerate(findings):
            findings_html += f"""
            <div class="finding-item border-b">
                <div class="finding-header">
                    <span class="finding-title">{idx+1}. {item['title']}</span>
                    {get_severity_badge(item['severity'])}
                </div>
                <div class="finding-desc">{item['description']}</div>
                <div class="finding-rec"><strong>Fix:</strong> {item['recommendation']}</div>
            </div>
            """
    else:
        findings_html = '<p class="text-green text-sm">✅ No issues identified in this category.</p>'
        
    works_html = ""
    for w in what_works:
        works_html += f'<li class="text-sm text-slate-600 mb-1">✅ {w}</li>'
        
    categories_html += f"""
    <div class="card" id="cat-{name.lower().replace(' ', '-').replace('&', 'and')}">
        <div class="card-header border-b">
            <h3 class="text-lg font-bold text-slate-800">{name}</h3>
            {make_svg_gauge(score)}
        </div>
        <div class="card-body">
            <div class="section-column">
                <h4 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">What Works</h4>
                <ul class="list-none pl-0">
                    {works_html}
                </ul>
            </div>
            <div class="section-column mt-4">
                <h4 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Issues & Recommendations</h4>
                <div class="findings-list">
                    {findings_html}
                </div>
            </div>
        </div>
    </div>
    """

# Build Action Plan Phases
action_plan_html = ""
for phase in phases:
    items_html = ""
    if phase["items"]:
        for item in phase["items"]:
            items_html += f"""
            <tr class="table-row">
                <td class="px-4 py-3 text-sm font-semibold text-slate-800">[{item['category']}] {item['title']}</td>
                <td class="px-4 py-3 text-sm">{get_severity_badge(item['severity'])}</td>
                <td class="px-4 py-3 text-sm text-slate-600">{item['recommendation']}</td>
                <td class="px-4 py-3 text-sm text-slate-500">GSC / Browser inspect</td>
            </tr>
            """
    else:
        items_html = """
        <tr>
            <td colspan="4" class="px-4 py-6 text-center text-sm text-slate-400">✅ No actions needed in this phase.</td>
        </tr>
        """
        
    action_plan_html += f"""
    <div class="phase-container mb-6">
        <div class="phase-header bg-slate-50 border px-4 py-2 font-bold text-slate-700 flex justify-between">
            <span>{phase['name']}</span>
            <span class="text-xs font-normal text-slate-500">Timeline: {phase['timeframe']}</span>
        </div>
        <table class="w-full border-x border-b">
            <thead>
                <tr class="bg-slate-100 text-left text-xs uppercase text-slate-500 border-b">
                    <th class="px-4 py-2 w-1/4">Issue / Category</th>
                    <th class="px-4 py-2 w-16">Severity</th>
                    <th class="px-4 py-2 w-1/2">Recommendation</th>
                    <th class="px-4 py-2 w-1/6">Validation</th>
                </tr>
            </thead>
            <tbody>
                {items_html}
            </tbody>
        </table>
    </div>
    """

# Overall gauge dashboard
overall_offset = 251.2 - (summary["health_score"] / 100) * 251.2
overall_color = "#10b981" if summary["health_score"] >= 80 else ("#f59e0b" if summary["health_score"] >= 60 else "#ef4444")

html_content = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SEO Audit Dashboard - ltevo.com</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
        :root {{
            --primary: #4f46e5;
            --primary-hover: #4338ca;
            --success: #10b981;
            --warning: #f59e0b;
            --danger: #ef4444;
            --slate-50: #f8fafc;
            --slate-100: #f1f5f9;
            --slate-200: #e2e8f0;
            --slate-300: #cbd5e1;
            --slate-500: #64748b;
            --slate-700: #334155;
            --slate-800: #1e293b;
            --slate-900: #0f172a;
        }}
        * {{
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }}
        body {{
            font-family: 'Outfit', sans-serif;
            background-color: #f8fafc;
            color: #334155;
            line-height: 1.5;
            padding-bottom: 4rem;
        }}
        .container {{
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem 1.5rem;
        }}
        header {{
            background: linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%);
            color: white;
            padding: 3rem 0;
            border-bottom: 4px solid var(--primary);
        }}
        header .container {{
            display: flex;
            justify-content: space-between;
            align-items: center;
        }}
        .brand-title {{
            font-size: 2.25rem;
            font-weight: 800;
            letter-spacing: -0.025em;
        }}
        .brand-subtitle {{
            color: var(--slate-300);
            font-size: 1rem;
            margin-top: 0.25rem;
        }}
        .badge {{
            display: inline-flex;
            align-items: center;
            padding: 0.25rem 0.75rem;
            border-radius: 9999px;
            font-size: 0.75rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }}
        .bg-red-soft {{ background-color: #fee2e2; }}
        .text-red {{ color: #b91c1c; }}
        .bg-orange-soft {{ background-color: #ffedd5; }}
        .text-orange {{ color: #c2410c; }}
        .bg-yellow-soft {{ background-color: #fef9c3; }}
        .text-yellow {{ color: #a16207; }}
        .bg-blue-soft {{ background-color: #dbeafe; }}
        .text-blue {{ color: #1d4ed8; }}
        .bg-gray-soft {{ background-color: #f1f5f9; }}
        .text-gray {{ color: #475569; }}
        
        .grid {{
            display: grid;
            gap: 1.5rem;
        }}
        .grid-3 {{
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        }}
        .grid-2 {{
            grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
        }}
        .card {{
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.05);
            border: 1px solid var(--slate-200);
            overflow: hidden;
            display: flex;
            flex-direction: column;
        }}
        .card-header {{
            padding: 1.25rem 1.5rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid var(--slate-200);
        }}
        .card-body {{
            padding: 1.5rem;
            flex-grow: 1;
        }}
        .gauge-container {{
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background: white;
            padding: 2rem;
            border-radius: 12px;
            box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.05);
            border: 1px solid var(--slate-200);
            text-align: center;
        }}
        svg.gauge {{
            width: 140px;
            height: 140px;
        }}
        svg.gauge circle {{
            fill: none;
        }}
        svg.gauge .fg {{
            stroke-dasharray: 251.2;
            transition: stroke-dashoffset 0.3s ease;
        }}
        
        .finding-item {{
            padding: 1rem 0;
        }}
        .finding-item:last-child {{
            border-bottom: none;
        }}
        .finding-header {{
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 0.5rem;
        }}
        .finding-title {{
            font-weight: 600;
            color: var(--slate-800);
            font-size: 0.95rem;
        }}
        .finding-desc {{
            font-size: 0.875rem;
            color: var(--slate-500);
            margin-bottom: 0.5rem;
        }}
        .finding-rec {{
            font-size: 0.875rem;
            color: var(--primary);
            background-color: #e0e7ff;
            padding: 0.5rem 0.75rem;
            border-radius: 6px;
        }}
        .phase-container table {{
            width: 100%;
            border-collapse: collapse;
        }}
        .phase-container th {{
            background-color: var(--slate-100);
            font-weight: 600;
            color: var(--slate-700);
            border-bottom: 1px solid var(--slate-200);
        }}
        .phase-container td, .phase-container th {{
            padding: 0.75rem 1rem;
            border-bottom: 1px solid var(--slate-200);
            text-align: left;
        }}
        .phase-container tr:last-child td {{
            border-bottom: none;
        }}
        .screenshot-gallery {{
            display: flex;
            gap: 1.5rem;
            justify-content: center;
            margin-top: 1.5rem;
        }}
        .screenshot-card {{
            background: white;
            border-radius: 12px;
            padding: 1rem;
            border: 1px solid var(--slate-200);
            text-align: center;
            max-width: 500px;
            width: 100%;
        }}
        .screenshot-card img {{
            width: 100%;
            border-radius: 6px;
            border: 1px solid var(--slate-100);
            margin-top: 0.75rem;
        }}
        
        .footer-banner {{
            border-top: 4px solid var(--primary);
            background: linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%);
            color: white;
            padding: 2.5rem 0;
            margin-top: 4rem;
            text-align: center;
        }}
        .footer-banner a {{
            color: #818cf8;
            text-decoration: none;
            font-weight: 600;
        }}
        .footer-banner a:hover {{
            text-decoration: underline;
        }}
        
        /* Flex / Utilities */
        .flex {{ display: flex; }}
        .justify-between {{ justify-content: space-between; }}
        .items-center {{ align-items: center; }}
        .mb-6 {{ margin-bottom: 1.5rem; }}
        .mt-6 {{ margin-top: 1.5rem; }}
        .w-full {{ width: 100%; }}
        .text-center {{ text-align: center; }}
        .font-bold {{ font-weight: 700; }}
        .text-lg {{ font-size: 1.125rem; }}
        .text-2xl {{ font-size: 1.5rem; }}
        .border-b {{ border-bottom: 1px solid var(--slate-200); }}
        .border {{ border: 1px solid var(--slate-200); }}
        .bg-slate-50 {{ background-color: var(--slate-50); }}
        .bg-slate-100 {{ background-color: var(--slate-100); }}
        .px-4 {{ padding-left: 1rem; padding-right: 1rem; }}
        .py-2 {{ padding-top: 0.5rem; padding-bottom: 0.5rem; }}
        .py-3 {{ padding-top: 0.75rem; padding-bottom: 0.75rem; }}
        .py-6 {{ padding-top: 1.5rem; padding-bottom: 1.5rem; }}
        .text-sm {{ font-size: 0.875rem; }}
        .text-xs {{ font-size: 0.75rem; }}
        .text-slate-400 {{ color: var(--slate-500); }}
        .text-slate-600 {{ color: var(--slate-700); }}
        .uppercase {{ text-transform: uppercase; }}
        .tracking-wider {{ letter-spacing: 0.05em; }}
        .list-none {{ list-style: none; }}
        .pl-0 {{ padding-left: 0; }}
        .border-x {{ border-left: 1px solid var(--slate-200); border-right: 1px solid var(--slate-200); }}
        .border-b {{ border-bottom: 1px solid var(--slate-200); }}
        
        @media (max-width: 768px) {{
            header .container {{
                flex-direction: column;
                text-align: center;
                gap: 1.5rem;
            }}
            .screenshot-gallery {{
                flex-direction: column;
                align-items: center;
            }}
        }}
    </style>
</head>
<body>
    <header>
        <div class="container">
            <div>
                <h1 class="brand-title">ltevo.com SEO Audit</h1>
                <p class="brand-subtitle">Business Type: <strong>{summary["business_type"]}</strong> | Date: June 19, 2026</p>
            </div>
            <div class="bg-indigo-900 border border-indigo-700 rounded-lg p-4 text-center">
                <div class="text-xs uppercase tracking-wider text-slate-300 mb-1">Health Score</div>
                <div class="text-4xl font-extrabold text-white">{summary["health_score"]}/100</div>
            </div>
        </div>
    </header>

    <main class="container">
        <!-- Overview Grid -->
        <section class="grid grid-2 mb-6">
            <div class="gauge-container">
                <h2 class="text-2xl font-bold mb-6">Overall SEO Health</h2>
                <svg class="gauge" viewBox="0 0 100 100" style="width: 180px; height: 180px;">
                    <circle cx="50" cy="50" r="40" stroke="#f1f5f9" stroke-width="8" fill="transparent"/>
                    <circle cx="50" cy="50" r="40" stroke="{overall_color}" stroke-width="8" fill="transparent"
                            stroke-dasharray="251.2" stroke-dashoffset="{overall_offset}" stroke-linecap="round" transform="rotate(-90 50 50)"/>
                    <text x="50" y="55" fill="#0f172a" text-anchor="middle" font-weight="800" font-size="22">{summary["health_score"]}%</text>
                </svg>
                <p class="text-slate-600 mt-6" style="max-width: 400px; margin: 1.5rem auto 0;">
                    Your website ranks with a score of <strong>{summary["health_score"]}/100</strong>. Implementing the action plan below will resolve high-impact issues and help you capture organic search traffic.
                </p>
            </div>
            
            <div class="card" style="padding: 2rem;">
                <h2 class="text-2xl font-bold mb-6">Key Insights</h2>
                <div class="mb-6">
                    <h3 class="text-sm font-bold uppercase tracking-wider text-slate-400 mb-2">Top Findings</h3>
                    <ul class="list-none pl-0">
                        {"".join(f'<li class="text-sm text-slate-700 mb-2">🛑 {f}</li>' for f in summary["top_findings"][:3])}
                    </ul>
                </div>
                <div>
                    <h3 class="text-sm font-bold uppercase tracking-wider text-slate-400 mb-2">Recommended Quick Wins</h3>
                    <ul class="list-none pl-0">
                        {"".join(f'<li class="text-sm text-slate-700 mb-2">⚡ {f}</li>' for f in summary["quick_wins"][:3])}
                    </ul>
                </div>
            </div>
        </section>

        <!-- Action Plan Section -->
        <section class="mb-6">
            <h2 class="text-2xl font-bold mb-6">Prioritized Action Plan</h2>
            {action_plan_html}
        </section>

        <!-- Category Breakdown -->
        <section class="mb-6">
            <h2 class="text-2xl font-bold mb-6">Detailed Category Breakdown</h2>
            <div class="grid grid-3">
                {categories_html}
            </div>
        </section>

        <!-- Screenshots -->
        <section class="mb-6">
            <h2 class="text-2xl font-bold mb-6 text-center">Playwright Render Captures</h2>
            <div class="screenshot-gallery">
                <div class="screenshot-card">
                    <h3 class="font-bold text-slate-700">Desktop View (1280x800)</h3>
                    <img src="screenshots/desktop.png" alt="Desktop Screenshot">
                </div>
                <div class="screenshot-card">
                    <h3 class="font-bold text-slate-700">Mobile View (375x667)</h3>
                    <img src="screenshots/mobile.png" alt="Mobile Screenshot">
                </div>
            </div>
        </section>
    </main>

    <footer class="footer-banner">
        <div class="container">
            <p class="font-bold text-lg mb-2">Join the AI Marketing Hub community</p>
            <p class="text-sm mb-4 text-slate-300">Free, actionable strategies, templates, and courses to grow your business.</p>
            <div class="flex justify-center gap-6" style="gap: 2rem;">
                <a href="https://www.skool.com/ai-marketing-hub" target="_blank">🆓 Free Community</a>
                <a href="https://www.skool.com/ai-marketing-hub-pro" target="_blank">⚡ Pro Hub</a>
            </div>
            <p class="text-xs text-slate-400 mt-6">Built by agricidaniel & Antigravity</p>
        </div>
    </footer>
</body>
</html>
"""

with open(REPORT_FILE, "w", encoding="utf-8") as f:
    f.write(html_content)

print(f"Beautiful report generated at {REPORT_FILE}")
