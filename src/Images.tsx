import {
  Card,
  Grid,
  Title,
  Image,
  Text,
  Flex,
  Button,
  Container,
  Divider,
} from "@mantine/core";
import React from "react";
import { NavLink } from "react-router-dom";
import { NFTImage } from "./UploadImage";

interface IProps {
  images: NFTImage[];
}

const NFTCard = ({ image }: { image: NFTImage }) => {
  return (
    <Card shadow="sm" p="xl">
      <Card.Section>
        <Image src={image.imageUrl} />
      </Card.Section>

      <Text weight={500} size="lg" mt="md">
        {image.name}
      </Text>
    </Card>
  );
};

export const Images: React.FC<IProps> = ({ images }) => {
  return (
    <Container mt="lg">
      <Flex justify={"space-between"}>
        <Title>My Generated NFTs 👾</Title>
        <NavLink to="/">
          <Button>Create More</Button>
        </NavLink>
      </Flex>
      <Divider my="lg" />
      <Grid>
        {images.map((image) => (
          <Grid.Col span={4}>
            <NFTCard image={image} />
          </Grid.Col>
        ))}
      </Grid>
    </Container>
  );
};
