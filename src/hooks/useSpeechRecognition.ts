import { useState, useEffect } from 'react'

const useSpeechRecognition = () => {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [hasRecognitionSupport, setHasRecognitionSupport] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      setHasRecognitionSupport(true)
    }
  }, [])

  const startListening = () => {
    if (!hasRecognitionSupport) return

    setIsListening(true)
    setTranscript('')
    
    // @ts-ignore - webkitSpeechRecognition is not in the TypeScript DOM types
    const recognition = new window.webkitSpeechRecognition()
    recognition.continuous = true
    recognition.interimResults = true

    recognition.onresult = (event: any) => {
      const currentTranscript = Array.from(event.results)
        .map((result: any) => result[0])
        .map((result) => result.transcript)
        .join('')
      setTranscript(currentTranscript)
    }

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error', event.error)
      setIsListening(false)
    }

    recognition.start()
  }

  const stopListening = () => {
    setIsListening(false)
  }

  return {
    isListening,
    transcript,
    startListening,
    stopListening,
    hasRecognitionSupport
  }
}

export default useSpeechRecognition