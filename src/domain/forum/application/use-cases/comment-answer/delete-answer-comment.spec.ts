import { UniqueEntityID } from '~/core/entities/unique-entity-id'
import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-comments-repository'
import { DeleteAnswerCommentsUseCase } from '../comment-answer/delete-answer-comment'
import { makeAnswerComment } from 'test/factories/make-answer-comment'

let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository
// SUT: System under test
let sut: DeleteAnswerCommentsUseCase
describe('Delete Answer Comment Use Case', () => {
  beforeEach(() => {
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository()
    sut = new DeleteAnswerCommentsUseCase(inMemoryAnswerCommentsRepository)
  })
  it('should be able to delete a answer comment', async () => {
    // Prepare
    const newAnswerComment = makeAnswerComment(
      {
        authorId: new UniqueEntityID('bruce-bennet'),
      },
      new UniqueEntityID('answer-comment-x'),
    )

    await inMemoryAnswerCommentsRepository.create(newAnswerComment)

    // Act
    await sut.execute({
      answerCommentId: 'answer-comment-x',
      authorId: 'bruce-bennet',
    })

    // Assert
    expect(inMemoryAnswerCommentsRepository.items).toHaveLength(0)
  })

  it('should not be able to delete a answer, from another author', async () => {
    // Prepare
    const newAnswerComment = makeAnswerComment(
      {
        authorId: new UniqueEntityID('bruce-bennet'),
      },
      new UniqueEntityID('answer-comment-x'),
    )

    await inMemoryAnswerCommentsRepository.create(newAnswerComment)

    // Act
    expect(
      sut.execute({
        answerCommentId: 'answer-comment-x',
        authorId: 'iron-man',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
