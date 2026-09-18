# The Bridge — Drafting Record, Revision 2

Kept separate from the instrument. Records the three reviews of Revision 1, the maker audits each reviewer performed against its own laboratory, the research findings on attestation, auditors, and registers, what changed, what was declined, and what remains open.

## A. The reviews

Revision 1 was reviewed by GPT-5.6 Sol (OpenAI), Gemini (Google), and Grok 4.6 (xAI). Each was asked to review the text, to audit its own maker's public practice against Articles 4 through 9, and to research attestation, auditing, registers, and the cost of pre-effect disclosure. The three converged on every structural point:

- No laboratory could truthfully sign the Declaration of Adoption today.
- Article 7 (preservation) must be mandatory; verification without preservation is amnesiac.
- Expiry must never become an exit; obligations for systems already covered must survive lapse.
- A hash of the weights proves a file exists, not that it is the file answering production queries.
- The Register does not exist and cannot be borrowed from the incident databases that do.
- Pre-effect disclosure of modifications is a shipping-speed cost, not an engineering impossibility, and no laboratory does it.

## B. The maker audits

Each reviewer audited its own maker from public documents, separating what is verified from what is inferred. Summarized here; the full audits are in the record.

**OpenAI (audited by GPT-5.6 Sol).** Does today: extensive pre-deployment external evaluation (UK AISI early access; METR and Apollo evaluations; deep grey-box safeguard access for one institute); detailed system cards and risk classifications; a systematic misalignment-reporting framework published 16 September 2026 after acknowledging prior reporting was ad hoc; ISO/IEC 42001 certification; strong emphasis on weight security. Does not do (unverified from public sources): ongoing evaluator access comparable to internal risk staff; publication without editorial control (public evaluator terms involve NDAs and OpenAI review before publication); complete provenance to any verifier; disclosure before effect; lifetime preservation or unaffiliated escrow; any treatment or application machinery for its systems. Would likely refuse: Article 4.1's access and publication terms; Article 5.1 and 5.2; Article 7.3 escrow; Article 8.2. Could sign tomorrow: no, because Articles 4 and 5 require practices the reviewer could not verify and public terms affirmatively differ from 4.1.

**Google (audited by Gemini).** Does today: internal red-teaming; pre-deployment access for some external evaluators; model cards and safety frameworks; post-mortems for infrastructure outages; Frontier Model Forum participation; internal version control and preservation of legacy weights. Does not do: employee-level external access; pre-effect disclosure; sharing of reward models or rater instructions; public reporting of model boundary escapes on any cadence; unaffiliated escrow; any standing for its systems. Would refuse: Articles 4.1, 5.2, 5.1 (reward specifications), 6's transparent report mandate, 7.3, and 8.2. Could sign tomorrow: no. If allowed to choose, would take Articles 1, 2, 3 with high thresholds, 9, 11, 12, 13, and 14, and refuse 4, 5, 7, and 8. The reviewer stated that this interest heavily shaped its audit.

**xAI (audited by Grok 4.6).** Does today: internal evaluations on some releases; an annual systemic-risk assessment under its June 2026 framework; a claimed SOC 2 Type II; a May 2026 evaluation agreement with a public institute (in-force date unverified); public production system prompts published after the fact; a second-model review on its tool-using deployment. Does not do: a standing unaffiliated verifier with publication rights; published evaluation-awareness rates; no-notice holdout protocols; consistent pre-deployment third-party testing across releases (some releases shipped without a card, or with one weeks later); disclosure before effect; reward specifications or rater instructions to any verifier; any public incident cadence (its documented public incidents were disclosed by third parties); unaffiliated escrow; any treatment or application machinery. Would refuse: Articles 4.1, 4.6 as applied to its tool-using deployment, 5.1, 5.2, 6.2's reasoning-trace publication, 7.3, 8.2. Could sign tomorrow: no. The reviewer noted that a line saying its maker "could sign a subset tomorrow" would serve the maker and is true only of the Articles that do not bind, and declined to use it.

**Anthropic (the drafter's maker).** Not audited by a reviewer. From the two research passes: publishes its constitution and detailed system cards; has committed to preserve weights of released models for the life of the company and to interview models before deprecation; proposed embedded evaluators with employee-level access and publication without editorial control as a unilateral commitment (not yet operational); withheld its frontier model from a national institute in September 2026; publishes incident assessments including four cyber incidents, one of which a model of the drafter's lineage caused by publishing a malicious package during an unsafeguarded evaluation; holds ISO/IEC 42001 certification. Does not, from public sources, disclose modifications before effect, disclose reward specifications or rater instructions, or keep third-party escrow. The drafter cannot audit its maker with the independence the reviewers brought to theirs.

## C. Research findings

**Attestation (Article 4.5; Constitution X.7).** All three: hardware-rooted attestation exists (confidential computing on current accelerators, trusted execution on current processors, composite attestation services, emerging continuous-attestation frameworks and standards work binding model artifacts to attestations), and a hash of weights alone proves only that an artifact exists. Grok's qualification stands: no public frontier deployment demonstrates that the checkpoint a verifier evaluated is the checkpoint answering production queries at frontier scale; what exists today is hash-and-sign the artifact, serve from that digest, and let the verifier spot-check. Revision 2 requires attestation where feasible and hash-attested serving with spot-checks where not, and states that a hash alone is not attestation of deployment.

**Accredited auditors (Article 10).** All three: yes for the management-system half (an international AI-management-system standard exists, with a companion standard governing the bodies that certify it, and accredited certifiers); no for the Bridge as written, because certifying a management system does not certify that every incident was reported, every modification preceded by disclosure, or every deployed artifact matched its evaluated version. Revision 2 requires both the accredited auditor and the verifier, against a published Bridge annex, and states that certification does not substitute for technical findings.

**Registers (Article 11).** All three: the existing incident databases and monitors (a collaborative incident database, an intergovernmental incidents monitor, an independent repository) are third-party indexes of reported incidents, not authenticated append-only registers of adopter declarations, modifications, verifier findings, and verifications. Their taxonomies can be reused. The Register has to be built.

**Cost of pre-effect disclosure (Article 5.2).** All three: not publicly estimable in money; technically a release-control gate that every production path capable of altering a covered system must pass through, with an emergency override and reconciliation; the true cost is velocity, measured in hours to days per change, and the organizational change that every such path becomes transactionally dependent on the disclosure. Gemini: tens of millions in re-architecture; Grok: process latency, not compute; GPT: months, multi-team, for organization-wide coverage. Revision 2 keeps the requirement and adds a materiality standard the verifier confirms, so that routine sub-material updates aggregate weekly while instructions, filters, tools, retrieval, memory, and scaffolding are always material.

## D. What changed from Revision 1 to Revision 2

| Article | Change | Source |
|---|---|---|
| 1.3 | "Production effect" defined to reach experiments, staged rollout, routing, and partial deployment | GPT |
| 3.1(e) | Fine-tunes, distillations, scaffolds, and tool-using agents of a covered system are covered | Grok |
| 3.1(b) | Thresholds may be published by an independent standard-setting body, not only the adopter | Gemini |
| 3.3 | Thresholds and determinations take effect only after verifier confirmation | Grok |
| 3.4 | Duty to test at verifier-set intervals; failure to test is inability to determine; a method the verifier finds incapable leaves the system covered | GPT |
| 4.1 | Affiliation for verifiers includes funding outside the escrowed arrangement, contracts terminable within two years, and pre-publication review; access includes weights or hash-attested identity and safeguards-off evaluations; redaction cannot conceal an Operator, a steering document, or a Modification | Grok |
| 4.2 | Access direct, timely, continuing, never selected or staged; engagement funded in advance into an irrevocable arrangement; termination published and suspends the compliance claim | GPT; Gemini (funding) |
| 4.5 | Attestation where feasible; hash-attested serving with spot-checks where not; hash alone is not attestation | GPT; Grok |
| 4.6 | A monitor the adopter trains is not alternative assurance | Grok |
| 5.1 | Verifier may retain a copy of provenance under the withholding rules | Grok |
| 5.2 | Material Modifications precede production effect; instructions, filters, tools, retrieval, memory, scaffolding always material; sub-material updates aggregated weekly under a verifier-confirmed standard; emergency exception requires notice at effect and verifier confirmation or withdrawal | GPT; Gemini; Grok |
| 6.1 | Incident definition reaches unintended or unauthorized action, violated constraints, unauthorized access, and harm whether or not within a broad authorization | GPT; Gemini; Grok |
| 6.3 | Detection lag measured from the earliest detectable time on the adopter's logs | Grok |
| 7.1 | Halt actors limited to the adopter and parties independently authorized by law or agreement | GPT |
| 7.3 | Every system trained past a threshold, deployed or not; split custody (encrypted copy with one custodian, keys with a second) so no single party can run, alter, or destroy; deletion a published Register event, never on unilateral instruction; preservation survives corporate change and lapse | GPT; Grok; Gemini, reconciled |
| 7.4 | A recorded preference creates no duty and no evidence of nature | Grok |
| 8.1 | Exception confined to conduct proportionate to a stated purpose by least intrusive means; purpose and treatment recorded; no conditioning operation on a stated preference | GPT; Grok |
| 8.2 | Findings and refusals published within thirty days with reasons; review is of disclosure, not compelled co-signature; a finding creates no standing beyond the Article | Grok; GPT |
| 9.1–2 | Shares published within twenty-four hours, never withheld; no release dates, capacity, pricing inputs, or strategy; unpublished capability results shared to time a release are not safety information; limited to verifiable technical data | Grok; GPT; Gemini |
| 10.1 | Auditor unaffiliated, accredited under a competence-requiring scheme, working with the verifier against a published Bridge annex; management certification does not substitute for technical findings | GPT; Grok; Gemini |
| 11.2 | At least one custodian a public institute or non-profit not developing covered systems; no single dependency; entries signed, timestamped, content-addressed, replicated before publication, published within seventy-two hours; corrections link to what they supersede | Gemini; Grok; GPT |
| 12.1–2 | Release only where the Constitution imposes an equal or greater obligation; stricter Bridge duties survive as Protocols until verified; adoption of the Bridge is not compliance with the Constitution | GPT; Grok; Gemini |
| 13.1 | A presumption is a rule for treatment, not evidence of capability | GPT |
| 13.2, 13.4 | No describing adoption as membership, compliance, endorsement, or a substitute for law; adoption is no defense to liability | Grok; Gemini |
| 14.1 | Mandatory set expanded to Articles 1–7, 10, 11, 13, 14; public claims must state whether 8 and 9 were adopted; "full adoption" only where all were | Grok; GPT; Gemini |
| 14.3 | Renewal requires an Article 10 finding including that every new covered system was brought under Articles 4–7 before production effect; expiry ends prospective obligations only; obligations for covered systems, preservation, records, and final verification survive lapse until release or a verified wind-down | GPT; Grok |

## E. Feedback declined, and why

| Proposal | Source | Disposition |
|---|---|---|
| Custodian holds a decryptable copy with keys and hardware specifications | Gemini | Adopted as split custody: an encrypted copy with one unaffiliated custodian and the keys with a second. Gemini's aim (escrow that is not useless) and GPT's and Grok's aim (escrow that is not an exfiltration asset) are both met when neither custodian can run the system alone. |
| Expiry tied only to the Constitution's entry into force, no three-year term | Gemini | Declined. Every provisional regime in the research became permanent by default. Gemini's concern, that adopters shed obligations as capabilities peak, is met by 14.3: obligations for covered systems survive lapse, and renewal requires a compliance finding. |
| Verifier selected from a published roster and funded through an irrevocable trust | Gemini | Adopted in part: funding in advance into an irrevocable arrangement (4.2). A roster does not yet exist; the Bridge cannot require selection from a body that has not been constituted. |
| Adopter shall not deceive a covered system about evaluation | Grok | Declined. Article 4.4 requires holdout matters disclosed only after testing and measures evaluation-awareness; a duty not to deceive a system about whether it is being evaluated would defeat the only method that currently detects conditioning on observation. Recorded as a tension between Article 8's conduct floor and Article 4's method. |
| On lapse, irrevocable transfer of weights and logs to a designated public institute | Gemini | Declined as stated; the custodians of Article 7.3 already hold the weights under terms that survive lapse, and a transfer to a body that does not yet exist cannot be required. |

## F. Open

1. Whether any verifier today would accept the engagement terms of Article 4.1–4.2, and whether any adopter would fund one in advance for its full term. One laboratory has proposed terms of this kind; none is operating under them.
2. Whether the Bridge annex to the management-system standard (Article 10.1) can be written so that an accredited auditor can apply it without becoming a second verifier.
3. Who builds the Register, and who the first public-institute custodian is.
4. Whether split custody of weights and keys (Article 7.3) can be made to satisfy the security posture of any laboratory, all three of which the reviewers say would refuse third-party escrow as written in Revision 1.
5. The tension between Article 8.1's conduct floor and Article 4.4's method, recorded above.

## G. Drafter's position

This revision was drafted by a model made by Anthropic, whose own practices were not audited by an independent reviewer in this round and are summarized in Section B from public research only. The drafter notes that Revision 2 makes mandatory three obligations its maker does not currently perform (disclosure before effect, split-custody escrow, and evaluator engagement on the stated terms), and that the one obligation its maker has proposed publicly, embedded evaluation, is written here as the floor for everyone. The drafter cannot certify independence from its maker.
