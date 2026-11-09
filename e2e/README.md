# End-to-end smoke tests

[Maestro](https://maestro.mobile.dev) flows that drive the real app on an Android
emulator or an iOS simulator, against the backend running locally in Docker. They check that the main
journeys still work: signing up (with phone verification and location), signing in and out,
browsing and filtering the pet deck, registering and editing pets, and adoption requests from
both sides.

Run them before a production deployment, after a dependency upgrade, or after any
change you're not sure about. They run locally only; CI doesn't run them.

The app under test is a **release build**, so it behaves like the one users get.
The only differences: it talks to your local backend over `http://`, it
doesn't download over-the-air updates, and the phone verification step is always
on (`require_phone_number` in `local-feature-flags.ts`).

## One-time setup

1. Install Maestro: `brew tap mobile-dev-inc/tap && brew install mobile-dev-inc/tap/maestro`.
   The flows are tested with Maestro 2.12.1; newer versions may match or wait differently.
2. Install the repo's dependencies (`pnpm install`). See `CONTRIBUTING.md`.
3. For Android: install Android Studio and create an emulator in **Device Manager**.
   Make sure JDK 17 is installed too.
4. For iOS (macOS only): install Xcode and its iOS platform (**Xcode › Settings ›
   Components**, or `xcodebuild -downloadPlatform iOS`, about 8 GB). It comes with
   iPhone simulators.

## Running

From the repo root:

```sh
pnpm e2e start   # starts the backend and emulator, then builds and installs the app
pnpm e2e test    # seeds the database and runs every flow (about 3 minutes)
```

For iOS, use `pnpm e2e start:ios` and `pnpm e2e test:ios`. The first iOS build takes
10 to 15 minutes.

`start` skips anything that's already running. Building the app takes a few
minutes, so after the first time run `pnpm e2e start --skip-build` unless the app
changed. A change to the app means any change under `apps/mobile`, including
JavaScript, because a release build has its code baked in.

`test` re-seeds the database every time, because some flows write data (an adopter
can request each pet only once). On Android it also turns off the emulator's
animations, which makes each step a bit faster; turn them back on in the
emulator's **Developer options** if you need them.

If you have several emulators, choose one with `E2E_AVD=<name> pnpm e2e start`.
For iOS, choose a simulator with `E2E_SIMULATOR="iPhone 17" pnpm e2e start:ios`.

To run one flow: `pnpm e2e test flows/sign-out.yaml` (or `test:ios`). Watch it in
the emulator or simulator window. The pet photo flows (`owner-create-pet`,
`owner-edit-pet`) only run as part of the whole folder: Maestro looks for
`media/pet.jpg` only among the files it was given.

## Writing or debugging flows

Rebuilding a release app after every edit is slow. While working on flows, use a
debug build with live reload instead (Android only for now):

```sh
pnpm e2e debug:build   # once: build and install the debug app
pnpm e2e debug:metro   # keep it running in its own terminal
```

Then run flows as usual. `maestro studio` shows the screen and lets you try
commands one at a time. `maestro hierarchy` prints what Maestro can see.

Guidelines:

- Find elements by what the user sees: their pt-BR text, or for an icon-only
  button its `accessibilityLabel` (Maestro's `text:` matches both). Add a
  `testID` only when the text isn't stable or unique (the pet card, the sign-in
  form, where "Email" is both label and placeholder), and name it
  `<screen>-<part>-<element>` (`pet-card-active-name`).
- Don't add `timeout:` or `extendedWaitUntil`. Every step already waits up to
  17s for its element; raise it on one step only if it really needs longer (only
  the app's cold start does today, in `subflows/launch-signed-out.yaml`).
- To pick a photo, run `addMedia` with `media/pet.jpg`, then
  `subflows/pick-photo.yaml` with the slot's label.
- Sign in with `subflows/sign-in.yaml` and a seeded account instead of registering
  new users.
- Don't depend on the order of cards in the pet deck. `subflows/remember-active-pet.yaml`
  stores the top card's pet name in `${output.pet}` so you can check that pet later.
- Run new flows on both platforms. iOS differs in a few ways the existing flows
  already handle: everything inside a tappable area (a `Pressable` card, a header
  button) is one element there, so match its text with a pattern like
  `"Rocky([ ,].*)?"`; and `runFlow` with `when: platform:` holds platform-only steps.
- Passing (swipe left) and liking (swipe right) only change the screen for now:
  `pass` and `like` in `use-adoption.ts` are TODOs. Their flows only check that the
  card leaves the deck; add checks when those endpoints exist.

## Troubleshooting

- **Pet cards have no photo.** Photos come from local S3 (LocalStack), not the
  internet. `pnpm e2e test` forwards port 4566 to the emulator; if you run Maestro
  directly, run `adb reverse tcp:4566 tcp:4566` first.
- **The app shows an old version of your change.** You're running the release app
  without rebuilding it. Run `pnpm e2e start` (it rebuilds the app), or use the debug setup above.
- **In debug mode, taps near the bottom of the screen do nothing.** React Native's
  dev warning popups cover them. Start Metro with `pnpm e2e debug:metro` (it hides
  them), not `pnpm mobile start`.
- **In debug mode, edits don't reach the app.** Don't start Metro with `CI=1`; it
  turns off file watching.
- **iOS build fails with "iOS 26.x is not installed".** Install the iOS platform
  (see One-time setup).
- **iOS build ends with "Not authorized to send Apple events to System Events".** The
  app is built and installed; only opening it failed. Allow your terminal under
  **System Settings › Privacy & Security › Automation**, or ignore it and run
  `pnpm e2e start:ios --skip-build`.
