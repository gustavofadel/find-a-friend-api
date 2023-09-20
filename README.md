# Find a Friend API

## Overview

The Find a Friend API was developed with the aim of allowing organizations to register pets available for adoption and enabling other users to search for pets based on desired characteristics and view details about them. The API was developed using the TypeScript language and includes the Fastify microframework, the Prisma ORM, the Zod library for validation, and the Vitest framework for performing end-to-end unit tests. It also applied SOLID principles and design patterns such as repository and factory for the source code implementation.

## Features

- **Organization Registration:** Register a new organization.

- **Organization Authentication:** Organizations can authenticate with their credentials.

- **Fetch Pets:** Pets can be listed according to the following filters:
  - City (mandatory)
  - Age (optional)
  - Size (optional)
  - Energy level (optional)
  - Independence level (optional)

- **Register Pet:** A pet from a registered organization can be registered with its characteristics.

- **View Pet Details:** Details of a specific pet can be viewed by any user.


## Getting Started

1. Clone this repository.
2. Install the required dependencies with `npm install`.
3. Run `npx prisma migrate` to execute all migrations.
4. Start the API with `npm run start:dev`.

## API Endpoints

### Organization Registration (POST /organizations)

- Request:
  ```json
  POST /organizations
  {
    caretaker_name: "John Doe",
    email: "johndoe@example.com",
    zip_code: "00000-000",
    address: "Avenida A, 0000, Bairro B, Manaus - AM",
    latitude: -0.0000000,
    longitude: -0.0000000,
    phone: "(00) 00000-0000",
    password: "123456",
  }
  ```

- Response (201 Created):

### Organization Authentication (POST /sessions)

- Request:
  ```json
  POST /sessions
  {
    email: "johndoe@example.com",
    password: "123456",
  }
  ```

- Response (200 OK):

### Fetch Pets (GET /pets)

- Request:
  ```
  GET /pets
  ```
  - Query Parameters:
    - `city` (mandatory): The city where to search for pets.
    - `age` (optional): The age of the pets.
    - `size` (optional): The size of the pets.
    - `energy` (optional): The energy level of the pets.
    - `independence` (optional): The independence level of the pets.

- Response (200 OK):
  ```json
  {
    "pets": [
      {
        "id": "<Pet UUID>",
        "name": "Max",
        "about": "Max é um cachorro simpático e amigável que adora fazer novos amigos. Ele é um companheiro leal e está sempre pronto para brincar e receber carinho.",
        "age": "Adulto",
        "size": "Grande",
        "energy": "Média",
        "independence": "Médio (precisa de companhia só de vez em quando)",
        "ambient": "Ambiente amplo",
        "pictures": [
          "https://www.petlove.com.br/images/breeds/193103/profile/original/pastor_alemao-p.jpg?1532539270"
        ],
        "requirements": [
          "Local grande para o animal para o animal correr e brincar",
          "Treinamento básico para boas maneiras"
        ],
        "created_at": "2023-09-20T21:37:55.704Z",
        "organization_id": "<Organization UUID>"
      }
    ]
  }
  ```

### Register Pet (POST /organizations/pets)

- Request:
  ```json
  POST /organizations/pets
  {
    "name": "Max",
    "about": "Max é um cachorro simpático e amigável que adora fazer novos amigos. Ele é um companheiro leal e está sempre pronto para brincar e receber carinho.",
    "age": "Adulto",
    "size": "Grande",
    "energy": "Média",
    "independence": "Médio (precisa de companhia só de vez em quando)",
    "ambient": "Ambiente amplo",
    "pictures": ["https://www.petlove.com.br/images/breeds/193103/profile/original/pastor_alemao-p.jpg?1532539270"],
    "requirements": ["Local grande para o animal para o animal correr e brincar", "Treinamento básico para boas maneiras"]
  }
  ```

- Response (201 Created):

### View Pet Details (GET /pets/:petId)

- Request:
  ```
  GET /pets/<Pet UUID>
  ```

- Response (200 OK):
  ```json
  {
    "pet": {
      "id": "<Pet UUID>",
      "name": "Max",
      "about": "Max é um cachorro simpático e amigável que adora fazer novos amigos. Ele é um companheiro leal e está sempre pronto para brincar e receber carinho.",
      "age": "Adulto",
      "size": "Grande",
      "energy": "Média",
      "independence": "Médio (precisa de companhia só de vez em quando)",
      "ambient": "Ambiente amplo",
      "pictures": [
        "https://www.petlove.com.br/images/breeds/193103/profile/original/pastor_alemao-p.jpg?1532539270"
      ],
      "requirements": [
        "Local grande para o animal para o animal correr e brincar",
        "Treinamento básico para boas maneiras"
      ],
      "created_at": "2023-09-20T21:37:55.704Z",
      "organization_id": "<Organization UUID>"
    }
  }
  ```

---

Made with 💜 by Gustavo Fadel.