# DDD (Domain-driven Design)

 DDD doesn't have a direct correlation with the code implementation or tools used like database or language.

## Domain

- Domain Experts (those who need the solution that the software will provide)
  - Conversation  
  
- Ubiquitous Language
Its a universal language that every one handling the software and the domain experts can use evenly and efficiently.

 Sample:
  the Devs create an entity (User) but the domain experts can user many other nomenclatures like: client, service provider,
  supplier, barman, etc.., so keep the code close to the language used with the domain experts.

- Aggregates
- Value Objects
- Domain Events
- Subdomain (Bounded Contexts)
- Entities
- Use Cases

Sample: In a conversation with a domain expert (a instructor) we got the following points.

1- The instructor has a lot of difficulty in knowing what the students' doubts are.
2- The instructor has to answer the students' questions, and he gets lost about which ones were already answered.

  With this 2 points we can identify 2 entities (instructor, student and question) and a use-case (answer).