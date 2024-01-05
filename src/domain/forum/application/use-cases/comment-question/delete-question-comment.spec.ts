import { UniqueEntityID } from '~/core/entities/unique-entity-id'
import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-question-comments-repository'
import { DeleteQuestionCommentsUseCase } from '../comment-question/delete-question-comment'
import { makeQuestionComment } from 'test/factories/make-question-comment'

let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository
// SUT: System under test
let sut: DeleteQuestionCommentsUseCase
describe('Delete Question Comment Use Case', () => {
  beforeEach(() => {
    inMemoryQuestionCommentsRepository =
      new InMemoryQuestionCommentsRepository()
    sut = new DeleteQuestionCommentsUseCase(inMemoryQuestionCommentsRepository)
  })
  it('should be able to delete a question comment', async () => {
    // Prepare
    const newQuestionComment = makeQuestionComment(
      {
        authorId: new UniqueEntityID('bruce-bennet'),
      },
      new UniqueEntityID('question-comment-x'),
    )

    await inMemoryQuestionCommentsRepository.create(newQuestionComment)

    // Act
    await sut.execute({
      questionCommentId: 'question-comment-x',
      authorId: 'bruce-bennet',
    })

    // Assert
    expect(inMemoryQuestionCommentsRepository.items).toHaveLength(0)
  })

  it('should not be able to delete a question, from another author', async () => {
    // Prepare
    const newQuestionComment = makeQuestionComment(
      {
        authorId: new UniqueEntityID('bruce-bennet'),
      },
      new UniqueEntityID('question-comment-x'),
    )

    await inMemoryQuestionCommentsRepository.create(newQuestionComment)

    // Act
    expect(
      sut.execute({
        questionCommentId: 'question-comment-x',
        authorId: 'iron-man',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
