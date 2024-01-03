import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'

import { makeQuestion } from 'test/factories/make-question'

import { UniqueEntityID } from '~/core/entities/unique-entity-id'

import { ChooseQuestionBestAnswerUseCase } from './choose-question-best-answer'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { makeAnswer } from 'test/factories/make-answer'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryAnswersRepository: InMemoryAnswersRepository
// SUT: System under test
let sut: ChooseQuestionBestAnswerUseCase
describe('Choose Question best Answer Use Case', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new ChooseQuestionBestAnswerUseCase(
      inMemoryQuestionsRepository,
      inMemoryAnswersRepository,
    )
  })
  it('should be able to define a question best answer', async () => {
    // Prepare
    const newQuestion = makeQuestion()

    await inMemoryQuestionsRepository.create(newQuestion)

    const newAnswer = makeAnswer(
      {
        questionId: newQuestion.id,
        authorId: newQuestion.authorId,
      },
      new UniqueEntityID('answer-y'),
    )

    await inMemoryAnswersRepository.create(newAnswer)
    // Act
    await sut.execute({
      answerId: newAnswer.id.toString(),
      authorId: newQuestion.authorId.toString(),
    })

    // Assert
    expect(
      inMemoryQuestionsRepository.items[0].bestAnswerId?.toString(),
    ).toEqual('answer-y')
  })

  it('should not be able to choose a question best answer, from another author', async () => {
    // Prepare
    const newQuestion = makeQuestion()

    await inMemoryQuestionsRepository.create(newQuestion)

    const newAnswer = makeAnswer(
      {
        questionId: newQuestion.id,
        authorId: newQuestion.authorId,
      },
      new UniqueEntityID('answer-y'),
    )

    await inMemoryAnswersRepository.create(newAnswer)

    // Act
    expect(
      sut.execute({
        answerId: newAnswer.id.toString(),
        authorId: 'iron-man',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
