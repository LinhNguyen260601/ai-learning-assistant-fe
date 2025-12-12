import { Button, Card, Empty, Form, Input, InputNumber, Modal } from 'antd'
import Title from 'antd/es/typography/Title'
import { Plus } from 'lucide-react'
import QuizComponent from '@/pages/document/components/Quiz'
import QuizLoading from '@/pages/document/components/QuizLoading'
import { useQuizzesController } from '@/pages/document/controllers'
import {
  QUIZ_NUM_QUESTIONS_RULES,
  QUIZ_TITLE_RULES,
} from '@/pages/document/core'

const Quizzes = () => {
  const {
    form,
    quizzes,
    isLoading,
    isGeneratingQuiz,
    isGenerateQuizModalOpen,
    handleGenerateQuiz,
    openGenerateQuizModal,
    handleCloseGenerateQuizModal,
  } = useQuizzesController()

  if (isLoading) return <QuizLoading />

  return (
    <>
      <Card>
        <header className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <article>
            <Title
              level={1}
              className="mb-2! text-2xl! font-bold! text-gray-900!"
            >
              Your Quizzes
            </Title>
          </article>
          <Button
            type="primary"
            size="large"
            icon={<Plus size={20} />}
            onClick={openGenerateQuizModal}
          >
            Generate New Quiz
          </Button>
        </header>

        {quizzes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch">
            {quizzes.map((quiz) => (
              <QuizComponent key={quiz._id} quiz={quiz} />
            ))}
          </div>
        ) : (
          <Empty
            description="No quizzes yet"
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
        )}
      </Card>

      <Modal
        title="Generate New Quiz"
        centered
        open={isGenerateQuizModalOpen}
        onCancel={handleCloseGenerateQuizModal}
        okText="Generate"
        okButtonProps={{ loading: isGeneratingQuiz }}
        onOk={handleGenerateQuiz}
      >
        <Form form={form} layout="vertical">
          <Form.Item label="Title" name="title" rules={QUIZ_TITLE_RULES}>
            <Input placeholder="e.g., React Interview Prep" size="large" />
          </Form.Item>
          <Form.Item
            label="Number of Questions"
            name="numQuestions"
            rules={QUIZ_NUM_QUESTIONS_RULES}
          >
            <InputNumber
              type="number"
              className="w-full!"
              placeholder="e.g., 5"
              size="large"
              min={1}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default Quizzes
