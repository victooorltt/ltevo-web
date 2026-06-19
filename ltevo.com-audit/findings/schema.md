# Schema & Structured Data Audit Findings

## Score: 45/100

## What Works Well
- No positive elements were identified.

## Identified Issues & Areas for Improvement

### 1. Missing WebSite schema
- **Severity:** `Medium`
- **Description:** No WebSite schema JSON-LD was detected on the homepage. This schema establishes the site name and search box capabilities.
- **Recommendation:** Add JSON-LD WebSite schema to the homepage markup specifying the business name and URL.

### 2. Missing Organization or LocalBusiness schema
- **Severity:** `High`
- **Description:** No Organization or LocalBusiness schema was found on the homepage. This is critical for Local SEO and company identity.
- **Recommendation:** Implement LocalBusiness schema on the homepage footer or contact page detailing name, address, telephone, logo, and hours.

### 3. Missing Service schema on service pages
- **Severity:** `High`
- **Description:** Found 3 service pages without Service schema markup: https://ltevo.com/servicios/diseno-web, https://ltevo.com/servicios/seo, https://ltevo.com/servicios/mantenimiento-web
- **Recommendation:** Implement JSON-LD Service schema on all pages under `/servicios/` to specify service name, description, provider, and areaServed.

