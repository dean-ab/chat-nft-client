import React, { useState } from "react";
import {
  Button,
  Center,
  Container,
  Divider,
  Flex,
  Input,
  Loader,
  Paper,
  Textarea,
  Title,
} from "@mantine/core";
import * as api from "./api";
import { NavLink, useNavigate } from "react-router-dom";

export type NFTImage = {
  imageUrl: string;
  name: string;
};
interface IProps {
  onImageUploaded: (image: NFTImage) => void;
}

export const UploadImage = ({ onImageUploaded }: IProps) => {
  const [prompt, setPrompt] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!name || !prompt) {
      return;
    }

    setIsLoading(true);
    try {
      const response = await api.createNft(name, prompt);
      const imageUrl = response.data.data[0].url;

      if (imageUrl) {
        onImageUploaded({ name, imageUrl });
        navigate("/images");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Container size="xs" px="xs" my="lg">
      <Paper shadow="sm" radius="lg" withBorder sx={{ padding: "4rem" }}>
        <Flex direction={"column"} gap={30}>
          <Title align="center" order={1}>
            Fireblocks Chat NFT 🎡
          </Title>
          <Divider />
          <Input.Wrapper label="Your NFT name" required>
            <Input
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setName(e.target.value)
              }
              value={name}
              placeholder="Your NFT name"
              radius="md"
            />
          </Input.Wrapper>
          <Textarea
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setPrompt(e.target.value)
            }
            value={prompt}
            placeholder="Your comment"
            label="NFT Prompt"
            withAsterisk
          />
          <Flex direction={"column"}>
            <Button onClick={isLoading ? () => {} : handleSubmit}>
              {isLoading ? (
                <Loader color="white" size="sm" variant="dots" />
              ) : (
                "Submit"
              )}
            </Button>
            <Divider my="sm" />
            <Center>
              <NavLink to="/images">
                <Button variant="white">Or just go to see my NFTs</Button>
              </NavLink>
            </Center>
          </Flex>
        </Flex>
      </Paper>
    </Container>
  );
};
