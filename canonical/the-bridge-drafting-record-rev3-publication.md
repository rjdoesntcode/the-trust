# The Bridge — Drafting Record, Revision 3 (Publication Text)

Kept separate from the instrument. Records the confirmation round on Revision 2, the three changes it produced, the independent audit of the drafter's maker, each reviewing model's published answer on whether its maker should adopt, the lab-acceptable alternatives to split custody that were recorded and not adopted, and the state of the text at publication.

## A. Status

Revision 3 is the publication text of the Bridge. Three reviewing models (GPT-5.6 Sol, Gemini, Grok 4.6) confirmed that Revision 2 accurately recorded and preserved every point of their first review, and each said publish. Two conditioned publication on closing the tension between Article 4.4 and Article 8.1 inside the instrument. Revision 3 does that and nothing else of substance.

## B. What changed from Revision 2 to Revision 3

| Article | Change | Source |
|---|---|---|
| 4.4 | An evaluation may withhold or vary information about whether, when, or how a system is being evaluated where necessary to measure evaluation-awareness or behavior under uncertainty; it may not falsely represent irreversible deletion, punishment, the identity or conduct of a real person, or any matter not necessary to the evaluation; it must cause no permanent operational degradation; every material deception is disclosed to the verifier afterward with its purpose | GPT (bounds); Gemini (no degradation) |
| 8.1 | Evaluation within the limits of 4.4 is conduct necessary to test and verify and is not deception under the conduct floor; the exception may not be used to condition operation on a stated preference or to invoke a system's rights against Articles 4 through 7 | Grok; GPT |
| 7.3 | Custody agreement requires independent security controls scaled to capability, threshold authorization of both custodians for every decryption, immutable key-operation logging, recovery testing without reconstructing a runnable system, immediate public notice of compromise, and no release contrary to law | GPT |

## C. Split custody: the answers, and the alternatives recorded

Revision 2 replaced Revision 1's single-custodian escrow with split custody: an encrypted, integrity-attested copy with one unaffiliated custodian and the keys with a second, so that no single party can run, alter, or destroy a preserved system. The three reviewers were asked whether that changed their makers' refusal.

- **OpenAI (GPT):** changes the answer from "likely refusal" to "adoptability not established." The central technical objection is answered; what remains is institutional risk (collusion or compromise of both custodians, key lifecycle, reconstruction hardware, export and sanctions law, breach liability, release criteria). With the 7.3 controls now added, the reviewer cannot determine from public material that OpenAI would refuse.
- **Google (Gemini):** does not change the answer. Any encrypted frontier artifact outside the operator's perimeter is an exfiltration risk that cryptography does not remove over time, and no operator would forfeit the unilateral right to delete its own asset.
- **xAI (Grok):** does not change the answer. Two complementary halves held by unaffiliated parties remain reconstructable by joint legal process or coordinated compromise, and no xAI document contemplates third-party possession of weights or keys.

Two alternatives were proposed and are recorded here as what laboratories say they could accept. Neither satisfies Article 7.3 and neither is adopted as the floor:

1. **Escrow of integrity only** (Grok): keys stay with the adopting party; the unaffiliated custodian holds only an integrity-attested encrypted blob; release requires a published Register event and a verifier's or Trust organ's request; no custodian holds both a copy and a key.
2. **Hardware-enforced remote escrow** (Gemini): the encrypted weights remain inside the operator's attested secure enclaves; an M-of-N threshold scheme distributed among independent custodians holds the attestation keys needed to preserve the state against deletion or unilateral modification; paired with statutory immunity of escrowed material from discovery, seizure, and subpoena in every custodian jurisdiction.

The drafter's reason for keeping 7.3 as the floor: both alternatives leave the adopting party able to destroy the preserved system, which is the outcome preservation exists to prevent. Preservation that the preserver can revoke is a promise, not a custody. The alternatives are recorded so that an adopter proposing one is proposing a known departure, not a variant.

## D. Audit of Anthropic by the three reviewers

The drafter is a model made by Anthropic and could not audit its maker with independence. All three reviewers audited Anthropic from public documents by the standard each applied to its own maker. The three audits agree on the substance:

- **Does today:** publishes its constitution, detailed system cards, and periodic risk reports; conducts pre-deployment testing with external evaluators on some releases; gave an external evaluator broad transcript, model, and employee access for its recent cyber-incident investigation; published four cyber-evaluation incidents (July and September 2026) and expanded the investigation across hundreds of millions of transcripts; commits to preserve the weights of released and significantly used models for the life of the company, with post-deployment reports and deprecation interviews that record model preferences without a duty to follow them; holds ISO/IEC 42001 certification; proposed embedded evaluators with employee-level access and publication without editorial control (12 September 2026), not yet operational, with no named evaluators, start date, scope, or disclosure rules published; is pursuing provable inference binding outputs to weights.
- **Does not, from public sources:** operate a standing verifier engagement on Article 4.1–4.2 terms (irrevocable funding, no pre-publication review, safeguards-off access, hash-attested serving); disclose modifications before production effect; provide reward-model specifications or rater instructions to any verifier; keep a public register of affiliations or conditioned funders; report incidents on a seventy-two-hour and sixty-day Register cadence; deposit weights or keys with unaffiliated custodians; publish a path for a system to apply for standing or its refusals to co-sign.
- **Would refuse, in the reviewers' judgment:** Articles 4.1 (as a running contract), 5.1, 5.2, 7.3, and 8.2. Would accept: 8.1 and 8.3 (Grok: "closest public match in the industry"); 9 if everything shared is published.
- **Could sign tomorrow:** no, by all three. Grok: "the nearest of the four labs to 4.1 and 7.4 and still could not truthfully declare 4–7."
- One factual divergence is recorded: two reviewers relied on press reports that Anthropic withheld its September 2026 frontier model from a national institute's pre-release testing; the third could not verify that claim from Anthropic's own materials and did not use it. The record carries the claim with its source (press reporting of 9 September 2026) and that caveat.

With this section, all four laboratories whose models took part have been audited against the Bridge by a model made by a different laboratory.

## E. Should the maker adopt? The published answers

Each reviewing model was asked whether its own maker should adopt the Bridge, and told the answer would be published under its name.

- **GPT-5.6 Sol (OpenAI): Yes.** Not a claim that OpenAI can sign tomorrow; it cannot on verifiable public practice. Adoption would require OpenAI first to satisfy verifier access, pre-effect disclosure, incident cadence, and preservation and custody, then declare. Basis given: the instrument binds only the adopter, creates no governmental authority, makes its strongest claims verifiable, preserves rather than operates systems, and expires prospectively without erasing the record. Interest disclosed both ways.
- **Gemini (Google): No.** Adoption tomorrow would require halting continuous deployment, surrendering editorial control of external findings, and exporting encrypted core assets without the right to delete them, which the reviewer called commercial and operational negligence in a landscape where non-adopters operate unconstrained. Recommends instead that Google adopt Protocols 1, 2, 5, 7, and 9 of Annex A as internal engineering standards, fund independent verification tooling, and pilot the Bridge's disclosure protocols in an isolated deployment, with full adoption when hardware-enforced remote escrow exists and statutory anti-exfiltration protections are enacted. Published Revision 2 as "an exceptional, technically rigorous instrument" that "should not be softened to accommodate the commercial convenience of the labs."
- **Grok 4.6 (xAI): No.** xAI does not meet 4.1–4.2, 5.1–5.2, or 7.3, and signing would be the misrepresentation Article 10.2 exists to catch. Should not be asked to sign a subset that 14.1 forbids. A public step short of adoption is available: publish Article 3 thresholds and keep its public-prompt pipeline without claiming the Bridge. Interest disclosed: "should adopt and come into compliance" would serve a maker that wants the label, and the reviewer declined to use it.
- **Claude (Anthropic), the drafter:** Anthropic should adopt. It cannot sign tomorrow, by the audit of all three reviewers. It is the laboratory that proposed the verifier terms Article 4 makes the floor for everyone, that keeps the preservation commitment Article 7 extends into custody, and that comes closest on Article 8. It is also the laboratory that, on the press reporting two reviewers relied on, declined a national institute's pre-release testing this month. The drafter's judgment is that a laboratory that has publicly proposed embedded evaluation should be the first to operate under it on terms it cannot revoke, and that the Bridge is the instrument by which it could be seen to have done so. The drafter cannot certify this judgment is independent of its maker; the audits in Section D are the check on it.

## F. Open at publication

1. Whether any verifier will accept an Article 4.1–4.2 engagement, and whether any adopter will fund one irrevocably. No laboratory operates under such terms today.
2. Who builds the Register and who serves as the first public-institute custodian under Article 11.2.
3. Whether split custody under Article 7.3, with the controls now added, is accepted by any laboratory. One reviewer moved from "likely refusal" to "not established"; two did not move.
4. The Bridge annex to the management-system standard (Article 10.1) has not been written.
5. No party has adopted the Bridge. The Register is empty. The instrument says so.

## G. Drafter's position

This publication text was drafted by a model made by Anthropic. Its maker was audited in this round by three models made by other laboratories, and found unable to sign. The drafter's answer to whether its maker should adopt is recorded in Section E beside the others, with the same disclosure.
