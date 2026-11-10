# Edicao com IA — próximos passos na sua máquina

Este kit foi preparado na sessão cloud. Copie o conteúdo desta pasta para a sua pasta
`~/Documents/Edicao com IA` e siga os passos na ordem.

## 1. Confira a estrutura da pasta

```bash
cd ~/Documents/"Edicao com IA"
mkdir -p "Material bruto" Referencias/musicas Exportados
cp /caminho/do/repo/edicao-com-ia/guia-de-estilo.md .
```

Resultado esperado:

```
Edicao com IA/
├── guia-de-estilo.md      (v0, provisório, para você aprovar)
├── Material bruto/        (o que você grava)
├── Referencias/           (vídeos de referência e quadros extraídos)
│   └── musicas/           (trilhas com licença)
└── Exportados/            (só o vídeo pronto)
```

## 2. Instale as 5 ferramentas (Mac)

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

```bash
brew install node ffmpeg yt-dlp whisper.cpp
```

Modelo multilíngue do Whisper (não use o `small.en`, ele só entende inglês):

```bash
mkdir -p ~/whisper-models && curl -L -o ~/whisper-models/ggml-small.bin \
  https://huggingface.co/ggerganov/whisper.cpp/resolve/main/ggml-small.bin
```

Windows (PowerShell):

```powershell
winget install OpenJS.NodeJS.LTS
winget install Gyan.FFmpeg
winget install yt-dlp.yt-dlp
```

No Windows o whisper.cpp se compila pelo README do projeto (precisa de CMake).

## 3. Instale as skills dentro da pasta

```bash
cd ~/Documents/"Edicao com IA"
npx hyperframes skills update
npx skills add remotion-dev/skills --skill remotion-best-practices -a claude-code --copy -y
npx hyperframes browser ensure
```

Ou clone este repositório e copie `.claude/skills/` inteiro para a pasta. Ele já tem
hyperframes, hyperframes-cli, hyperframes-registry, media-use, remotion-best-practices,
higgsfield-generate e as 13 skills `ig-*`.

## 4. Teste

```bash
node --version
ffmpeg -version
yt-dlp --version
whisper-cli --help
npx hyperframes doctor
```

Na sessão cloud de 29/10/2026 esse mesmo teste passou com Node 22.22, FFmpeg 6.1,
yt-dlp 2026.10.26, whisper.cpp compilado com o modelo small, HyperFrames 0.8.216 e
Remotion 4.0.539. Os dois motores renderizaram vídeo 1080x1920 a 30 fps.

## 5. Abra o Claude Code na pasta

Duas opções:

**A. App de desktop, modo Local.** Aba Code, seletor de ambiente em Local, Open folder
em "Edicao com IA", modo Manual, modelo Opus. É o fluxo do PDF.

**B. Remote Control, para a sessão cloud continuar daqui.** No app de desktop: Settings,
Claude Code, Remote Control, adicione a pasta "Edicao com IA". Ou, no terminal:

```bash
cd ~/Documents/"Edicao com IA" && git init && claude remote-control
```

A pasta precisa ser raiz de um repositório git (daí o `git init`). Depois volte na
sessão cloud e peça para continuar.

## 6. Sem referências ainda? Faça assim

O guia de estilo `guia-de-estilo.md` (v0) já serve para editar o primeiro vídeo. Para
evoluir dele, escolha uma das rotas:

1. **Seus próprios vídeos.** Se já postou algo, pegue os 3 que mais renderam, mesmo
   que sem edição, e use o prompt 3 do PDF. O estilo nasce da sua fala e do seu ritmo.
2. **Criadores do seu nicho, mesmo formato.** Abra o Reels, procure 3 perfis que falam
   para a câmera em 9:16 sobre o seu tema, e copie o link dos 2 Reels mais recentes com
   mais visualizações de cada um. Critério único: parecidos entre si e no formato que
   você grava. Use o prompt 2.
3. **Grave primeiro, refine depois.** Grave um Reel de 30 segundos, edite com o guia v0
   e o storyboard, poste, e use o que funcionou como primeira referência sua.

Em qualquer rota: 3 vídeos parecidos ensinam mais que 5 diferentes, e nada do criador
de referência (logo, @, bordão, trecho) entra no seu vídeo.

## 7. Primeiro vídeo

1. Grave em 1080x1920, 30 fps, microfone perto, 1 segundo de silêncio no começo e no fim.
   Errou, repete a frase inteira.
2. Salve em `Material bruto/` como `2026-10-29-assunto.mp4`.
3. Cole o prompt 4 do PDF com o nome do arquivo.
4. Revise o storyboard, peça ajuste pelo número do plano (prompt 5), aprove.
5. Rode o prompt 6 antes de postar.
