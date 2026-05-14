#!/usr/bin/env bash
# Liberta portas TCP em escuta (por defeito 5200–5208).
# A porta do Vite em vite.config.js (atualmente 5191) não está neste intervalo.
#
# Para alargar (ex.: 5173–5208, típico do Vite): START_PORT=5173 END_PORT=5208 npm run ports:clear-below-5209
set -euo pipefail

START_PORT="${START_PORT:-5200}"
END_PORT="${END_PORT:-5208}"

cleared=0
for port in $(seq "${START_PORT}" "${END_PORT}"); do
  pids=$(lsof -ti tcp:"$port" -sTCP:LISTEN 2>/dev/null || true)
  if [[ -n "${pids}" ]]; then
    echo "Porta ${port}: a terminar PID(s): ${pids}"
    kill -9 ${pids} 2>/dev/null || true
    cleared=$((cleared + 1))
  fi
done

if [[ "${cleared}" -eq 0 ]]; then
  echo "Nenhum processo em escuta nas portas ${START_PORT}–${END_PORT}."
else
  echo "Concluído: portas ${START_PORT}–${END_PORT} libertadas. A porta do dev (vite.config.js) não foi alvo deste intervalo."
fi
