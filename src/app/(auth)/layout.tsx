import { Container } from "@chakra-ui/react";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Container className="flex justify-center items-center h-screen">
        {children}
    </Container>
  );
}