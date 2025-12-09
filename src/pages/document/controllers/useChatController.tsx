import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useParams } from '@tanstack/react-router'
import { useCallback, useEffect, useRef, useState } from 'react'
import type { ChatHistoryResponse, Message } from '@/pages/document/core'
import { aiService } from '@/services'
import { QUERY_KEY } from '@/constants'

const useChatController = () => {
  const { id: documentId } = useParams({
    from: '/_authenticated/documents/$id',
  })
  const [inputValue, setInputValue] = useState('')
  const [messages, setMessages] = useState<Array<Message>>([])

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const queryClient = useQueryClient()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const {
    data: chatHistory = [],
    isSuccess: isSuccessChatHistory,
    isLoading: isLoadingChatHistory,
  } = useQuery<Array<ChatHistoryResponse>>({
    queryKey: [QUERY_KEY.CHAT_HISTORY, documentId],
    queryFn: () => aiService.getChatHistory(documentId),
    enabled: !!documentId,
  })

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isSuccessChatHistory) setMessages(chatHistory)
  }, [isSuccessChatHistory, chatHistory])

  const { mutate: sendMessageMutation, isPending: isSending } = useMutation({
    mutationFn: aiService.sendMessage,
    onSuccess: (data) => {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: data.answer },
      ])
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.CHAT_HISTORY, documentId],
      })
    },
    onError: (error) => {
      console.error('Chat error:', error)
      // Remove the user message if error occurred
      setMessages((prev) => prev.slice(0, -1))
    },
  })

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value)
  }

  const handleSend = useCallback(() => {
    if (!inputValue.trim() || isSending) return

    const question = inputValue.trim()
    setMessages((prev) => [...prev, { role: 'user', content: question }])
    setInputValue('')
    sendMessageMutation({ documentId, question })
  }, [inputValue, isSending, documentId, sendMessageMutation])

  const handleKeyPress = useCallback(
    (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault()
        handleSend()
      }
    },
    [handleSend],
  )

  return {
    messages,
    isSending,
    inputValue,
    isLoadingChatHistory,
    messagesEndRef,
    handleSend,
    handleKeyPress,
    handleInputChange,
  }
}

export default useChatController
