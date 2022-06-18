# Fluxo de funcionamento do Back-end

## Sign-up

Para usar a aplicação o usuário precisa de um login válido e de um `token` de 16 dígitos. para criar esse cadastro o usuário precisa enviar um `json` com as seguintes informações:

- A rota parar criar o ligin é `localhost:2035/sign-up`
- A requisição precisa ser do tipo `POST` e ter o seguinte body:

```
{
  "name": "Fulano de tal",
  "email: "fulano@tal.com",
  "password: "somePasswordHere"
}
```
- Se todos os dados estivem ok, a aplicação vai retornar um status de sucesso.

## Login

Para acessar apalicação o usuário precisa de estar cadastrado. O cadastro gerou um `token` que será usado para manipular suas tarefas em toda a aplicação.

- A rota de  login é `POST` e espera receber um json no Body da requisição no formato:

```
{
  "email: "fulano@tal.com",
  "password: "somePasswordHere"
}
``` 
- Essa requisição retornará um `token` com 16 caracteres, que será usado durante a interação do usuário com a aplicação.