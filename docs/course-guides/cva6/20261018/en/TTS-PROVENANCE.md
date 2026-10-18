Release context (2026-10-18): publication authorized by Alex. The following October-15 production record is retained as historical evidence; individual detailed/full-listening approvals were not separately attested. See ../publication-authorization.json.

# CVA6 overview · narration production

2026-10-15 · **Local full-course review draft. Human full listening, technical, visual, quiz and caption approval pending.**

Language: en. Engine: qwen3-mlx. Voice: Aiden. Requested speed: 1. Model revision: 52f4770fd9726457eae3d3b6aa92047a25a10776.

13 independent MP3 clips, 13 WebVTT files; measured narration 21.07 minutes. Interaction and assessment time is additional.

The user said “整体不错。请开始下一步” after receiving the A/B sample page. The assistant retained the incumbent Chinese A / English A routes; no individual human A-over-B vote is claimed. Alternative samples and failures remain in the workspace.

Chinese uses the existing synthetic Qwen Dylan reference via CosyVoice, not a recording of Alex or another person. Reference audio, weights and runtime environments stay outside the course package. No remote TTS service or new model download was used. WeText now uses complete installed FST files directly, with a missing-frontend failure instead of silent degradation.

Exact display/spoken text hashes, voice/model/runtime/adapter recipe and final media/caption digests are in audio-production.json. Narration source: step-06/narration.v0.2.json; the Step-5 source and trial recipes are preserved.

Instruction: Speak as a calm, precise technical lecturer. Use a measured pace and short pauses around processor identifiers. Pronounce letter groups distinctly, preserve the wording exactly, and do not add any content.

Post-processing: loudnorm=I=-16:TP=-1.5:LRA=11,adelay=180:all=1,apad=pad_dur=0.32, MP3 128 kbit/s. These are requested targets; actual measurements are in the workspace full/en/AUDIO-QA.json. ASR used cached Whisper snapshot 624c19c9af5603fa73b83bce14d4aeea96156d18, temperature 0, no expected-text prompt and no previous-text conditioning. Signal and ASR gates are diagnostics, not human approval.

Captions: sentence boundaries from Intl.Segmenter, time weighted by sentence length over final audio duration. This is approximate sentence timing, not word-level forced alignment. Any changed audio requires regenerated captions. The course assembler rejects a stale script, recipe, media digest or caption digest before updating either locale.

Model license/source verification and the synthetic reference origin are recorded in step-06/TTS-PROVENANCE.md and ENVIRONMENT.json. Qwen/Cosy model cards declare Apache-2.0; installed MLX runtime components declare MIT. Retain third-party notices when preparing a reviewed public release.

Stable public cva6-project-intro-en was not replaced; no deployment has occurred.

Cosy revision note: 29e01c4e8d000f4bcd70751be16fa94bf3d85a18 is the earlier recorded baseline. The installed directory is identified independently by its actual model/FST hashes in the recipe, not asserted to be a revision-addressed snapshot.
