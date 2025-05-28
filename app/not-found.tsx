import { Container, Heading } from '@chakra-ui/react'
import Link from 'next/link'

export default function NotFound() {
  return (
    <Container py={10}>
      <Heading size={"6xl"}>Not Found</Heading>
      <p>Could not find requested resource</p>
      <Link href="/">Return Home</Link>
    </Container>
  )
}
