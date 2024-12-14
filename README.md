## 🛡️ Autenticação com Next.js, JWT e TailwindCSS

Este projeto é uma aplicação de autenticação construída com **Next.js**. Ele utiliza **JWT (JSON Web Tokens)** para gerenciar sessões, **TailwindCSS** para estilização e oferece um fluxo completo de login, cadastro e gerenciamento de permissões de acesso (Admin e Usuário).

---

## Fluxo de Autenticação

#### Cadastro:
1. O usuário se registra na página de cadastro (`/signup`).
2. O back-end:
   - Valida os dados fornecidos.
   - Gera um hash seguro para a senha.
   - Salva os dados do usuário no banco de dados.
   - Cria uma sessão para o usuário.
#### Login:
1. O usuário fornece suas credenciais na página de login (`/login`).
2. O back-end:
   - Verifica as credenciais com os dados armazenados.
   - Compara a senha fornecida com o hash salvo no banco.
   - Gera um token JWT para o usuário.
   - Armazena o token em um cookie seguro.
#### Sessão:
- O cookie de sessão armazena o token JWT.
- Ele permite que o usuário permaneça autenticado entre requisições sem precisar fazer login novamente.
#### Validação:
1. Toda página protegida realiza uma verificação no cookie de sessão.
2. O back-end:
   - Decifra o token JWT.
   - Valida a integridade e a expiração do token.
   - Se válido, a página é carregada.
   - Caso contrário, o usuário é redirecionado para a página de login (`/login`).
#### Logout:
1. Ao sair, o cookie de sessão é excluído.
2. A sessão do usuário é encerrada.


---

## Segurança
- Senhas são armazenadas com hashing utilizando Bcrypt.
- Cookies são configurados como HTTP-only e Secure para maior segurança.
- Tokens JWT têm tempo de expiração para evitar sessões prolongadas.

## Tecnologias Utilizadas

- [Next.js](https://nextjs.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [JSON Web Tokens (JWT)](https://jwt.io/)
- [Bcrypt](https://github.com/kelektiv/node.bcrypt.js) (Hashing de senhas)
- [Zod](https://github.com/colinhacks/zod) (Validação de esquemas)

---

## Database dados

```bash
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'user',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```
---

## Instalação e Configuração

### .ENV
```bash
DATABASE_URL=postgresql://usuario:senha@localhost:5432/nome_banco
SECRET=uma-chave-secreta
```
### Pré-requisitos
- Node.js (v16 ou superior)
- NPM ou Yarn
- Banco de dados (ex.: PostgreSQL)

### Passos

1. Clone este repositório:
   ```bash
    git clone https://github.com/seu-usuario/seu-repositorio.git
    cd seu-repositorio

    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    # or
    bun dev
    ```

1. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

