"use client";

import { store } from "@/redux/store/store";
import { usePathname } from "next/navigation";
import { Provider } from "react-redux";
import { HeroUIProvider } from "@heroui/react";
import Login from "@/components/routes/auth/login";
import SignUp from "@/components/routes/auth/sign-up/sign-up";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Suspense } from "react";
// List of paths where header and footer should not be shown
const HIDDEN_LAYOUT_PATHS = [
  "/user/intro",
  "/new_project",
  "user/dashboard",
  "community/chat",
  "assistent/request",
  "community/chat/c",
] as const;

const ClientProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const pathname = usePathname();

  // Check if current path is in the list of paths where layout should be hidden
  const shouldHideLayout = HIDDEN_LAYOUT_PATHS.some((path) =>
    pathname.includes(path)
  );

  // Inverse the condition for better readability
  const showLayout = !shouldHideLayout;

  return (
    <Provider store={store}>
      {/* <ThemeProvider> */}
      {/* <header className="sticky top-0 z-50 bg-background"> */}
      {/* </header> */}
      <HeroUIProvider>
        <NextThemesProvider attribute="class" defaultTheme="dark">
          {children}
          <Login  />
          <SignUp />
        </NextThemesProvider>
      </HeroUIProvider>
      {/* </ThemeProvider> */}
      {/* {showLayout && <Footer />} */}
    </Provider>
  );
};

export default ClientProvider;
