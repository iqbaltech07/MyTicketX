"use client";

import React, { forwardRef, ReactNode } from "react";
import NavigationBar from "../common/NavigationBar";
import Footer from "../common/Footer";

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
    return (
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
    );
  }
);

PageContainer.displayName = "PageContainer";

export default PageContainer;
