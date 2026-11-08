#!/usr/bin/env bash
# Starts everything the e2e flows need: the backend, an Android emulator or iOS
# simulator, and the e2e build of the app. Safe to re-run; it skips what is
# already running.
# Options: --ios to use the iOS simulator, --skip-build to keep the installed app.
set -euo pipefail
cd "$(dirname "$0")/../.."

PLATFORM=android
SKIP_BUILD=false
for arg in "$@"; do
  case $arg in
    --ios) PLATFORM=ios ;;
    --skip-build) SKIP_BUILD=true ;;
    *) echo "Unknown option: $arg" >&2; exit 1 ;;
  esac
done

wait_for() { # $1 = what, then the command to retry
  local what=$1; shift
  for _ in $(seq 1 90); do "$@" >/dev/null 2>&1 && return 0; sleep 2; done
  echo "Timed out waiting for $what" >&2; exit 1
}

start_android() {
  if [[ "$(adb devices)" == *$'\tdevice'* ]]; then
    echo "› Android emulator already running"
    return
  fi
  local emulator="${ANDROID_HOME:-$HOME/Library/Android/sdk}/emulator/emulator"
  local avd="${E2E_AVD:-$("$emulator" -list-avds | head -1)}"
  if [ -z "$avd" ]; then
    echo "No Android emulator found. Create one in Android Studio > Device Manager." >&2
    exit 1
  fi
  echo "› Starting the Android emulator ($avd)"
  "$emulator" -avd "$avd" >/dev/null 2>&1 &
  adb wait-for-device
  wait_for "the emulator to boot" sh -c '[ "$(adb shell getprop sys.boot_completed | tr -d "\r")" = 1 ]'
}

start_ios() {
  if [[ "$(xcrun simctl list devices booted)" == *Booted* ]]; then
    echo "› iOS simulator already running"
    return
  fi
  local sim="${E2E_SIMULATOR:-$(xcrun simctl list devices available | grep -m1 -o 'iPhone[^(]*' | sed 's/ *$//')}"
  if [ -z "$sim" ]; then
    echo "No iPhone simulator found. Add one in Xcode > Window > Devices and Simulators." >&2
    exit 1
  fi
  echo "› Starting the iOS simulator ($sim)"
  xcrun simctl boot "$sim"
  open -a Simulator
  xcrun simctl bootstatus "$sim" >/dev/null
}

# The backend boots while the device starts and the app builds; neither needs it.
echo "› Starting the backend (Docker)"
docker-compose up -d

"start_$PLATFORM"

if $SKIP_BUILD; then
  echo "› Skipping the app build"
else
  echo "› Building and installing the e2e app (a few minutes)"
  pnpm --filter mobile "build:e2e:$PLATFORM"
fi

wait_for "the backend on :3000" curl -s localhost:3000

if [ "$PLATFORM" = ios ]; then
  echo "✓ Ready. Run the flows with: pnpm e2e test:ios"
else
  echo "✓ Ready. Run the flows with: pnpm e2e test"
fi
