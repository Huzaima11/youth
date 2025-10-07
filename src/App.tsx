// Import Dependencies

import { AuthProvider } from "./context/AuthContext";
import AppRoutes from "./routes/AppRoutes";

// Local Imports


// ----------------------------------------------------------------------

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
