# Fluxo de funcionamento do Back-end

## Login

Para acessar apalicação o usuário precisa de estar cadastrado. Esse cadastro vai geraar um `token` que será usado para manipular suas tarefas em toda a aplicação.

- A rota de  login é `POST` e espera receber um json no Body da requisição no formato:

```
{
  "email: "fulano@tal.com",
  "password: "somePasswordHere"
}
``` 
- Essa requisição retornará um `token` com 16 caracteres.