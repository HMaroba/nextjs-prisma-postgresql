#### PRISMA - NEXT JS - POSTGRESQL 

### To install prisma run 

```bash
npm install prisma @prisma/client
```

### After the installation, we can then initialize Prisma with

```bash
npx prisma init
```

### Database Connection

```bash
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

```

### After creating new model run
```bash
npx prisma db push
```

### RUN THIS To generate prisma after changing model 

```bash
npx prisma generate

### Prisma Schema Example

```bash

model User {
  id    Int     @id @default(autoincrement())
  email String  @unique
  name  String?
  posts Post[]
}

model Post {
  id        Int     @id @default(autoincrement())
  title     String
  content   String?
  published Boolean @default(false)
  author    User    @relation(fields: [authorId], references: [id])
  authorId  Int
}


```

