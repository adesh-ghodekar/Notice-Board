import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

/**
 * Guards a page behind an authenticated session. Redirects to /login
 * once the session status resolves to "unauthenticated".
 *
 *   const { session, isLoading } = useRequireAuth();
 *   if (isLoading) return <LoadingSpinner />;
 *   if (!session) return null; // redirect is already in flight
 */
export function useRequireAuth() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;

    if (!session) {
      router.replace("/login");
    }
  }, [session, status, router]);

  return { session, status, isLoading: status === "loading" };
}
