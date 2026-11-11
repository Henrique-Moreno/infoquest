# InfoQuest

Jogo educativo de informática básica para crianças de 10 a 12 anos, conduzido pelo professor em sala de aula e feito para rodar no navegador de um notebook ligado à TV.

> Status: em planejamento. Este repositório está sendo estruturado e ainda não há versão jogável publicada.

## Sobre o projeto

O InfoQuest é um jogo para ensinar informática a crianças de 10 a 12 anos. Em vez de decorar uma lista de peças, a turma descobre como o computador funciona por dentro.

## Contexto e caráter social

O projeto nasce para escolas públicas, onde recursos costumam ser limitados: internet instável, equipamentos modestos e pouco orçamento para material digital. Por isso o InfoQuest segue três compromissos.

1. Gratuito de ponta a ponta. Ferramentas, bibliotecas, gestão de tarefas e hospedagem são open source ou gratuitas. Nenhuma etapa do projeto depende de assinatura paga.
2. Funciona sem internet. Depois do primeiro acesso, o jogo roda offline no notebook do professor, e os dados da turma ficam guardados na própria máquina.
3. Privacidade das crianças. Os nomes dos alunos não saem do equipamento do professor. A proposta é manter os dados locais, com exportação e importação em arquivo para backup, em linha com a LGPD.

## Objetivo

Ajudar crianças de 10 a 12 anos a reconhecer cada componente do computador, entender para que ele serve e como ele se liga aos demais, por meio de desafios curtos, visuais e cooperativos.

Objetivos pedagógicos:

- Identificar peças e componentes de um computador.
- Relacionar cada peça à sua função: entrada, processamento, armazenamento e saída.
- Entender como as peças se conectam, por quais portas e cabos, e por onde a informação passa.
- Dar ao professor dados sobre o desempenho da turma, como tempo de resposta e número de tentativas por peça.

## Como o jogo funciona

O fluxo tem quatro etapas:

1. Equipes: o professor cadastra os alunos pelo nome e monta as equipes arrastando as crianças ou sorteando.
2. Desafios: o professor escolhe o desafio da aula em uma trilha.
3. Jogo: a equipe da vez, e dentro dela uma criança, responde ao desafio na TV.
4. Resultado: placar, equipe vencedora e quadro de desempenho da turma.

### Desafios previstos

| Ordem | Desafio                    | Ideia                                                                    |
| ----- | -------------------------- | ------------------------------------------------------------------------ |
| 1     | Ligue as peças             | Arrastar cada peça até a porta certa e ver a informação viajar pelo cabo |
| 2     | Dentro do gabinete         | Encaixar processador, memória RAM e armazenamento nos lugares certos     |
| 3     | Entrada, saída ou os dois? | Separar as peças pelo que elas fazem com a informação                    |
| 4     | E se faltar uma peça?      | Descobrir o que para de funcionar quando uma peça é removida             |
| 5     | Monte o computador         | Montar tudo do zero e comparar o tempo da turma                          |

### Pontuação

Quem acerta de primeira ganha 10 pontos, na segunda tentativa ganha 5, e depois disso ganha 0. O tempo de resposta é registrado para análise pedagógica e não vale pontos, para que a turma priorize entender em vez de responder rápido.

## Pilha de tecnologias

Todas as ferramentas são open source ou gratuitas.

| Camada                  | Ferramenta                           | Papel no projeto                                          |
| ----------------------- | ------------------------------------ | --------------------------------------------------------- |
| Linguagem               | TypeScript em modo strict            | Tipagem em todos os pacotes                               |
| Monorepo                | pnpm workspaces e Turborepo          | Pacotes isolados, cache de build e testes                 |
| Aplicação               | Vite e React                         | Interface web, carregamento rápido                        |
| Rotas                   | TanStack Router                      | Rotas tipadas para equipes, trilha, jogo e resultado      |
| Fluxo do jogo           | XState                               | Máquina de estados do desafio e da aula                   |
| Estado de interface     | Zustand                              | Estado leve de tela, fora do núcleo do jogo               |
| Validação               | Zod                                  | Esquema do conteúdo dos desafios e dos dados salvos       |
| Animação                | Motion                               | Cabos, pulsos de informação e transições em SVG           |
| Arrastar                | dnd-kit e pointer events             | Montagem de equipes; gestos das peças e dos cabos         |
| 3D (experimental)       | three, React Three Fiber e drei      | Carregado sob demanda, atrás de feature flag              |
| Estilo                  | Tailwind CSS e Radix UI              | Tokens de design e componentes acessíveis                 |
| Dados locais            | Dexie sobre IndexedDB                | Turmas e eventos guardados no notebook do professor       |
| Offline                 | vite-plugin-pwa e Workbox            | Funcionamento sem internet                                |
| Testes unitários        | Vitest e Testing Library             | Núcleo do jogo e componentes                              |
| Testes de ponta a ponta | Playwright e axe-core                | Fluxo completo, arrastar e acessibilidade                 |
| Qualidade de código     | Biome, Lefthook e dependency-cruiser | Lint, formatação, hooks de commit e regras de dependência |
| Componentes             | Storybook                            | Vitrine das peças e telas para desenvolvimento e design   |
| CI e deploy             | GitHub Actions                       | Testes e publicação automática                            |
| Hospedagem              | GitHub Pages                         | Site estático gratuito                                    |
| Gestão                  | GitHub Issues e Projects             | Backlog e marcos                                          |
| Design e 3D             | Penpot, Blender e glTF Transform     | Interface, modelos e otimização                           |

## Princípios de arquitetura

- O núcleo do jogo é puro. O pacote `game-core` contém regras, pontuação, rodízio e máquina de estados em TypeScript puro, sem React, e é testável em Node.
- A dependência vai em uma direção só. `game-core` não depende de ninguém, `challenges` e `storage` dependem dele, e apenas o app web compõe tudo. A regra é verificada na CI.
- Conteúdo separado de código. Cada desafio tem um arquivo de conteúdo validado por Zod, para que a revisão pedagógica não exija mexer em interface.
- Local-first. Os dados ficam no IndexedDB do notebook, com exportação e importação em JSON.
- Acessibilidade desde o início. Alternativa de toque e teclado ao arrastar, respeito à preferência de movimento reduzido e contraste pensado para leitura à distância na TV.

## Estrutura do repositório

```
infoquest/
├─ apps/
│  └─ web/                 Aplicação Vite com React
├─ packages/
│  ├─ game-core/           Regras, pontuação, rodízio e máquina de estados
│  ├─ challenges/          Um módulo por desafio, com conteúdo e apresentação
│  ├─ ui/                  Design system, tokens e componentes
│  ├─ storage/             Dexie, repositórios e exportação e importação
│  └─ config/              Configurações compartilhadas de TypeScript
├─ docs/
│  ├─ adr/                 Registros de decisões de arquitetura
│  ├─ pedagogia/           Material de apoio pedagógico
│  └─ contribuindo.md
├─ assets-src/             Arquivos de origem de ilustrações e modelos 3D
└─ .github/                Workflows e modelos de issue e pull request
```

Esta é a estrutura alvo. As pastas serão criadas conforme os marcos avançam.

## Como rodar localmente

Estes comandos serão válidos assim que o scaffolding inicial estiver no repositório.

Requisitos: Node.js na versão indicada em `.nvmrc` e pnpm, habilitado pelo Corepack.

```bash
corepack enable
pnpm install
pnpm dev
```

Comandos previstos:

```bash
pnpm test        # testes unitários
pnpm e2e         # testes de ponta a ponta com Playwright
pnpm lint        # Biome e verificação de dependências
pnpm build       # build de produção
```

## Roadmap

1. Fundação: monorepo, CI, tokens de design, esquema de conteúdo e núcleo com testes.
2. Fatia vertical: desafio dos cabos jogável, testado em um notebook modesto.
3. Fluxo completo: equipes com nomes, trilha e resultados, com dados locais, exportação e importação e modo offline.
4. Desafios 2 e 3, com um estudo de viabilidade do 3D em paralelo.
5. Desafios 4 e 5, endurecimento de acessibilidade e desempenho.
6. Piloto em sala de aula e ajustes a partir do uso real.

Um backend com login do professor e relatórios entre turmas só será considerado se houver necessidade comprovada, e com atenção redobrada ao consentimento e à LGPD.

## Como contribuir

O projeto é aberto a contribuições de desenvolvimento, design, pedagogia e testes em sala. Antes de começar:

1. Leia `docs/contribuindo.md` e o `CODE_OF_CONDUCT.md` quando estiverem disponíveis.
2. Abra uma issue descrevendo a proposta antes de enviar mudanças grandes.
3. Siga o padrão Conventional Commits nas mensagens de commit.
4. Garanta que testes, lint e verificação de dependências passam antes de abrir o pull request.

## Licença

A licença do código e a do conteúdo pedagógico e das ilustrações ainda serão definidas pela equipe. A decisão deve ser tomada antes da primeira contribuição externa, e o arquivo `LICENSE` será adicionado à raiz do repositório.

## Equipe e contato

A equipe e os canais de contato serão listados aqui.
