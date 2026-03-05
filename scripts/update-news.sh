#!/usr/bin/env bash
# ═══════════════════════════════════════════════════════════════
#   OpenHW Explorer - News Update Pipeline
#   一键完成：TrendRadar 抓取 → 生成 news-digest.json
# ═══════════════════════════════════════════════════════════════
#
#   用法:
#     ./scripts/update-news.sh          # 完整流程（抓取 + 生成）
#     ./scripts/update-news.sh --build  # 只生成 JSON（跳过抓取）
#     ./scripts/update-news.sh --fetch  # 只抓取（跳过生成）
#
# ═══════════════════════════════════════════════════════════════

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
TRENDRADAR_DIR="$ROOT_DIR/tools/TrendRadar"
VENV_PYTHON="$TRENDRADAR_DIR/.venv/bin/python"
CONFIG_FILE="$TRENDRADAR_DIR/config/openhw_config.yaml"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

info()  { echo -e "${BLUE}[INFO]${NC} $1"; }
ok()    { echo -e "${GREEN}[OK]${NC} $1"; }
warn()  { echo -e "${YELLOW}[WARN]${NC} $1"; }
error() { echo -e "${RED}[ERROR]${NC} $1"; }

# ─── Parse args ───────────────────────────────────────────────
DO_FETCH=true
DO_BUILD=true

case "${1:-}" in
  --build) DO_FETCH=false ;;
  --fetch) DO_BUILD=false ;;
  --help|-h)
    echo "Usage: $0 [--build|--fetch|--help]"
    echo ""
    echo "  (no args)   Full pipeline: fetch + build"
    echo "  --build     Only regenerate news-digest.json from existing DB"
    echo "  --fetch     Only run TrendRadar to fetch new data"
    echo "  --help      Show this help"
    exit 0
    ;;
esac

echo ""
echo "═══════════════════════════════════════════════════"
echo "  OpenHW Explorer - News Update Pipeline"
echo "═══════════════════════════════════════════════════"
echo ""

# ─── Step 1: Fetch with TrendRadar ───────────────────────────
if [ "$DO_FETCH" = true ]; then
  info "Step 1/2: Running TrendRadar to fetch news..."

  # Check venv
  if [ ! -f "$VENV_PYTHON" ]; then
    error "Python venv not found at $VENV_PYTHON"
    echo "  Run the following to set up:"
    echo "    cd $TRENDRADAR_DIR"
    echo "    python3 -m venv .venv"
    echo "    .venv/bin/pip install -r requirements.txt"
    exit 1
  fi

  # Check config
  if [ ! -f "$CONFIG_FILE" ]; then
    error "Config not found: $CONFIG_FILE"
    exit 1
  fi

  # Run TrendRadar
  cd "$TRENDRADAR_DIR"
  CONFIG_PATH="config/openhw_config.yaml" "$VENV_PYTHON" -m trendradar 2>&1 | \
    grep -E '^\[RSS\]|成功|失败|获取.*条|抓取完成|Warning' || true
  cd "$ROOT_DIR"

  ok "TrendRadar fetch complete."
  echo ""
fi

# ─── Step 2: Build news-digest.json ──────────────────────────
if [ "$DO_BUILD" = true ]; then
  info "Step 2/2: Building news-digest.json..."

  node "$ROOT_DIR/scripts/build-news-digest.mjs"

  echo ""
  ok "News digest updated: src/data/news-digest.json"

  # Show summary
  if command -v node &>/dev/null; then
    node -e "
      const d = require('$ROOT_DIR/src/data/news-digest.json');
      console.log('');
      console.log('  Summary:');
      console.log('    Week of:     ' + d.weekOf);
      console.log('    Relevant:    ' + d.stats.totalRelevant + ' articles');
      console.log('    Total items: ' + d.items.length);
      console.log('    Sources:     ' + d.sources.length);
      console.log('    Highlights:  ' + d.highlights.length + ' categories');
      console.log('    Top tags:    ' + d.stats.topTags.map(t => t.tag + '(' + t.count + ')').join(', '));
    "
  fi
fi

echo ""
echo "═══════════════════════════════════════════════════"
ok "Done! Run 'npm run dev' to preview the news page."
echo "═══════════════════════════════════════════════════"
