import { getCrosswords } from "@/lib/crossword";
import { Container, GridItem, Card, SimpleGrid, For } from "@chakra-ui/react"
import Link from 'next/link'

export default async function Home() {
  const crosswords = await getCrosswords();

  return (
    <main>
      <Container my={10}>
        {/* {JSON.stringify(videos)} */}
        <SimpleGrid minChildWidth="xs" gap={2}>
          <For each={crosswords}>
            {p =>
              <Link key={p.dayNo} href={p.dayNo.toString()}>
                <GridItem colSpan={1}>
                  <Card.Root textAlign={"center"} justifyContent={"center"} h={10}><Card.Title>{p.dayNo}</Card.Title></Card.Root>
                </GridItem>
              </Link>
            }
          </For>
          {/* <h1>hello</h1> */}
        </SimpleGrid>
      </Container>
    </main>
  );
}
