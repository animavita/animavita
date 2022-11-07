import { QueryClientProvider } from "@tanstack/react-query";
import { Provider as PaperProvider } from "react-native-paper";
import MainNavigator from "./src/navigation/main-navigator";
import queryClient from "./src/services/query-client-instance";
import theme from "./src/theme";

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider theme={theme}>
        <MainNavigator />
      </PaperProvider>
    </QueryClientProvider>
  );
}
