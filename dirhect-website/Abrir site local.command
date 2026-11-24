#!/bin/bash
# Abre o site da Dirhect localmente (http://localhost:5191) e já mostra a landing /admissao_55.
# Deixe esta janela aberta enquanto estiver vendo o site; feche-a para desligar.
cd "$(dirname "$0")" || exit 1
export PATH="/opt/homebrew/bin:/usr/local/bin:$PATH"
[ -d node_modules ] || npm install
# Libera a porta 5191 se uma execução anterior ficou presa
lsof -ti tcp:5191 | xargs kill 2>/dev/null
(sleep 4; open "http://localhost:5191/admissao_55") &
npm run dev
