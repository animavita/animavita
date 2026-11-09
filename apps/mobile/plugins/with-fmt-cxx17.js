// Xcode 26's compiler rejects the fmt 11.0.2 that React Native 0.79 bundles
// ("call to consteval function ... is not a constant expression"). Building fmt
// as C++17 skips the consteval code. Remove once React Native ships a fixed fmt.
const { withDangerousMod } = require('expo/config-plugins');
const fs = require('fs');
const path = require('path');

const MARKER = '# with-fmt-cxx17';
const SNIPPET = `
    ${MARKER}
    installer.pods_project.targets.each do |target|
      next unless target.name == 'fmt'
      target.build_configurations.each do |build_config|
        build_config.build_settings['CLANG_CXX_LANGUAGE_STANDARD'] = 'c++17'
      end
    end
`;

module.exports = (config) =>
  withDangerousMod(config, [
    'ios',
    (modConfig) => {
      const podfilePath = path.join(modConfig.modRequest.platformProjectRoot, 'Podfile');
      const podfile = fs.readFileSync(podfilePath, 'utf8');
      if (!podfile.includes(MARKER)) {
        // After react_native_post_install, so React Native's own C++ setting doesn't win
        const patched = podfile.replace(
          /react_native_post_install\([\s\S]*?\n\s*\)\n/,
          (m) => m + SNIPPET
        );
        if (patched === podfile)
          throw new Error('with-fmt-cxx17: Podfile post_install hook not found');
        fs.writeFileSync(podfilePath, patched);
      }
      return modConfig;
    },
  ]);
