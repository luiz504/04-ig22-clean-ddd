import { test, expect } from 'vitest'
import { AnswerQuestionUseCase } from './answer-question'

test('create an answer', () => {
  const content = 'Some Question'
  const answerQuestion = new AnswerQuestionUseCase()
  const answer = answerQuestion.execute({
    instructorId: 'instructor-id',
    questionId: 'question-id',
    content,
  })

  expect(answer.content).toEqual(content)
})
