import { Heading, Container, VStack } from "@chakra-ui/react"
import MultiWordInput from "@/components/MultiWordInput"
import { getCorrectAnswer, getCrossword, getCrosswords } from "@/lib/crossword";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const videos = await getCrosswords();

  return videos.map((v) => ({
    dayNo: v.dayNo.toString(),
  }))
}

export default async function Page({
  params,
}: {
  params: Promise<{ dayNo: string }>
}) {
  const { dayNo } = await params
  const crossword = await getCrossword(dayNo);
  const correctAnswer = await getCorrectAnswer(dayNo);

  if (!crossword) return notFound()

  return (
    <main>
      <Container justifyContent={'center'}>
        <VStack gap={10}>
          <Heading textAlign={'center'} mt={20} size={{ base: "3xl", sm: "3xl", md: "4xl", lg: "5xl" }}>
            {crossword.question} ({crossword.ansLen.join(', ')})
          </Heading>

          <MultiWordInput crossword={crossword} correctAnswer={correctAnswer} />
        </VStack>
      </Container>
    </main>

  )
}
