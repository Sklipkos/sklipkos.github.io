// Sklípkoš – jednoduchý souhlas s Google Analytics
// Google Analytics se nenačte, dokud návštěvník výslovně nepovolí analytiku.

(() => {
  const GA_MEASUREMENT_ID = "G-LXQYBPZQYN";
  const CONSENT_KEY = "sklipkosAnalyticsConsent";

  function getConsent() {
    try {
      return localStorage.getItem(CONSENT_KEY);
    } catch (e) {
      return null;
    }
  }

  function setConsent(value) {
    try {
      localStorage.setItem(CONSENT_KEY, value);
    } catch (e) {
      // Pokud localStorage není dostupné, volba platí alespoň pro aktuální stránku.
    }
  }

  function loadGoogleAnalytics() {
    if (window.__sklipkosGaLoaded) return;
    window.__sklipkosGaLoaded = true;

    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () {
      window.dataLayer.push(arguments);
    };

    window.gtag("js", new Date());
    window.gtag("config", GA_MEASUREMENT_ID);

    const script = document.createElement("script");
    script.async = true;
    script.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(GA_MEASUREMENT_ID);
    document.head.appendChild(script);
  }

  function clearGoogleAnalyticsCookies() {
    const names = document.cookie
      .split(";")
      .map(cookie => cookie.split("=")[0].trim())
      .filter(name => name === "_ga" || name === "_gid" || name === "_gat" || name.startsWith("_ga_"));

    const host = location.hostname.replace(/^www\./, "");
    const domains = ["", location.hostname, host, "." + host];

    names.forEach(name => {
      domains.forEach(domain => {
        const domainPart = domain ? "; domain=" + domain : "";
        document.cookie = name + "=; Max-Age=0; path=/" + domainPart + "; SameSite=Lax";
      });
    });
  }

  function removeBanner() {
    document.getElementById("sklipkosCookieBanner")?.remove();
  }

  function showSettingsButton() {
    if (document.getElementById("sklipkosCookieSettings")) return;

    const button = document.createElement("button");
    button.type = "button";
    button.id = "sklipkosCookieSettings";
    button.className = "cookieSettingsButton";
    button.textContent = "Nastavení cookies";
    button.addEventListener("click", showBanner);
    document.body.appendChild(button);
  }

  function showBanner() {
    removeBanner();

    const banner = document.createElement("div");
    banner.id = "sklipkosCookieBanner";
    banner.className = "cookieConsent";
    banner.setAttribute("role", "dialog");
    banner.setAttribute("aria-live", "polite");
    banner.setAttribute("aria-label", "Nastavení analytických cookies");

    banner.innerHTML = `
      <div class="cookieConsentContent">
        <div class="cookieConsentText">
          <strong>Pomozte nám zlepšovat Sklípkoš 🕷️</strong>
          <p>Používáme Google Analytics, abychom zjistili, jak návštěvníci web používají. Analytiku spustíme pouze s vaším souhlasem.</p>
        </div>
        <div class="cookieConsentButtons">
          <button type="button" class="cookieBtn cookieBtnReject" data-cookie-action="reject">Odmítnout</button>
          <button type="button" class="cookieBtn cookieBtnAccept" data-cookie-action="accept">Povolit analytiku</button>
        </div>
      </div>`;

    banner.querySelector('[data-cookie-action="accept"]').addEventListener("click", () => {
      setConsent("accepted");
      removeBanner();
      loadGoogleAnalytics();
      showSettingsButton();
    });

    banner.querySelector('[data-cookie-action="reject"]').addEventListener("click", () => {
      setConsent("rejected");
      clearGoogleAnalyticsCookies();
      removeBanner();
      showSettingsButton();
    });

    document.body.appendChild(banner);
  }

  function init() {
    const consent = getConsent();

    if (consent === "accepted") {
      loadGoogleAnalytics();
      showSettingsButton();
    } else if (consent === "rejected") {
      showSettingsButton();
    } else {
      showBanner();
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
