"use client";

import React, { forwardRef, ReactNode, useEffect } from "react";
import NavigationBar from "../common/NavigationBar";
import Footer from "../common/Footer";

interface PageContainerProps extends React.HTMLAttributes<HTMLElement> {
  className?: string;
  children: ReactNode;
  withNavbar?: boolean;
  withFooter?: boolean;
  withContainer?: boolean;
}

const PageContainer = forwardRef<HTMLElement, PageContainerProps>(
  ({ className, children, withNavbar = false, withFooter = false, withContainer }, ref) => {

    useEffect(() => {
      const script = document.createElement("script");
      script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
      script.setAttribute("data-client-key", process.env.NEXT_PUBLIC_MIDTRANS_CLIENT || "");
      script.async = true;

      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    },)

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
