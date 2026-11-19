# Open Whisper

**Press a shortcut. Speak. The text appears where your cursor is.**

Voice transcription that runs on your computer, for Windows and Mac. Free, no account, and your voice never leaves the device.

[**Help**](https://openwhisper.entringer.dev/docs/) · [**Report a problem**](https://github.com/fabricio-entringer/open-whisper-public/issues/new/choose) · [**See what's already reported**](https://github.com/fabricio-entringer/open-whisper-public/issues) · [**Releases**](https://github.com/fabricio-entringer/open-whisper-public/releases) · [**Português**](#português)

This repository doesn't hold the app's code. It is where people who use Open Whisper report problems, ask questions and suggest ideas, and where each version is published.

## What it does

- **One shortcut, from any app.** ⇧⌘Space on the Mac, Ctrl+Shift+Space on Windows, and you can change it.
- **Hold to Talk or Toggle.** Hold the keys while you speak, or press once to start and again to stop.
- **Text at your cursor.** It is pasted where you're typing. When that isn't possible, it goes to the clipboard and you're told: a dictation is never lost.
- **Transcribed on your computer**, in the language you speak, detected each time, or one you pin.
- **One icon**: in the menu bar on the Mac, in the notification area on Windows. A small Settings window, and nothing else to set up.
- **Also**: transcribe one YouTube video or one audio or video file, in its own window or from the command line (`open-whisper transcribe`).

## What it doesn't do

No cloud transcription, no AI rewriting or chat, no meeting recording or speaker identification, no translation, no history, no account or sync, no batch transcription of folders or playlists. No Mac App Store or Microsoft Store: their sandboxes don't allow pasting into other apps. Each of these is a deliberate choice, explained in [What Open Whisper doesn't do](https://openwhisper.entringer.dev/docs/limits/). An idea close to one of these lines is still welcome: it is weighed, not refused on sight.

## Install

- **Windows** 10 (22H2) or 11, 64-bit, with a processor that has AVX2 (Intel from 2013, AMD from 2015): download `Open.Whisper_X.Y.Z_x64-setup.exe` from [Releases](https://github.com/fabricio-entringer/open-whisper-public/releases). It installs for your user, with no administrator password. The installer isn't signed yet, so Windows shows "Windows protected your PC": click **More info**, then **Run anyway**. Check the file against its `.sha256` first.
- **Mac**: coming soon. It ships once Apple has signed and notarized it, and will install with Homebrew or a `.dmg`. It will need macOS 14 or later.

Step by step: [Install](https://openwhisper.entringer.dev/docs/install/).

## Help

The full help lives at **[openwhisper.entringer.dev/docs](https://openwhisper.entringer.dev/docs/)**:

- [First run](https://openwhisper.entringer.dev/docs/first-run/) · [Dictate](https://openwhisper.entringer.dev/docs/dictate/) · [Paste](https://openwhisper.entringer.dev/docs/paste/) · [Settings](https://openwhisper.entringer.dev/docs/settings/)
- [Video](https://openwhisper.entringer.dev/docs/video/) · [Command line](https://openwhisper.entringer.dev/docs/command-line/) · [Command reference](https://openwhisper.entringer.dev/docs/command-reference/)
- [Troubleshooting](https://openwhisper.entringer.dev/docs/troubleshooting/) · [FAQ](https://openwhisper.entringer.dev/docs/faq/) · [Shortcuts and keys](https://openwhisper.entringer.dev/docs/shortcuts/)
- [Privacy](https://openwhisper.entringer.dev/docs/privacy/) · [Data and uninstalling](https://openwhisper.entringer.dev/docs/data-and-uninstall/)

## Reporting a problem

1. Check [Troubleshooting](https://openwhisper.entringer.dev/docs/troubleshooting/) and the [issues already reported](https://github.com/fabricio-entringer/open-whisper-public/issues).
2. [Open an issue](https://github.com/fabricio-entringer/open-whisper-public/issues/new/choose) with what you expected and what happened, the app you were dictating into, your system and its version, and the app's version from **About Open Whisper**.

**Issues are public.** Don't paste what you dictated if it's private, and check your screenshots. The content of a transcription is never needed to fix a problem with it.

What to expect: every issue is read and answered. A refusal always comes with a concrete reason. No date is ever promised. When something you reported ships, you're told on your issue. The labels and the rest are explained in [Reporting a problem](https://openwhisper.entringer.dev/docs/report/).

## Privacy

Dictation and transcription happen on your computer, with no network at all: point any network monitor at the app while you dictate and you will see nothing. Your audio is never written to disk. There is no account, no analytics, no telemetry and no update check. The internet is used only when you ask for it: to download an optional larger model, or to fetch a YouTube video. Details and how to check: [Privacy](https://openwhisper.entringer.dev/docs/privacy/).

---

## Português

**Aperte um atalho. Fale. O texto aparece onde está o cursor.**

Transcrição de voz que roda no seu computador, para Windows e Mac. Gratuito, sem conta, e a sua voz nunca sai do dispositivo.

Este repositório não guarda o código do app. Ele é o lugar onde quem usa o Open Whisper relata problemas, tira dúvidas e sugere ideias, e onde cada versão é publicada.

**O que faz.** Um atalho que funciona de qualquer app: ⇧⌘Espaço no Mac, Ctrl+Shift+Espaço no Windows, e dá para trocar. Dois modos: segure as teclas enquanto fala, ou aperte uma vez para começar e outra para parar. O texto é colado onde você está digitando e, quando isso não é possível, vai para a área de transferência com um aviso: nenhum ditado se perde. A transcrição acontece no seu computador, no idioma que você fala, detectado a cada ditado, ou num idioma que você fixar. Um ícone na barra de menus (Mac) ou na área de notificação (Windows) e uma janela pequena de Ajustes. Também transcreve um vídeo do YouTube ou um arquivo de áudio ou vídeo, numa janela própria ou pela linha de comando (`open-whisper transcribe`).

**O que não faz, por decisão.** Nada de transcrição na nuvem, reescrita ou chat por IA, gravação de reunião ou identificação de quem fala, tradução, histórico, conta ou sincronização, transcrição em lote de pastas ou playlists. Nada de Mac App Store nem Microsoft Store: as caixas de areia das lojas não permitem colar em outros apps. O motivo de cada item está em [O que o Open Whisper não faz](https://openwhisper.entringer.dev/pt/docs/limits/). Uma ideia perto dessas linhas continua bem-vinda: ela é avaliada, não recusada de cara.

**Instalar.** **Windows** 10 (22H2) ou 11, 64 bits, com processador com AVX2 (Intel a partir de 2013, AMD a partir de 2015): baixe o `Open.Whisper_X.Y.Z_x64-setup.exe` em [Releases](https://github.com/fabricio-entringer/open-whisper-public/releases). Ele instala para o seu usuário, sem senha de administrador. O instalador ainda não é assinado, então o Windows mostra "O Windows protegeu o computador": clique em **Mais informações** e depois em **Executar assim mesmo**. Antes, confira o arquivo com o `.sha256`. **Mac**: em breve. Sai assim que a Apple assinar e autenticar o app, e vai instalar pelo Homebrew ou por um `.dmg`, no macOS 14 ou mais recente. Passo a passo: [Instalar](https://openwhisper.entringer.dev/pt/docs/install/).

**Ajuda.** A ajuda completa está em **[openwhisper.entringer.dev/pt/docs](https://openwhisper.entringer.dev/pt/docs/)**: [Ditar](https://openwhisper.entringer.dev/pt/docs/dictate/), [Solução de problemas](https://openwhisper.entringer.dev/pt/docs/troubleshooting/), [Perguntas frequentes](https://openwhisper.entringer.dev/pt/docs/faq/), [Linha de comando](https://openwhisper.entringer.dev/pt/docs/command-line/), [Privacidade](https://openwhisper.entringer.dev/pt/docs/privacy/) e o resto.

**Relatar um problema.** Confira a [Solução de problemas](https://openwhisper.entringer.dev/pt/docs/troubleshooting/) e as [issues já relatadas](https://github.com/fabricio-entringer/open-whisper-public/issues). Depois, [abra uma issue](https://github.com/fabricio-entringer/open-whisper-public/issues/new/choose) contando o que você esperava e o que aconteceu, em qual app estava ditando, o seu sistema e a versão dele, e a versão do app que aparece em **Sobre o Open Whisper**. Pode escrever em português: a resposta vem no idioma da issue. **As issues são públicas**: não cole o que você ditou se for algo privado, e confira as capturas de tela. Toda issue é lida e respondida; uma recusa sempre vem com motivo concreto; nenhuma data é prometida; quando algo que você relatou sai, você é avisado na issue. Mais em [Relatar um problema](https://openwhisper.entringer.dev/pt/docs/report/).

**Privacidade.** O ditado e a transcrição acontecem no seu computador, sem nenhuma rede: aponte qualquer monitor de rede para o app enquanto dita e você não verá nada. O áudio nunca é gravado em disco. Não há conta, métricas de uso, telemetria nem busca de atualização. A internet só é usada quando você pede: para baixar um modelo maior opcional ou para buscar um vídeo do YouTube. Detalhes e como conferir: [Privacidade](https://openwhisper.entringer.dev/pt/docs/privacy/).

---

<sub>Made by / Feito por [entringer.dev](https://entringer.dev)</sub>
