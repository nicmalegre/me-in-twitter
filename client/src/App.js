import "./App.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { Landing } from "./pages";

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    // Provide the client to your App
    <QueryClientProvider client={queryClient}>
      <Landing />
    </QueryClientProvider>
  );
}

export default App;
