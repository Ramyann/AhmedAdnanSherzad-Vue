// router/guards.ts
import type {
  Router,
  NavigationGuardNext,
  RouteLocationNormalized,
  RouteRecordNormalized,
} from "vue-router";
import { isAuthenticated } from "@/utils/auth";

/**
 * Set up navigation guards for the router
 */
export const setupRouterGuards = (router: Router): void => {
  router.beforeEach(
    (
      to: RouteLocationNormalized,
      _from: RouteLocationNormalized,
      next: NavigationGuardNext,
    ) => {
      // Update document title
      updateDocumentTitle(to);

      // Check authentication status
      const authenticated = isAuthenticated();

      // Guest-only routes
      if (isGuestOnlyRoute(to)) {
        handleGuestRoute(authenticated, next);
      }
      // Protected routes
      else if (isProtectedRoute(to)) {
        handleProtectedRoute(authenticated, to, next);
      }
      // Public routes
      else {
        next();
      }
    },
  );

  router.afterEach(
    (to: RouteLocationNormalized, from: RouteLocationNormalized) => {
      handlePostNavigation(to, from);
    },
  );

  router.onError((error) => {
    console.error("Router navigation error:", error);
  });
};

/** Update document title based on route meta */
const updateDocumentTitle = (route: RouteLocationNormalized) => {
  const title = route.meta?.title as string | undefined;
  if (title) {
    document.title = title;
  }
};

const isGuestOnlyRoute = (route: RouteLocationNormalized): boolean =>
  route.matched.some(
    (record: RouteRecordNormalized) => record.meta?.guest === true,
  );

const isProtectedRoute = (route: RouteLocationNormalized): boolean =>
  route.matched.some(
    (record: RouteRecordNormalized) => record.meta?.requiresAuth === true,
  );

/** Handle guest route navigation */
const handleGuestRoute = (
  authenticated: boolean,
  next: NavigationGuardNext,
) => {
  if (authenticated) {
    next({ name: "Home" });
  } else {
    next();
  }
};

/** Handle protected route navigation */
const handleProtectedRoute = (
  authenticated: boolean,
  to: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  if (!authenticated) {
    next({ name: "Login", query: { redirect: to.fullPath } });
  } else {
    next();
  }
};

/** Handle after navigation */
const handlePostNavigation = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
) => {
  trackPageView(to);
  if (to.name !== from.name) {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
};

/** Analytics tracking */
const trackPageView = (route: RouteLocationNormalized) => {
  const title = route.meta?.title as string | undefined;
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("config", "GA_MEASUREMENT_ID", {
      page_title: title,
      page_path: route.fullPath,
    });
  }
};

/** Role-based access guard */
export const requiresRole = (requiredRoles: string[]) => {
  return (
    _to: RouteLocationNormalized,
    _from: RouteLocationNormalized,
    next: NavigationGuardNext,
  ) => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const userRole = user.role ?? "user";

    if (requiredRoles.includes(userRole)) next();
    else next({ name: "Home" });
  };
};

/** Profile completion guard */
export const requiresCompleteProfile = () => {
  return (
    _to: RouteLocationNormalized,
    _from: RouteLocationNormalized,
    next: NavigationGuardNext,
  ) => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user.profileComplete) next();
    else next({ name: "Profile", query: { complete: "true" } });
  };
};
