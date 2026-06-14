import { useEffect } from "react";
import AppRouter from "./routes/appRouter";
import { useAuthStore } from "./store/authStore";
import { refresh } from "./lib/api/authApi";

export default function App() {
  const { setAuth, setLoading, clearAuth } = useAuthStore();
  useEffect(() => {
    const restoreSession = async () => {
      try {
        const data = await refresh();
        setAuth(data.user, data.accessToken);
      } catch (err) {
        clearAuth();
      } finally {
        setLoading(false);
      }
    };

    restoreSession();
  }, []);

  return <AppRouter />;
}
