"use client"

import { ICrossword } from "@/lib/crossword.interface"
import { Alert, For, PinInput, usePinInput, VStack } from "@chakra-ui/react"
import YoutubeVideo from "./YoutubeVideo"

export default function MultiWordInput({ crossword, correctAnswer }: { crossword: ICrossword, correctAnswer: string }) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const stores = crossword.ansLen.map(() => usePinInput({ type: "alphanumeric" }))

  const AnswerResult = () => {
    const givenAnswer = stores.map(s => s.value.join("")).join(" ")
    const isCorrectAnswerKnown = correctAnswer.length > 0
    const isCorrectAnswer = givenAnswer.toLocaleUpperCase() === correctAnswer.toLocaleUpperCase()
    const isFullAnswer = givenAnswer.length === correctAnswer.length

    if (isCorrectAnswerKnown === false) {
      return (
        <Alert.Root size={"lg"} status={"info"} >
          <Alert.Indicator />
          <Alert.Content>

            <Alert.Title>{"I don't know!"}</Alert.Title>
            <Alert.Description>
              <p>
                {"We currently don't know the correct answer to this one."}
              </p>
              <p>
                {"You can check your answer manually."}
              </p>
              <YoutubeVideo videoId={crossword.videoId} />
            </Alert.Description>
          </Alert.Content>
        </Alert.Root>
      )
    }

    if (isFullAnswer === false) return null
    if (isCorrectAnswer)
      return (
        <Alert.Root size={"lg"} status={"success"} >
          <Alert.Indicator />
          <Alert.Title>{"YES!"}</Alert.Title>
        </Alert.Root>
      )
    else
      return (
        <Alert.Root size={"lg"} status={"error"} >
          <Alert.Indicator />
          <Alert.Title>{"No!"}</Alert.Title>
        </Alert.Root>
      )
  }
  return (
    <VStack gap={3}>
      <For each={crossword.ansLen}>
        {(word, i) =>
          <PinInput.RootProvider value={stores[i]} size={{ base: 'xl', md: '2xl' }} key={`word-${i}`}>
            <PinInput.Control>
              <For each={Array(word).fill(0)}>
                {(_, j) =>
                  <PinInput.Input index={j} key={`word-${i}-letter-${j}`} p={0} />
                }
              </For>
            </PinInput.Control>
          </PinInput.RootProvider>
        }
      </For>

      <AnswerResult />
    </VStack>
  )
}
