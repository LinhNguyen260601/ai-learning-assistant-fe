import { useMutation } from '@tanstack/react-query'
import { useParams } from '@tanstack/react-router'
import { message } from 'antd'
import { useState } from 'react'
import { aiService } from '@/services'
import { useToggle } from '@/hooks'

const useAiActionController = () => {
  const { id: documentId } = useParams({
    from: '/_authenticated/documents/$id',
  })

  const [aiActionForm, setAiActionForm] = useState({
    concept: '',
    summary: '',
    explanation: '',
  })

  const {
    value: summaryModalVisible,
    open: openSummaryModal,
    close: closeSummaryModal,
  } = useToggle(false)
  const {
    value: explainModalVisible,
    open: openExplainModal,
    close: closeExplainModal,
  } = useToggle(false)

  const { mutate: generateSummary, isPending: isGeneratingSummary } =
    useMutation({
      mutationFn: aiService.generateSummary,
      onSuccess: (data) => {
        setAiActionForm((prev) => ({ ...prev, summary: data.summary }))
        openSummaryModal()
      },
    })

  const { mutate: explainConcept, isPending: isExplaining } = useMutation({
    mutationFn: aiService.explainConcept,
    onSuccess: (data) => {
      setAiActionForm((prev) => ({
        ...prev,
        explanation: data.explanation,
      }))
      openExplainModal()
    },
  })

  const handleGenerateSummary = () => {
    generateSummary({ documentId })
  }

  const handleExplainConcept = () => {
    if (!aiActionForm.concept.trim()) {
      message.warning('Please enter a concept to explain')
      return
    }

    explainConcept({ documentId, concept: aiActionForm.concept.trim() })
  }

  const handleConceptChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAiActionForm((prev) => ({ ...prev, concept: event.target.value }))
  }

  return {
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
  }
}

export default useAiActionController
