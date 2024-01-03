import { test, expect } from 'vitest'
import { AnswerQuestionUseCase } from './answer-question'
import { AnswersRepository } from '../repositories/answers-repository'

const fakeAnswersRepository: AnswersRepository = {
  create: async () => undefined,
}
test('create an answer', async () => {
  const content = 'Some Question'
  const answerQuestion = new AnswerQuestionUseCase(fakeAnswersRepository)
  const answer = await answerQuestion.execute({
    instructorId: 'instructor-id',
    questionId: 'question-id',
    content,
  })

  expect(answer.content).toEqual(content)
})
