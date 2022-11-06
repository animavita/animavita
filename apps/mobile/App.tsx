import { Provider as PaperProvider } from "react-native-paper";
import MainNavigator from "./src/navigation/main-navigator";
import theme from "./src/theme";

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <MainNavigator />
    </PaperProvider>
  );
}
