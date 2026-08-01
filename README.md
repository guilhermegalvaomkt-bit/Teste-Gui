# ✍️ Biblioteca de Briefings de Copy

Um lugar simples e bonito para **organizar os briefings de Copy da sua marca**.
Cada briefing reúne, num só card:

- 🎬 uma **referência em vídeo** (YouTube, Vimeo, Google Drive) **ou imagem** (link ou upload), e
- 📝 a **copy escrita** (headline, corpo e CTA), com status, tags e observações.

É um site estático (HTML + CSS + JavaScript puro) — **sem instalar nada, sem servidor, sem banco de dados**. Os dados ficam salvos no seu navegador e você pode exportar um backup para versionar no GitHub.

---

## 🚀 Como usar

### Opção A — Abrir direto no navegador
Baixe/clone o projeto e abra o arquivo `index.html` com dois cliques. Pronto.

### Opção B — Publicar na internet (GitHub Pages)
Assim você acessa de qualquer lugar por uma URL e pode compartilhar com a equipe:

1. Faça o merge deste branch na branch **`main`**.
2. No GitHub, vá em **Settings → Pages**.
3. Em **Source**, escolha **GitHub Actions**.
4. Aguarde ~1 minuto. Seu site ficará em:
   `https://<seu-usuário>.github.io/<nome-do-repositório>/`

O deploy é automático a cada push na `main` (veja `.github/workflows/pages.yml`).

---

## 🧩 Como funciona no dia a dia

| Ação | Como fazer |
|------|-----------|
| **Criar briefing** | Botão **＋ Novo briefing** e preencha o formulário |
| **Ver / copiar a copy** | Clique no card → botão **📋 Copiar copy** |
| **Editar / excluir** | Abra o card → **✏️ Editar** (o botão Excluir fica no formulário) |
| **Buscar** | Campo de busca no topo (procura em título, copy, campanha e tags) |
| **Filtrar** | Selects de status, tipo (vídeo/imagem) e tags |
| **Trocar tema** | Botão ☀️/🌙 (claro/escuro) |

### Referências de vídeo/imagem
- **Vídeo:** cole o link do **YouTube**, **Vimeo** ou **Google Drive** — o player aparece embutido no detalhe.
- **Imagem:** cole o link da imagem **ou** suba um arquivo pelo campo "Ou subir uma imagem".
  > Imagens enviadas ficam salvas no navegador. Para arquivos grandes, prefira **links** (mantém o app leve).

---

## 💾 Onde os dados ficam salvos (importante)

Os briefings são salvos no **`localStorage` do seu navegador**. Isso significa:

- ✅ Funcionam offline e são só seus.
- ⚠️ Ficam **naquele navegador/computador**. Se limpar os dados do navegador, eles somem.

Por isso existe o **backup**:

- **⬇️ Exportar** — baixa um arquivo `briefings-backup.json` com todos os briefings.
- **⬆️ Importar** — restaura os briefings a partir de um backup.

### Versionar/compartilhar via GitHub
Para manter um backup seguro e compartilhável, faça o **Exportar** e salve o JSON no repositório (por exemplo, substituindo o conteúdo de `data/briefings.example.json` ou criando `data/briefings.json`). Assim você tem histórico, backup na nuvem e pode importar em outro dispositivo.

---

## 📁 Estrutura do projeto

```
index.html                     App (página única)
assets/styles.css              Estilos (tema claro/escuro, responsivo)
assets/app.js                  Lógica (CRUD, busca, filtros, embeds, backup)
data/briefings.example.json    Briefings de exemplo (carregados na 1ª visita)
.github/workflows/pages.yml    Deploy automático no GitHub Pages
```

## 🗺️ Ideias para evoluir depois
- Login e sincronização automática entre dispositivos (exige backend/banco).
- Upload de arquivos de vídeo (hoje usamos links, que são mais leves).
- Campos extras por briefing (canal, responsável, data de veiculação).

---

Feito para organizar sua Copy sem complicação. Bom trabalho! 💜
