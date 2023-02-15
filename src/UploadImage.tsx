import React, { useState } from "react";
import {
  Button,
  Container,
  Divider,
  Flex,
  Input,
  Paper,
  Textarea,
  Title,
} from "@mantine/core";
import { DropzoneComponent } from "./Dropzone";
import { FileWithPath } from "@mantine/dropzone";

export const UploadImage = () => {
  const [prompt, setPrompt] = useState("");
  const [name, setName] = useState("");

  const onDropImage = (files: FileWithPath[]) => {
    console.log(files);
    const file = files[0];
    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append("file", file, file.name);
    console.log("formData", formData.get("file"));
  };

  const handleSubmit = () => {
    console.log("state", { name, prompt });
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
          <Button onClick={handleSubmit}>Submit</Button>
        </Flex>
      </Paper>
    </Container>
  );
};
