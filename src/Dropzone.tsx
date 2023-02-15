import { Group, Text, useMantineTheme } from "@mantine/core";
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from "@mantine/dropzone";

interface IProps {
  onDrop: DropzoneProps["onDrop"];
}

export function DropzoneComponent({ onDrop }: IProps) {
  return (
    <Dropzone
      maxFiles={1}
      onDrop={onDrop}
      onReject={(files) => console.log("rejected files", files)}
      maxSize={3 * 1024 ** 2}
      accept={IMAGE_MIME_TYPE}
    >
      <Group
        position="center"
        spacing="xl"
        style={{ minHeight: 220, pointerEvents: "none" }}
      >
        <Dropzone.Accept>"✅"</Dropzone.Accept>
        <Dropzone.Reject>"❌"</Dropzone.Reject>
        <Dropzone.Idle>"😴"</Dropzone.Idle>

        <div>
          <Text size="xl" inline>
            Drag images here or click to select files
          </Text>
          <Text size="sm" color="dimmed" inline mt={7}>
            Attach as many files as you like, each file should not exceed 5mb
          </Text>
        </div>
      </Group>
    </Dropzone>
  );
}
