import { useEffect } from "react";

const setMeta = (attribute, key, content) => {
    if (content === undefined || content === null) return;
    let element = document.head.querySelector(`meta[${attribute}="${key}"]`);

    if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, key);
        document.head.appendChild(element);
    }

    element.setAttribute("content", content || "");
};

const setCanonical = (url) => {
    if (!url) return;
    let link = document.head.querySelector('link[rel="canonical"]');

    if (!link) {
        link = document.createElement("link");
        link.setAttribute("rel", "canonical");
        document.head.appendChild(link);
    }

    link.setAttribute("href", url);
};

export default function SEO({ data }) {
    useEffect(() => {
        if (!data) return;

        // Document Title
        const pageTitle = data.meta_title || data.title || "Aveon City Sector Zero | Luxury 1, 2 & 3 BHK in Airoli";
        document.title = pageTitle;

        // Basic SEO
        const description = data.meta_description || data.description || "";
        const author = data.author || "Delta Tricity";
        const robots = data.robots || "index, follow";
        const keywords = data.meta_keywords || data.keywords || "";
        const primaryKeywords = data.primary_keywords || data.primaryKeywords || "";
        const secondaryKeywords = data.secondary_keywords || data.secondaryKeywords || "";
        const siteName = data.og_site_name || data.siteName || "Aveon City";
        const canonical = data.canonical_url || data.canonical || window.location.href;
        
        // OpenGraph & Twitter Image
        const ogImage = data.og_image || data.ogImage || "";
        const fullOgImage = ogImage ? (ogImage.startsWith("http") ? ogImage : `${window.location.origin}${ogImage}`) : "";
        
        const twitterImage = data.twitter_image || data.twitterImage || fullOgImage;
        const fullTwitterImage = twitterImage ? (twitterImage.startsWith("http") ? twitterImage : `${window.location.origin}${twitterImage}`) : "";
        const twitterImageAlt = data.twitter_image_alt || data.twitterImageAlt || pageTitle;

        // Exact meta tags structure matching user requirements
        setMeta("name", "title", pageTitle);
        setMeta("name", "description", description);
        setMeta("name", "keywords", keywords);
        if (primaryKeywords) setMeta("name", "primary-keywords", primaryKeywords);
        if (secondaryKeywords) setMeta("name", "secondary-keywords", secondaryKeywords);
        setMeta("name", "author", author);
        // robots tag static rahega
        setMeta("name", "robots", "index, follow");
        setMeta("name", "googlebot", "index, follow");

        // Canonical URL
        if (canonical) {
            setCanonical(canonical);
        }

        // Open Graph tags
        setMeta("property", "og:type", data.og_type || "website");
        setMeta("property", "og:url", data.og_url || canonical);
        setMeta("property", "og:title", data.og_title || pageTitle);
        setMeta("property", "og:description", data.og_description || description);
        if (fullOgImage) setMeta("property", "og:image", fullOgImage);
        setMeta("property", "og:site_name", siteName);
        setMeta("property", "og:locale", data.og_locale || "en_US");

        // Twitter tags (setting BOTH property and name for max compatibility with crawler bots)
        const twitterCard = data.twitter_card || "summary_large_image";
        setMeta("property", "twitter:card", twitterCard);
        setMeta("name", "twitter:card", twitterCard);

        setMeta("property", "twitter:url", data.twitter_url || canonical);
        setMeta("name", "twitter:url", data.twitter_url || canonical);

        const twitterTitle = data.twitter_title || data.og_title || pageTitle;
        setMeta("property", "twitter:title", twitterTitle);
        setMeta("name", "twitter:title", twitterTitle);

        const twitterDesc = data.twitter_description || data.og_description || description;
        setMeta("property", "twitter:description", twitterDesc);
        setMeta("name", "twitter:description", twitterDesc);

        setMeta("name", "twitter:image:alt", twitterImageAlt);

        if (fullTwitterImage) {
            setMeta("property", "twitter:image", fullTwitterImage);
            setMeta("name", "twitter:image", fullTwitterImage);
        }
        if (data.twitter_site) setMeta("name", "twitter:site", data.twitter_site);

        // Favicon
        const faviconUrl = data.favicon || "/favicon.svg";
        let icon = document.querySelector('link[rel="icon"]');
        if (!icon) {
            icon = document.createElement("link");
            icon.rel = "icon";
            document.head.appendChild(icon);
        }
        icon.href = faviconUrl;

        // Search Console Verifications
        if (data.google_verification) setMeta("name", "google-site-verification", data.google_verification);
        if (data.bing_verification) setMeta("name", "msvalidate.01", data.bing_verification);
        if (data.facebook_verification) setMeta("name", "facebook-domain-verification", data.facebook_verification);

        // Dynamic JSON-LD Schema (From Admin Panel Meta Settings)
        let schema = document.getElementById("website-schema");
        if (!schema) {
            schema = document.createElement("script");
            schema.id = "website-schema";
            schema.type = "application/ld+json";
            document.head.appendChild(schema);
        }

        if (data.schema_markup && typeof data.schema_markup === 'string' && data.schema_markup.trim() !== '') {
            // If user pasted full <script type="application/ld+json">...</script>, extract the inner JSON
            let cleanJson = data.schema_markup.trim();
            const scriptTagMatch = cleanJson.match(/<script[^>]*>([\s\S]*?)<\/script>/i);
            if (scriptTagMatch && scriptTagMatch[1]) {
                cleanJson = scriptTagMatch[1].trim();
            }
            schema.textContent = cleanJson;
        } else {
            const schemaData = {
                "@context": "https://schema.org",
                "@type": "WebSite",
                name: siteName,
                url: canonical,
                description: description
            };
            schema.textContent = JSON.stringify(schemaData);
        }

        // Dynamic Header Scripts (Google Analytics, GTM, Meta Pixel)
        if (data.header_scripts && !document.getElementById("custom-header-scripts")) {
            const scriptContainer = document.createElement("div");
            scriptContainer.id = "custom-header-scripts";
            scriptContainer.innerHTML = data.header_scripts;
            Array.from(scriptContainer.querySelectorAll("script")).forEach((oldScript) => {
                const newScript = document.createElement("script");
                Array.from(oldScript.attributes).forEach((attr) => newScript.setAttribute(attr.name, attr.value));
                newScript.appendChild(document.createTextNode(oldScript.innerHTML));
                document.head.appendChild(newScript);
            });
        }
    }, [data]);

    return null;
}
