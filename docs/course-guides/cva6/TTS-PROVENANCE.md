# CVA6 v2 narration provenance

Produced locally for the 2026-10-02 course reconstruction. All 24 scene scripts were replaced; old audio was removed before the new render. Only a newly rendered stress sample with identical final script, voice and speed was reused in the final batch.

| Language | Engine / model | Voice | Requested speed |
|---|---|---|---|
| English | Qwen3-TTS MLX, mlx-community/Qwen3-TTS-12Hz-1.7B-CustomVoice-bf16 | Aiden | 0.85 |
| Mandarin | CosyVoice3, FunAudioLLM/Fun-CosyVoice3-0.5B-2512 | openhw-lecturer-zh | 0.90 |

English runtime: mlx-audio 0.5.0; model revision 52f4770fd9726457eae3d3b6aa92047a25a10776. Mandarin model revision: 29e01c4e8d000f4bcd70751be16fa94bf3d85a18. Mandarin code baseline: ace7c47f41bbd303aa6bf1ea80e6f9fbd595cd40. The Mandarin profile uses a synthetic reference made with built-in Qwen Dylan, not a recording of Alex or another real person. The private reference audio is not included in either public course package.

The established calm technical-lecturer instructions are defined in scripts/local-tts/qwen3_mlx_tts.py and cosyvoice3_tts.py. Processor names are normalized by lib/openhw/tts-pronunciation.ts before synthesis; visible script and captions retain normal spelling. New glossary entries cover CV64A60AX, ACT4, IPC and ThreadX.

English systems scene was rerendered after ASR flagged the processor name, with this instruction: “Speak as a calm, precise technical lecturer. Preserve every word exactly. Read C V A six distinctly as see, vee, ay, six. Pause briefly around processor names. Do not add any content.” A second ASR pass recovered both CVA6 mentions correctly. The English final source-task scene was also rerendered with a matching instruction to preserve the separate letters and final X in CV32A65X. Other scenes use the baseline instructions.

Each clip is encoded as MP3 at 128 kbit/s after loudnorm I=-16 LUFS, TP=-1.5 dBTP, LRA=11; 180 ms leading room and 320 ms trailing room. Measured results and final file digests are in PRODUCTION-AUDIT.md and audio-manifest.json.

ASR: locally cached mlx-community/whisper-large-v3-turbo-asr-fp16 (revision 624c19c9af5603fa73b83bce14d4aeea96156d18), fixed temperature 0, no conditioning on previous text. Transcripts screen omissions and repetition. Spelling, homophones and acronyms can differ; this is not a pronunciation certificate or a human listening pass. Raw expected/transcribed records and audio hashes are retained in each education package.

Subtitles: WebVTT generated from final audio duration and exact visible narration; semantic chunks use duration-weighted cue timing, not word-level forced alignment.

Human full-course listening and editorial acceptance: pending. Release stage remains Demo.
