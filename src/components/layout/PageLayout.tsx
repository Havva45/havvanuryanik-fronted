import { useEffect, type ReactNode } from "react";
import Header from "./Header";
import Navigation from "./Navigation";
import Footer from "./Footer";

interface PageLayoutProps {
  title: string;
  text?: string;
  children: ReactNode;
}

function PageLayout({ title, text, children }: PageLayoutProps) {
  useEffect(() => {
    document.title = `${title} — Kampüs Etkinlikleri`;
    window.scrollTo(0, 0);
  }, [title]);

  return (
    <>
      <header className="ust-banner">
        <Header title={title} text={text} />
        <Navigation />
      </header>
      <main>{children}</main>
      <Footer />
    </>
  );
}

export default PageLayout;
