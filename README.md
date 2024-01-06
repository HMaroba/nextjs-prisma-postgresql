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

