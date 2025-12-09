import { Avatar, Button, Card, Input, Spin } from 'antd'
import { Send, Sparkles, UserRound } from 'lucide-react'
import { Activity } from 'react'
import ReactMarkdown from 'react-markdown'
import ChatLoadingIndicator from '@/pages/document/components/ChatLoadingIndicator'
import { useChatController } from '@/pages/document/controllers'
import { textareaAutoSize } from '@/pages/document/core'
import { useAuthStore } from '@/stores'
import { cn } from '@/utils'

const Chat = () => {
  const userProfileImage = useAuthStore((state) => state.user?.profileImage)

  const {
    messages,
    isSending,
    inputValue,
    isLoadingChatHistory,
    messagesEndRef,
    handleSend,
    handleKeyPress,
    handleInputChange,
  } = useChatController()

  return (
    <Card className="h-[calc(100vh-237px)] flex flex-col bg-gray-50 shadow-md [&_.ant-card-body]:h-full [&_.ant-card-body]:flex [&_.ant-card-body]:flex-col [&_.ant-card-body]:p-0 [&_.ant-card-body]:overflow-hidden">
      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-6 pb-4">
        <div className="max-w-5xl mx-auto w-full space-y-6">
          <Activity mode={isLoadingChatHistory ? 'visible' : 'hidden'}>
            <div className="flex items-center justify-center pt-[30%]">
              <Spin size="large" />
            </div>
          </Activity>

          <Activity
            mode={
              !isLoadingChatHistory && messages.length === 0
                ? 'visible'
                : 'hidden'
            }
          >
            <div className="flex items-center justify-center pt-[30%]">
              <p className="text-gray-400 text-center text-base">
                Start a conversation by asking a question about the document
              </p>
            </div>
          </Activity>

          <Activity
            mode={
              !isLoadingChatHistory && messages.length > 0
                ? 'visible'
                : 'hidden'
            }
          >
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  'flex items-start gap-4',
                  message.role === 'user' ? 'flex-row-reverse' : 'flex-row',
                )}
              >
                {/* Avatar */}
                {message.role === 'assistant' ? (
                  <div className="shrink-0">
                    <div className="size-8 rounded-full bg-(--ant-color-primary) flex items-center justify-center">
                      <Sparkles size={16} className="text-white" />
                    </div>
                  </div>
                ) : (
                  <div className="shrink-0">
                    <Avatar
                      size={32}
                      className="bg-gray-300"
                      src={userProfileImage}
                      icon={!userProfileImage && <UserRound size={20} />}
                    />
                  </div>
                )}

                {/* Message Bubble */}
                <div
                  className={`max-w-[85%] rounded-2xl px-5 py-4 ${
                    message.role === 'user'
                      ? 'bg-(--ant-color-primary) text-white'
                      : 'bg-white text-gray-900 shadow-xl'
                  }`}
                >
                  {message.role === 'assistant' ? (
                    <div className="text-sm leading-relaxed prose prose-sm max-w-none [&_p]:my-2 [&_p:first-child]:mt-0 [&_p:last-child]:mb-0 [&_ul]:my-2 [&_ol]:my-2 [&_li]:my-1 [&_strong]:font-semibold [&_code]:bg-gray-100 [&_code]:px-1 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-xs [&_pre]:bg-gray-100 [&_pre]:p-2 [&_pre]:rounded [&_pre]:overflow-x-auto [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_h1]:text-lg [&_h1]:font-bold [&_h1]:my-2 [&_h2]:text-base [&_h2]:font-bold [&_h2]:my-2 [&_h3]:text-sm [&_h3]:font-bold [&_h3]:my-2">
                      <ReactMarkdown>{message.content}</ReactMarkdown>
                    </div>
                  ) : (
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">
                      {message.content}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </Activity>

          {/* Loading indicator */}
          <Activity mode={isSending ? 'visible' : 'hidden'}>
            <ChatLoadingIndicator />
          </Activity>
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 bg-white p-4 shrink-0">
        <div className="flex items-end gap-3 max-w-5xl mx-auto w-full px-2">
          <Input.TextArea
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
            placeholder="Ask a follow-up question..."
            autoSize={textareaAutoSize}
            className="flex-1"
            disabled={isSending}
            autoFocus
          />
          <Button
            type="primary"
            icon={<Send size={16} />}
            onClick={handleSend}
            disabled={!inputValue.trim() || isSending}
            className="shrink-0 h-auto px-4 py-2"
          >
            Send
          </Button>
        </div>
      </div>
    </Card>
  )
}

export default Chat
