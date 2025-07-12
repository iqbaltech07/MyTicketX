"use client";

import React, { forwardRef, ReactNode } from "react";
import NavigationBar from "../common/NavigationBar";
import Footer from "../common/Footer";
import { usePathname } from "next/navigation";
import Sidebar from "../common/Sidebar";

interface PageContainerProps extends React.HTMLAttributes<HTMLElement> {
  className?: string;
  children: ReactNode;
  withNavbar?: boolean;
  withFooter?: boolean;
  withContainer?: boolean;
  withSidebar?: boolean;
}

const PageContainer = forwardRef<HTMLElement, PageContainerProps>(
  ({ className, children, withNavbar = false, withFooter = false, withSidebar, withContainer }, ref) => {
    const pathname = usePathname();
    const isAdminPage = pathname.startsWith("/admin");

    return (
      <>
        {isAdminPage ? (
          <div className={`${withSidebar && "flex flex-1 gap-2"}`}>
            {withSidebar && <Sidebar />}
            <main className={`"flex-1 p-5 my-12" ${className}`}>{children}</main>
          </div>
        ) : (
          <>
            {withNavbar && <NavigationBar />}
            <main
              ref={ref}
              className={`${withContainer ? "container" : ""} mx-auto ${className}`}
            >
              {children}
            </main>
            {withFooter && <Footer />}
          </>
        )}
      </>
    );
  }
);

PageContainer.displayName = "PageContainer";

export default PageContainer;
