import { useRef, useEffect } from "react";
import { Rows } from "@canva/app-ui-kit";
import { Outlet, useLocation } from "react-router-dom";
import { Footer } from "./components";
import * as styles from "styles/components.css";

export const Home = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  //เลื่อนไปบนสุดทุกครั้งที่เปลี่ยนหน้า
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]); 

  return (
    <div ref={scrollRef} className={styles.scrollContainer}>
      <Rows spacing="2u">
        <Outlet />
        <Footer />
      </Rows>
    </div>
  );
};
