"use client"

import { Button, Box } from "@chakra-ui/react";
import { useState } from "react";

export default function YoutubeVideo({ videoId }: { videoId: string }) {
  const [show, setShow] = useState(false)
  return (
    <Box mt={2}>
      <Button onClick={() => setShow(!show)}>{show ? 'Hide Video' : 'Show Video'}</Button>

      {show ?
        <Box my={5}>
          <iframe width="680" height="430" src={`https://www.youtube.com/embed/${videoId}?&autoplay=1`} allowFullScreen />
        </Box>
        : null}
    </Box>

  )
}
