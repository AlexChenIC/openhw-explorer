# OpenHW source and compact-highlight audit

Reviewed on 2026-11-09. This is a targeted OpenHW source audit, not a repeat of
the earlier daily pass over 149 ecosystem candidates.

## Sources and decisions

- Foundation event listing: https://openhwfoundation.org/events/ still lists
  June 13 as its latest entry; previously archived. No new item selected.
- Eclipse OpenHW RSS: its October 19 OCX 2027 registration article is a general
  Eclipse conference announcement, without an explicit OpenHW session or result.
  Excluded from the OpenHW lane, not misrepresented as a Foundation announcement.
  https://newsroom.eclipse.org/news/announcements/registration-open-ocx-2027
- Official OpenHW TV channel UCquHKALPMdykrseUb6gtx4g: direct public videos listing
  inspected (20 entries); newest recording remains `844k7CObghY`, "RISC V System
  on Chip Design", original upload August 28, already archived. Direct metadata
  confirms channel and upload date. The channel explicitly reports no streams
  tab. RSS returned404; this failure is not evidence of no uploads. Unarchived
  older videos are discovery candidates, not automatically recent news.
- Added one missing organizer report: https://www.ee.cityu.edu.hk/news/2026/10-22-2026
  visibly dated **21 Oct 2026**, despite its October22 URL slug. Full report names
  Florian Wohlrab (OpenHW Foundation, Eclipse Foundation) among afternoon keynote
  speakers. https://riscv-summit-china.org/en/agenda/ independently lists his
  October21 Hong Kong Day keynote and October20 OpenHW commercial-grade IP and
  CVA6 engineering talks. Summary is limited to participation and agenda topics;
  no new processor capability, release, recording or slide availability inferred.

Four primary candidate decisions: two duplicates, one excluded, one added.
Agenda is corroboration, not a fifth independent news item. Existing archived
items and publication dates remain unchanged. Existing Antmicro editorial pick
retained with its original November9 selection and November16 exclusive expiry.

## Daily-task diagnosis

November9 receipts show79/82 collector sources succeeded; OpenHW TV RSS404 was
already compensated by a successful direct channel-listing supplement. The gap
was event participation discoverable through social leads and external organizers,
not a completely stopped scheduler. Direct LinkedIn access was unavailable;
no exhaustive social-post review is claimed. Public conference agendas and
organizer reports provide independently readable evidence.

Package direct videos/streams discovery as `npm run check:openhw-tv`, with bounded
operations, explicit partial/failure outcomes and unknown dates kept null. Require
it daily alongside Foundation/Eclipse checks and focused event-source discovery.
The local daily task still requires the host to be available at execution time;
changing its instructions does not prove a future scheduled run has completed.

## Presentation

Three equal compact cards, uniform heading size, at most two summary lines and
three tags. No full-summary expansion controls in highlights; the archive keeps
complete expandable summaries. Editorial rationale replaces the duplicate teaser
on an actively recommended card. Review/expiry remains one compact line.
