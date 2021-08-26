import { ReactNode } from "react";

import Header from "./Header";

function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main>
        <div className="py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">{children}</div>
      </main>
    </>
  );
}

export default Layout;
