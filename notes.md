# DDD (Domain-driven Design)

DDD doesn't have a direct correlation with the code implementation or tools used like database or language.

## Domain

- Domain Experts (those who need the solution that the software will provide)
  - Conversation
- Ubiquitous Language
  Its a universal language that every one handling the software and the domain experts can use evenly and efficiently.

Sample:
the Devs create an entity (User) but the domain experts can user many other nomenclatures like: client, service provider,
supplier, barman, etc.., so keep the code close to the language used with the domain experts. The entities and use-cases
names should not depend on the any tool or language used in the project.

- Aggregates
- Value Objects
  Its the specificities/validations/Business rules applied to the entities properties.
- Domain Events
- Subdomain (Bounded Contexts)
- Entities
- Use Cases

Sample: In a conversation with a domain expert (a instructor) we got the following points.

1- The instructor has a lot of difficulty in knowing what the students' doubts are.
2- The instructor has to answer the students' questions, and he gets lost about which ones were already answered.

With this 2 points we can identify 2 entities (instructor, student and question) and a use-case (answer).

## Concepts

- Aggregate
- WatchedList

### Sample Aggregate

- Order => OrderItem[]
- ORder => Shipping

### Sample WatchedList

#### Create

- Title
- Content
- Attachment (3)

This represents a aggregate (Question => Attachment[])

### Edit

- Title
- Content

is easily updatable

The WatchedList pattern comes handy when you have to do identify and act to specific
requirements, like in this sample, the user is editing the a post previous created,
title, content and:

- Add a new Attachment (create);
- Remove the second Attachment (delete);
- Edit the third attachment (update)
