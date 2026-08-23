<div align="center">

# Open Whisper

**Press a shortcut. Speak. The text appears where your cursor is.**

Voice transcription that runs entirely on your Mac — your voice never leaves the device.

![Platform](https://img.shields.io/badge/platform-macOS%2014%2B-lightgrey)
![Apple Silicon](https://img.shields.io/badge/chip-Apple%20Silicon-lightgrey)
![On-device](https://img.shields.io/badge/transcription-100%25%20on--device-brightgreen)
![Network](https://img.shields.io/badge/network%20calls-zero-brightgreen)
![Status](https://img.shields.io/badge/status-pre--release-orange)

[**Report a problem**](https://github.com/fabricio-entringer/open-whisper-public/issues/new/choose) ·
[**See what's already reported**](https://github.com/fabricio-entringer/open-whisper-public/issues) ·
[**Português**](#português)

</div>

---

## Welcome

This repository is **not** where the code lives. It exists for one reason: so that people who use
Open Whisper have somewhere to report a problem, ask a question, or suggest an improvement — and get
an answer.

Every issue opened here is read.

> **Open Whisper has not been released yet.** There is no download link on this page because there is
> nothing to download yet. This space is open early, on purpose, so the channel exists before the
> first version does.

---

## What it is

```
[any app]  →  press shortcut  →  speak  →  local transcription  →  text at your cursor
                                                   ↓
                                   (clipboard fallback — a word is never lost)
```

Open Whisper lives in the menu bar. No Dock icon. No main window. You don't switch to it — you press
a shortcut wherever you already are, say what you want written, and keep working.

The whole thing happens on your machine. The transcription model ships inside the app, so it works on
an airplane, and there is no account, no API key and no sign-up.

---

## What the app does

| | |
|---|---|
| **One global shortcut** | Works from any app, without focusing Open Whisper first |
| **Hold to Talk or Toggle** | Hold the keys and speak, or press once to start and again to stop |
| **Automatic language** | Speak Portuguese, English or another major language — no setting to change |
| **Text at your cursor** | Inserted where you're already typing |
| **Clipboard as a floor** | If insertion isn't possible, the text goes to your clipboard and you're told |
| **Menu-bar states** | Idle, recording, processing, error — visible at a glance |
| **Five settings, no more** | Shortcut, mode, maximum recording length, language, model |
| **Fully keyboard-operable** | You never need the mouse |

---

## What the app does *not* do

This list is deliberate. Each of these was considered and declined, and the reason matters more than
the item:

- **No cloud transcription engines.** No OpenAI, no Deepgram, no ElevenLabs. Sending your voice
  somewhere would break the one promise the product is built on.
- **No AI cleanup, rewriting, chat or read-aloud.** Open Whisper writes down what you said. Deciding
  what you *meant* is a different product.
- **No meeting recording and no speaker identification.** Recording other people is a different
  problem with different consent questions.
- **No batch transcription of audio files.** The product is about the moment you're typing, not about
  processing a folder.
- **No accounts, no cloud sync, no history across devices.** There is nothing to sync, because
  nothing leaves your machine.
- **No Mac App Store version.** To paste text into other apps, the app needs macOS Accessibility
  permissions, which the App Store's sandbox forbids. A store build could not do the one thing this
  app exists to do.
- **No complex interface.** A menu-bar icon and a small settings window. That's the whole surface.

**A border case is not a refusal.** If your idea is close to one of these lines, open the issue
anyway. Ideas that need a decision get marked for review, not closed.

---

## Privacy

Two claims, both of which you can check yourself:

1. **Zero network traffic during transcription.** Point any network monitor at the app while you
   dictate. You will see nothing, because there is nothing to see.
2. **Your audio is never written to disk.** The recording exists in memory long enough to be
   transcribed, and then it's gone.

There is no analytics, no crash reporting and no third-party SDK of any kind.

---

## Reporting a problem

Use the [issue forms](https://github.com/fabricio-entringer/open-whisper-public/issues/new/choose).
They ask for the things that actually make a report solvable.

**What makes a good report:**

- **What you expected, and what happened instead.** "The text went to the clipboard instead of into
  the document" is solvable. "It doesn't work" is not.
- **Which app you were dictating into.** Paste behaviour differs between a browser, a code editor and
  a chat app, and this is usually the decisive detail.
- **Your macOS version and the app version.** The app version is in *About Open Whisper*.
- **Whether it happens every time**, or only sometimes.

**Please don't paste what you dictated** if it's private. We never need the content of your
transcription to fix a problem with the transcription — and this is a public page that anyone can
read.

---

## Labels, translated

| Label | Means |
|---|---|
| `triage: pending` | Received, not looked at yet |
| `triage: accepted` | Real, and it's in the queue |
| `triage: needs-info` | Waiting on something from you |
| `triage: under-review` | Needs a product decision before an answer is possible |
| `triage: duplicate` | Already reported — the link points to the original |
| `triage: out-of-scope` | Declined, with a concrete reason in the comments |
| `status: queued` | Accepted and waiting its turn |
| `status: in-progress` | Being worked on |
| `status: awaiting-release` | Fixed, waiting for a version to ship it |
| `status: shipped` | Available in a released version |
| `status: closed-unresolved` | Closed without a fix, with the reason stated |

---

## What to expect

- Every issue is read and answered.
- A refusal always comes with a concrete reason. "Out of scope" on its own is not an answer.
- **We never promise a date.** "Accepted and queued" is as far as it goes.
- When something you reported ships, you get told on your issue.
- If a fix doesn't hold, reopen it.

---

<div align="center">

## Português

</div>

**Aperte um atalho, fale, e o texto aparece onde o cursor está.** Transcrição de voz que roda
inteiramente no seu Mac — sua voz nunca sai do aparelho.

Este repositório **não contém o código**. Ele existe para que quem usa o Open Whisper tenha onde
relatar um problema, tirar dúvida ou sugerir melhoria — e receber resposta. Toda issue aberta aqui é
lida.

> **O Open Whisper ainda não foi lançado.** Não há link de download nesta página porque ainda não há
> o que baixar. O canal está aberto desde já, de propósito, para existir antes da primeira versão.

**O que o app faz:** um atalho global que funciona de qualquer aplicativo, nos modos segurar-para-falar
ou alternar; idioma detectado automaticamente, sem configurar; texto inserido onde o cursor está, com
a área de transferência como piso garantido quando a inserção não é possível; ícone na barra de menus
com os estados; cinco preferências, nada além disso; operável 100% por teclado.

**O que o app não faz, por decisão:** nada de engine de transcrição na nuvem, limpeza ou reescrita por
IA, gravação de reunião, identificação de quem fala, transcrição de arquivos em lote, contas ou
sincronização. Também não existe versão na Mac App Store — para colar texto em outros aplicativos o
app precisa da permissão de Acessibilidade do macOS, que a caixa de areia da loja proíbe. Um app da
loja não conseguiria fazer a única coisa que este app faz.

Caso de fronteira não é recusa: se sua ideia chega perto de uma dessas linhas, abra a issue mesmo
assim.

**Privacidade:** zero tráfego de rede durante a transcrição — aponte qualquer monitor de rede para o
app enquanto dita e não verá nada. O áudio nunca é gravado em disco. Não há analytics, relatório de
falhas nem SDK de terceiros.

**Ao relatar:** conte o que esperava e o que aconteceu, em qual aplicativo você estava ditando (esse
é quase sempre o detalhe decisivo), a versão do macOS e a do app, e se acontece sempre ou às vezes.
**Não cole o que você ditou** se for algo privado — nunca precisamos do conteúdo da transcrição para
resolver um problema com a transcrição, e esta página é pública.

Pode escrever em português. A resposta vem no idioma em que a issue foi escrita.

---

<div align="center">
<sub>Feito por <a href="https://entringer.dev">entringer.dev</a></sub>
</div>
