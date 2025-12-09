import { Button, Card, Divider, Input, Spin, Typography } from 'antd'
import { BookOpen, Lightbulb, Sparkles } from 'lucide-react'

import { Activity, Suspense, lazy } from 'react'
import { useAiActionController } from '@/pages/document/controllers'
import { cardContainerClassNames } from '@/pages/document/core'

const { Title, Text } = Typography

const SummaryModal = lazy(
  () => import('@/pages/document/components/SummaryModal'),
)
const ExplainConceptModal = lazy(
  () => import('@/pages/document/components/ExplainConceptModal'),
)

const AIAction = () => {
  const {
    aiActionForm,
    isExplaining,
    summaryModalVisible,
    explainModalVisible,
    isGeneratingSummary,
    closeSummaryModal,
    closeExplainModal,
    handleConceptChange,
    handleGenerateSummary,
    handleExplainConcept,
  } = useAiActionController()

  return (
    <Card className="flex flex-col" classNames={cardContainerClassNames}>
      {/* Header */}
      <div className="p-6">
        <div className="flex items-center gap-3 mb-1">
          <div className="size-10 rounded-lg bg-blue-500 flex items-center justify-center shrink-0">
            <Sparkles size={20} className="text-white" />
          </div>
          <article>
            <Title level={2} className="mb-0! text-2xl! font-bold!">
              AI Assistant
            </Title>
            <Text className="text-gray-500 text-sm block">
              Powered by advanced AI
            </Text>
          </article>
        </div>
      </div>

      <Divider className="my-0!" />

      {/* Action Cards */}
      <div className="space-y-4 p-6">
        {/* Generate Summary Card */}
        <Card className="shadow-sm border-0 bg-white mb-6!">
          <div className="flex items-center gap-4">
            <div className="size-12 rounded-lg bg-blue-100 flex items-center justify-center shrink-0">
              <BookOpen size={24} className="text-blue-600" />
            </div>
            <article className="flex-1 min-w-0">
              <Title level={4} className="mb-1! font-semibold!">
                Generate Summary
              </Title>
              <Text className="text-gray-600 text-sm block">
                Get a concise summary of the entire document.
              </Text>
            </article>
            <Button
              type="primary"
              onClick={handleGenerateSummary}
              loading={isGeneratingSummary}
              className="shrink-0"
              size="large"
            >
              Summarize
            </Button>
          </div>
        </Card>

        {/* Explain Concept Card */}
        <Card className="shadow-sm border-0 bg-white">
          <div className="flex items-start gap-4">
            <div className="size-12 rounded-lg bg-yellow-100 flex items-center justify-center shrink-0 mt-1">
              <Lightbulb size={24} className="text-yellow-600" />
            </div>
            <article className="flex-1 min-w-0">
              <Title level={4} className="mb-1! font-semibold!">
                Explain a Concept
              </Title>
              <Text className="text-gray-600 text-sm block mb-3">
                Enter a topic or concept from the document to get a detailed
                explanation.
              </Text>
              <Input
                placeholder="e.g., 'React Hooks'"
                value={aiActionForm.concept}
                onChange={handleConceptChange}
                onPressEnter={handleExplainConcept}
                disabled={isExplaining}
                size="large"
              />
            </article>
            <Button
              onClick={handleExplainConcept}
              loading={isExplaining}
              disabled={!aiActionForm.concept.trim()}
              className="shrink-0 self-end bg-green-600! text-white! disabled:opacity-50!"
              size="large"
            >
              Explain
            </Button>
          </div>
        </Card>
      </div>

      {/* Summary Modal */}
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-[calc(100vh-237px)]">
            <Spin size="large" />
          </div>
        }
      >
        <Activity mode={summaryModalVisible ? 'visible' : 'hidden'}>
          <SummaryModal
            open={summaryModalVisible}
            loading={isGeneratingSummary}
            onCancel={closeSummaryModal}
            summary={aiActionForm.summary}
          />
        </Activity>
      </Suspense>

      {/* Explain Concept Modal */}
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-[calc(100vh-237px)]">
            <Spin size="large" />
          </div>
        }
      >
        <Activity mode={explainModalVisible ? 'visible' : 'hidden'}>
          <ExplainConceptModal
            open={explainModalVisible}
            onCancel={closeExplainModal}
            loading={isExplaining}
            concept={aiActionForm.concept}
            explanation={aiActionForm.explanation}
          />
        </Activity>
      </Suspense>
    </Card>
  )
}

export default AIAction
