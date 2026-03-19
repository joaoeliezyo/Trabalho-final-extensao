
UNI•CET — Front-end pronto para receber o BLAC (sem JavaScript)
================================================================

Arquivos:
- index.html           -> Tela de **Login**
- cadastro.html        -> Tela de **Criação de Conta**
- recuperar.html       -> Tela de **Recuperar Senha**
- painel.html          -> **Painel** de exemplo (após login)
- estilos.css          -> Estilos do tema (usa Bootstrap 5)

Pronto para o BLAC:
- As páginas NÃO usam JavaScript. Toda validação é HTML5.
- Os formulários usam `method="POST"` e **actions** apontando para endpoints-padrão do BLAC (ajuste conforme seu backend):
    - Login:    `/blac/auth/login`
    - Cadastro: `/blac/auth/signup`
    - Recuperar: `/blac/auth/recover`
- Campos ocultos `redirect_success` e `redirect_error` já estão definidos para navegação simples após resposta do servidor.
  Se o BLAC devolver redirecionamento via header, esses campos podem ser ignorados.

Ajustes recomendados no backend (BLAC):
- Responder com **HTTP 303 See Other** em sucesso/erro para os caminhos informados em `redirect_*`.
- Em caso de erro, retornar **mensagem de erro** no corpo ou query string (ex.: `?erro=1`) para exibir um aviso simples via texto do servidor (sem JS).
- Habilitar CORS apenas se a aplicação front e o BLAC estiverem em domínios diferentes.

Acessibilidade e linguagem simples:
- Labels claros, ajuda em texto curto e foco visível.
- Conteúdo direto para estudantes: frases curtas, instruções no topo.
- Contraste e navegação por teclado preservados.

Como usar:
1) Suba estes arquivos em qualquer servidor estático (Nginx, Apache, GitHub Pages, etc.).
2) Ajuste os atributos `action` dos formulários para os seus endpoints do BLAC.
3) (Opcional) Altere cores/nomes no `estilos.css` e no cabeçalho.

Dúvidas comuns:
- **Posso usar sem JS?** Sim. O BLAC precisa só aceitar POST e redirecionar.
- **Quero mensagens de erro na mesma página.** Sem JS, você pode renderizar a página no servidor
  com a mensagem (ex.: `ERRO: senha incorreta`) quando `?erro=` estiver presente.
