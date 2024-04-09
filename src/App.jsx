import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools/build/lib/devtools";

import GlobalStyles from "./styles/GlobalStyles";
import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import Cabins from "./pages/Cabins";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import Account from "./pages/Account";
import Login from "./pages/Login";
import Booking from "./pages/Booking";
import Checkin from "./pages/Checkin";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./ui/AppLayout";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./ui/ProtectedRoute";
import { DarkModeProvider } from "./context/DarkModeContext";

// what react query does is to enable the handling the of remote state that is fetched from some server, react query is able to handle the fetching of this data- keep it in sync, through state time and invalidate queries with any changes
// react query
//1.initializing  react query"@tanstack/react-query": "^4.36.1"
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
      //  60 * 1000
    },
  },
});

// react query
// 2 wrap everything in a query client porovider
// 3. use the ReactQueryDevtools as

////styled componenets
// 2. provide the global style  file as sibling of the components that need to be use them

// app is not part of the application tree
function App() {
  return (
    <DarkModeProvider>
      <QueryClientProvider client={queryClient}>
        {/* sibling */}
        <ReactQueryDevtools initialIsOpen={false} />
        {/* sibling */}
        <GlobalStyles />
        <BrowserRouter>
          {/* dont include a path in your index element */}
          <Routes>
            <Route
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate replace to="dashboard" />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="bookings" element={<Bookings />} />
              <Route path="bookings/:bookingId" element={<Booking />} />
              <Route path="checkin/:bookingId" element={<Checkin />} />
              <Route path="cabins" element={<Cabins />} />
              <Route path="users" element={<Users />} />
              <Route path="settings" element={<Settings />} />
              <Route path="account" element={<Account />} />
            </Route>

            <Route path="login" element={<Login />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
              backgroundColor: "var(--color-grey-0)",
              color: "var(--color-grey-700)",
            },
          }}
        />
      </QueryClientProvider>
    </DarkModeProvider>
  );
}

export default App;
