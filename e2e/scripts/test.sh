#!/usr/bin/env bash
# Re-seeds the database and runs every flow. Pass --ios to run on the iOS simulator.
set -euo pipefail
cd "$(dirname "$0")/.."

PLATFORM=android
FLOWS=()
for arg in "$@"; do
  case $arg in
    --ios) PLATFORM=ios ;;
    *) FLOWS+=("$arg") ;;
  esac
done

docker-compose -f ../docker-compose.yml exec -T backend pnpm seed

if [ "$PLATFORM" = android ]; then
  # The emulator can't reach the Mac's localhost on its own; the simulator can.
  adb reverse tcp:4566 tcp:4566
  # Maestro waits for the screen to settle after each step; no animations, less waiting
  adb shell 'for s in window_animation_scale transition_animation_scale animator_duration_scale; do settings put global $s 0; done'
fi

MAESTRO_CLI_NO_ANALYTICS=1 maestro test --platform "$PLATFORM" "${FLOWS[@]:-.}"
