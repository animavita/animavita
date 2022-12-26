declare module "*.svg"
declare module '*.png' {
  const value: import('react-native').ImageSourcePropType;
  export default value;
}