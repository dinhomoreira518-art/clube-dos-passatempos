# Clube dos Passatempos

Aplicativo de caça-palavras (e futuros passatempos) para celular, com letras grandes e alto contraste.

## 1. Tecnologia
HTML, CSS e JavaScript puros (sem framework e sem dependências). Não precisa de build: os arquivos da raiz já são a versão de produção.

## 2. Instalar
Nada a instalar. Só é preciso ter o Node.js (opcional, apenas para testar localmente).

## 3. Executar localmente
```
npm start
```
Abra o endereço mostrado (normalmente http://localhost:3000). Para testar no celular, use o endereço de rede local mostrado no terminal.

## 4. Build de produção
Não existe etapa de build. Publique a pasta inteira como está. Teste automático da geração dos jogos: `npm test`.

## 5. Deploy (GitHub + Vercel)
1. Crie um repositório no GitHub e envie todos os arquivos desta pasta (`git init`, `git add .`, `git commit -m "primeira versão"`, `git push`).
2. Na Vercel: **Add New > Project**, importe o repositório.
3. Framework Preset: **Other**. Build Command: vazio. Output Directory: vazio (raiz). Clique em **Deploy**.

## 6. Arquivos importantes
- `index.html`: página inicial
- `app.js`: jogo, temas/palavras (objeto `T` no topo), níveis (`D`), configurações, progresso
- `styles.css`: visual (claro, letras grandes)
- `manifest.webmanifest`, `sw.js`, `icon.svg`: instalação na tela inicial (PWA) e uso offline
- `vercel.json`: configuração de hospedagem
- `tests/gen.test.js`: teste da geração do caça-palavras

## 7. Variáveis de ambiente
Nenhuma. Progresso e configurações ficam no `localStorage` do navegador do usuário (chave `clube-passatempos-v1`).

## 8. Domínio próprio
Na Vercel: **Project > Settings > Domains > Add**, digite seu domínio e crie no seu provedor de domínio o registro DNS que a Vercel indicar (A para domínio raiz ou CNAME para subdomínio www). O HTTPS é automático.

## Observações
- Nome da chave de armazenamento e "Acesso completo" estão preparados para futura conta/login, mas ainda não há login nem pagamento.
- Para melhor instalação em alguns Androids, adicione ícones PNG de 192x192 e 512x512 e liste-os no manifest.
- Antes de anunciar, defina uma política de privacidade (o app só guarda dados no aparelho).
