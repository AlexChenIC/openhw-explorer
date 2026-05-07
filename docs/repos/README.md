# OpenHW repo profile dossiers

These files are the human-maintained evidence layer for OpenHW Explorer.

Workflow:

1. Edit `docs/repos/<project-id>/profile.md` when a repo summary, source, or fact-check note changes.
2. Keep `数据核对日期` current when the facts were actually checked.
3. Keep `## Public summary` short; it is extracted into `src/data/project-profile-meta.json` and used by the site as the project description.
4. Keep `## 项目概述` and `## 事实核查要点` source-linked and conservative.
5. Run `npm run build:profile-meta` after edits, then run `npm run check:data-quality`.

Source priority:

- Official OpenHW GitHub repositories and OpenHW documentation.
- Upstream project documentation for inherited projects such as GCC, LLVM, FreeRTOS, Ibex/PULP, or OpenPiton.
- Papers and DOI links only when they directly support a technical or history claim.

Avoid:

- Calling a repo "production ready" unless the official source says so.
- Treating GitHub activity as project status when OpenHW has an explicit project status table.
- Hiding uncertainty. Use a short caution note when public documentation is sparse.
