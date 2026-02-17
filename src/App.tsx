import { ConfigProvider } from "antd";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Entry from "./routes/Entry";
import { theme } from "../theme"

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ConfigProvider
      theme={theme}
    >
     <Entry />
      <ReactQueryDevtools initialIsOpen={false} />
    </ConfigProvider>
  </QueryClientProvider>
);

export default App;
