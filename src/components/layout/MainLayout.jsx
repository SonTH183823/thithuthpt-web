import React, { useEffect, useState } from "react";
export default function MainLayout({ children }) {
  const [theme, setTheme] = useState("light");
  // const user = useSelector((state) => state.auth.profile);
  return (
    <div data-theme={theme}>
      <main>{children}</main>
    </div>
  );
}
