import { QuestionsRepository } from '../repositories/question-repository'

import { CreateQuestionUseCase } from './create-question'

const fakeQuestionRepository: QuestionsRepository = {
  create: async () => undefined,
}
it('should be able to create an answer', async () => {
  const data = {
    content: 'Some content',
    title: 'Some Question',
  }

  const createQuestion = new CreateQuestionUseCase(fakeQuestionRepository)

  // Act
  const { question } = await createQuestion.execute({
    authorId: 'some-author-id',
    ...data,
  })

  // Assert
  expect(question.id).toBeTruthy()
  expect(question).toEqual(expect.objectContaining(data))
})
