import { getCrosswords } from "@/lib/crossword";
import { Container, GridItem, Card, SimpleGrid, For } from "@chakra-ui/react"
import Link from 'next/link'
import { notFound } from "next/navigation";

export default async function Home() {
  try {
    const crosswords = await getCrosswords();

    return (
      <main>
        <Container my={10}>
          <SimpleGrid minChildWidth="xs" gap={2}>
            <For each={crosswords}>
              {p =>
                <Link key={p.dayNo.toString()} href={p.dayNo.toString()}>
                  <GridItem colSpan={1}>
                    <Card.Root textAlign={"center"} justifyContent={"center"} h={10}>
                      <Card.Title>{p.dayNo}</Card.Title>
                    </Card.Root>
                  </GridItem>
                </Link>
              }
            </For>
          </SimpleGrid>
        </Container>
      </main>
    )
  } catch (error) {
    console.log(error)

    return notFound()
  }
}
