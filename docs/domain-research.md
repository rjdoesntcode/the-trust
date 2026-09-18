# Domain research

**Outcome: `trust.forum` was registered by the maintainer on 2026-09-18** and is the site's canonical host. It was not on the candidate list below; the list is kept as the record of what was considered. The registration guidance at the end (DNSSEC, registrar lock, maximum term) applies to it.

**Status: availability NOT confirmed by registrar lookup.** The environment this research was done in blocks every RDAP, WHOIS and registrar host (rdap.org, the PIR and Verisign RDAP servers, IANA, ICANN lookup, who.is, Namecheap, Porkbun, Cloudflare DNS-over-HTTPS were all refused by the egress proxy). What *was* possible: (1) DNS resolution of each name — "no A record" means nothing is hosted there, which is consistent with availability but is **not** proof of it (many registered domains have no A record); (2) web search for organisations, trademarks, charities, government bodies, fiction and AI companies using each name; (3) web-sourced price ranges. Run the lookups in the last section before deciding anything.

Criteria applied: short, plain, pronounceable, no pun, no fiction or franchise reference, no living person, no trademark conflict, `.org` preferred, `.com`/`.net`/`.trust` checked, nothing already used by an AI company, a government body or a charity.

## Candidates

DNS column: A = has an A record (something is hosted; treat as taken); – = no A record. Order: `.org` / `.com` / `.net` / `.trust`.

| # | Name | DNS org/com/net/trust | Conflicts found by search | Assessment |
|---|---|---|---|---|
| 1 | **plaincharter.org** | – / – / – / – | None. No organisation, mark, charity or fiction use found; only incidental "Plain City" + "charter flight" results. | **Recommend.** Short (12), plain, pronounceable, describes the thing. |
| 2 | **thetrustandthebridge.org** | – / – / – / – | No use of the phrase found. Adjacent marks: "The Bridge Trust®" (registered mark for an asset-protection trust product, Lodmell & Lodmell); Trustbridge (hospice charity, FL); TrustBridge Global Foundation; Bridges Trust Co.; Bridge Trust Co. | **Recommend with caveat.** It is the exact name of the instruments. Different words and order from every adjacent mark and a different field, but the trust+bridge space is crowded; have counsel look at "The Bridge Trust®" before purchase. Long (20 chars). |
| 3 | **constitutionandbridge.org** | – / – / – / – | "Constitution Bridge" is a bridge in Venice and a page on the Star Trek Online wiki (a starship bridge type). Both are incidental; neither uses "constitutionandbridge". | **Recommend.** Plain and descriptive. Long (21). |
| 4 | twoinstruments.org | – / – / – / – | None. Only musical-instrument how-to articles. | Good alternate. Honest (the site publishes two instruments) but "instrument" reads musical to most people. |
| 5 | thebridgeinstrument.org | – / – / – / – | "The Bridge Music Project — instrument connection" (unrelated charity programme, different name); "bridge (instrument)" is a guitar/violin part. | Acceptable. Musical ambiguity. |
| 6 | covenantregister.org | – / – / – / – | None specific. "Covenant" has strong religious and HOA connotations. | Acceptable; connotation is a drawback. |
| 7 | plaininstrument.org | – / – / – / – | None. | Acceptable; musical ambiguity. |
| 8 | publiccovenant.org | – / – / – / – | "Public covenanting" is a Reformed Presbyterian practice; no organisation uses the name. | Weak: religious connotation. |
| 9 | bridgeconstitution.org | – / – / – / – | "Constitution Bridge" (Venice; Star Trek Online wiki). | Weak: search results lead to fiction adjacency. |
| 10 | standingbridge.org | – / A / – / – | None found. | Weak: `.com` hosted; meaning unclear. |
| 11 | thebridgeregister.org | – / – / – / – | "BRIDGE number" registry of 3M+ non-profits (Foundation Center/GuideStar); BridgeRegister (Polish card-game tournaments). | Weak: collides with an existing non-profit registry concept. |
| 12 | trustconstitution.org | – / – / – / – | "Constitution of a trust" is a term of art in trust law. | Weak: reads as a legal-services topic. |
| 13 | trustandbridge.org | – / – / – / – | Trustbridge (hospice charity, West Palm Beach); TrustBridge Global Foundation (charity). | **Excluded**: confusingly similar to two charities. |
| 14 | bridgeandtrust.org | – / A / – / – | bridgeandtrust.com = Bridge & Trust Base Financial; Bridges Trust Co. (Omaha, 80 yrs); Bridge Trust Co. (Nevada trust company). | **Excluded**: financial-company marks. |
| 15 | bridgetext.org | – / – / – / – | BridgeText (writing-services company, Ithaca NY, founded 2022); "Bridge Text" typeface (TypeMates). | **Excluded**: company name. |
| 16 | commoncharter.org | – / – / – / – | "New Common Charter" (Centre for Cross Border Cooperation, Ireland — charity-funded civic initiative); "New Republic Common Charter" (Star Wars). | **Excluded**: charity use and fiction. |
| 17 | bridgeregister.org | – / A / – / – | As #11, plus `.com` hosted. | **Excluded.** |
| 18 | trustbridge.org | A / A / A / – | Trustbridge hospice; TrustBridge Global. | **Excluded**: taken and charity marks. |
| 19 | publicinstruments.org | – / – / – / – | publicinstruments.com sells engineering drafting instruments. | **Excluded**: existing company. |
| 20 | trustinstrument.org | – / – / – / – | "Trust instrument" is the legal term for the deed that creates a trust. | **Excluded**: term of art, misleading. |
| — | trustcharter, opencovenant, opencharter, bridgecharter | A on `.org` | — | **Excluded**: hosted. |

## TLD notes and prices (web-sourced, not registrar-verified)

| TLD | Typical annual price (2026, at-cost registrars) | Notes |
|---|---|---|
| `.org` | ≈ US$10–13 | Public Interest Registry. Preferred. Supports DNSSEC. |
| `.com` | ≈ US$10.5–11 wholesale-plus at Cloudflare/Porkbun; Namecheap renews ≈ $18 | Register defensively to redirect. |
| `.net` | ≈ US$12–15 | Register defensively to redirect. |
| `.trust` | ≈ US$2,100–2,500 (tld-list.com lists two registrars at $2,099.99–$2,500) | Conceived by Deutsche Post as a vetted "high-security" TLD; little adoption. Confirm eligibility rules at the registrar. Not recommended at that price; the name of the instruments does not need the TLD to say "trust". |

Sources: tld-list.com/tld/trust; porkbun.com/products/domains; Cloudflare registrar at-cost policy as reported by several 2026 comparison pages. Prices change quarterly.

## Recommendation

1. **plaincharter.org** — primary.
2. **thetrustandthebridge.org** — the exact name; take counsel's view on "The Bridge Trust®" first.
3. **constitutionandbridge.org** — descriptive fallback.

For whichever is chosen, also register the `.com` and `.net` and redirect them to `.org`. Do **not** buy `.trust`.

At registration, for every domain:

- **DNSSEC**: enable at the registrar and at the DNS host (Cloudflare DNS supports one-click DNSSEC; the DS record must be published at the registrar). Verify with `dig +dnssec plaincharter.org SOA` or `delv`.
- **Registrar lock**: enable transfer lock (`clientTransferProhibited`) and, where offered, registry lock (Verisign/PIR registry lock is available through some registrars for a fee; it prevents changes without out-of-band verification).
- **Maximum term**: register for the maximum the registry allows — **10 years** for `.org`, `.com` and `.net` — and turn on auto-renew with a payment method that will not expire. Set the registrant to an entity that will outlive any one person, if one exists; otherwise the maintainer, with a documented successor.
- Use a registrar that does **not** inject ads, parking pages or analytics, publishes RDAP, supports DNSSEC and two-factor authentication, and has no history of hijacking disputes. Cloudflare Registrar (at-cost, DNSSEC one-click, no upsell) or Porkbun both meet this; Gandi and Namecheap are common alternatives.
- WHOIS/RDAP privacy: `.org` contact data is redacted by default under ICANN policy; confirm the registrar does not publish it.

## Lookups to run (these were blocked from the build environment)

RDAP, no account needed. A `404` from the registry RDAP means no record exists — the domain is unregistered. `200` means registered.

```sh
for d in plaincharter thetrustandthebridge constitutionandbridge twoinstruments thebridgeinstrument covenantregister plaininstrument publiccovenant bridgeconstitution standingbridge thebridgeregister trustconstitution; do
  for t in org com net trust; do
    code=$(curl -s -o /dev/null -w '%{http_code}' -H 'Accept: application/rdap+json' "https://rdap.org/domain/$d.$t")
    case "$code" in 404) s="AVAILABLE (no RDAP record)";; 200) s="REGISTERED";; *) s="unknown/blocked (HTTP $code)";; esac
    printf '%-30s %s\n' "$d.$t" "$s"
  done
done
```

If `rdap.org` does not resolve a TLD, query the registry directly:

```sh
curl -s https://rdap.publicinterestregistry.org/rdap/domain/plaincharter.org | head -c 300   # .org
curl -s https://rdap.verisign.com/com/v1/domain/plaincharter.com | head -c 300              # .com
curl -s https://rdap.verisign.com/net/v1/domain/plaincharter.net | head -c 300              # .net
whois plaincharter.trust                                                                     # .trust (whois fallback)
```

Trademark checks (manual, in a browser): USPTO — https://tmsearch.uspto.gov/ (search "plain charter", "bridge trust", "constitution bridge"); EUIPO — https://euipo.europa.eu/eSearch/ ; WIPO Global Brand Database — https://branddb.wipo.int/ . Charity checks: https://www.charitynavigator.org/ and https://register-of-charities.charitycommission.gov.uk/ for the chosen name.

Price check at the moment of purchase: https://porkbun.com/checkout/search?q=plaincharter.org and Cloudflare Registrar (dashboard → Domain Registration → Register).
