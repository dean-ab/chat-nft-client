import { useEffect, useRef } from "react";
import { MantineProvider } from "@mantine/core";
import { UploadImage } from "./UploadImage";
import { v4 as uuid } from "uuid";

const App = () => {
  const userIdRef = useRef<string>();

  useEffect(() => {
    const idFromLocalStorage = window.localStorage.getItem("userId");

    if (!idFromLocalStorage) {
      const id = uuid();
      userIdRef.current = id;
      window.localStorage.setItem("userId", id);
    } else {
      userIdRef.current = idFromLocalStorage;
    }
  }, []);

  return (
    <MantineProvider withNormalizeCSS>
      <div style={{ width: "100vw", height: "100vh" }}>
        <UploadImage />
      </div>
    </MantineProvider>
  );
};

export default App;
