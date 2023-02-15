import { useEffect, useRef, useState } from "react";
import { MantineProvider, Paper, Text } from "@mantine/core";
import { NFTImage, UploadImage } from "./UploadImage";
import { v4 as uuid } from "uuid";
import {
  BrowserRouter,
  createBrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import { Images } from "./Images";
import * as api from "./api";

const nfts = [
  {
    name: "Sea Horse on Fire",
    imageUrl:
      "https://oaidalleapiprodscus.blob.core.windows.net/private/org-IGyEvmyJYF4vdhZNXw93Ihhb/user-xFauKS8vWiyhndkf0aq8PeR7/img-OwzBl1JMyLcaJtakLZjfPTDD.png?st=2023-02-15T11%3A56%3A29Z&se=2023-02-15T13%3A56%3A29Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-02-15T02%3A30%3A29Z&ske=2023-02-16T02%3A30%3A29Z&sks=b&skv=2021-08-06&sig=Mz/7CVl2D4X4kb3P7bAsOyBhjrNpASw8ftiUuR7x2rw%3D",
  },
  {
    name: "Gorillaz Concert",
    imageUrl:
      "https://oaidalleapiprodscus.blob.core.windows.net/private/org-IGyEvmyJYF4vdhZNXw93Ihhb/user-xFauKS8vWiyhndkf0aq8PeR7/img-JmYfhuKvnsh1eRGiOrxNz2wA.png?st=2023-02-15T12%3A24%3A01Z&se=2023-02-15T14%3A24%3A01Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-02-14T19%3A25%3A59Z&ske=2023-02-15T19%3A25%3A59Z&sks=b&skv=2021-08-06&sig=C8GVCN8J3z9IwZ%2BSYINsOf5dyg8BhadpyrdcveEJmjY%3D",
  },
  {
    name: "Sea Cows",
    imageUrl:
      "https://oaidalleapiprodscus.blob.core.windows.net/private/org-IGyEvmyJYF4vdhZNXw93Ihhb/user-xFauKS8vWiyhndkf0aq8PeR7/img-KeOnWN2PsmPNMncxc0yACq5n.png?st=2023-02-15T12%3A52%3A49Z&se=2023-02-15T14%3A52%3A49Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-02-15T02%3A33%3A17Z&ske=2023-02-16T02%3A33%3A17Z&sks=b&skv=2021-08-06&sig=V8e/xJiS86CY6MmylTYPvYEd81cgMCCilxAtUY94Lug%3D",
  },
  {
    name: "Sea Horse on Fire",
    imageUrl:
      "https://oaidalleapiprodscus.blob.core.windows.net/private/org-IGyEvmyJYF4vdhZNXw93Ihhb/user-xFauKS8vWiyhndkf0aq8PeR7/img-OwzBl1JMyLcaJtakLZjfPTDD.png?st=2023-02-15T11%3A56%3A29Z&se=2023-02-15T13%3A56%3A29Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-02-15T02%3A30%3A29Z&ske=2023-02-16T02%3A30%3A29Z&sks=b&skv=2021-08-06&sig=Mz/7CVl2D4X4kb3P7bAsOyBhjrNpASw8ftiUuR7x2rw%3D",
  },
  {
    name: "Sea Horse on Fire",
    imageUrl:
      "https://oaidalleapiprodscus.blob.core.windows.net/private/org-IGyEvmyJYF4vdhZNXw93Ihhb/user-xFauKS8vWiyhndkf0aq8PeR7/img-OwzBl1JMyLcaJtakLZjfPTDD.png?st=2023-02-15T11%3A56%3A29Z&se=2023-02-15T13%3A56%3A29Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-02-15T02%3A30%3A29Z&ske=2023-02-16T02%3A30%3A29Z&sks=b&skv=2021-08-06&sig=Mz/7CVl2D4X4kb3P7bAsOyBhjrNpASw8ftiUuR7x2rw%3D",
  },
  {
    name: "Sea Horse on Fire",
    imageUrl:
      "https://oaidalleapiprodscus.blob.core.windows.net/private/org-IGyEvmyJYF4vdhZNXw93Ihhb/user-xFauKS8vWiyhndkf0aq8PeR7/img-OwzBl1JMyLcaJtakLZjfPTDD.png?st=2023-02-15T11%3A56%3A29Z&se=2023-02-15T13%3A56%3A29Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-02-15T02%3A30%3A29Z&ske=2023-02-16T02%3A30%3A29Z&sks=b&skv=2021-08-06&sig=Mz/7CVl2D4X4kb3P7bAsOyBhjrNpASw8ftiUuR7x2rw%3D",
  },
];

const App = () => {
  const [userId, setUserId] = useState<string>();

  const [images, setImages] = useState<NFTImage[]>([]);

  const onImageUpload = (image: NFTImage) => {
    setImages((old) => [...old, image]);
  };

  useEffect(() => {
    const idFromLocalStorage = window.localStorage.getItem("userId");

    if (!idFromLocalStorage) {
      const id = uuid();
      setUserId(id);
      window.localStorage.setItem("userId", id);
    } else {
      setUserId(idFromLocalStorage);
    }
  }, []);

  useEffect(() => {
    // TODO: Fetch images by id.
    api.getMyImages().then(console.log);
  }, []);

  return (
    <MantineProvider withNormalizeCSS>
      <div style={{ width: "100vw", height: "100vh" }}>
        {userId && (
          <Paper
            p="md"
            radius="lg"
            withBorder
            sx={{ position: "fixed", bottom: 10, right: 10, zIndex: 100000 }}
          >
            <Text size={"xs"}>{userId}</Text>
          </Paper>
        )}
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={<UploadImage onImageUploaded={onImageUpload} />}
            />
            <Route path="/images" element={<Images images={nfts} />} />
          </Routes>
        </BrowserRouter>
      </div>
    </MantineProvider>
  );
};

export default App;
