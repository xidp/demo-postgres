#! /bin/sh

# USAGE:
# $1 name_for_the_migration

# include github.com/gabtec/shell-h
source /dev/stdin  <<< "$(curl -s https://raw.githubusercontent.com/gabtec/shell-h/main/lib/helpers.sh)"

# --- Banner ---
B_MSG="DB Migration"
BANNER=$(figlet -k "$B_MSG")

if [ $? -eq 0 ]
then
  figlet -k "$B_MSG"
  echo ""
else 
  log info " --------- $B_MSG ---------"
  echo ""
fi 

# --- Args check ---
if [ $# == 0 ]
then
  log err "Missing migration name arg"
  log warn "Usage: $0 migration_name"
  exit 1
fi 

# --- Read from .env ---
FILE=.env
if [ -f "$FILE" ]; then
  log info "\"$FILE\" found."

  USER=$(cat .env | grep USER | cut -d "=" -f 2)
  PASS=$(cat .env | grep PASSWORD | cut -d "=" -f 2)
  PORT=$(cat .env | grep PORT | cut -d "=" -f 2)
  NAME=$(cat .env | grep NAME | cut -d "=" -f 2)

  log info "Env vars loaded."
else 
  log err "\"$FILE\" NOT found."
  exit 2
fi

# Migration run
log info "Starting migration..."

atlas migrate diff $1 \
  --dir "file://database/migrations" \
  --to "postgres://$USER:$PASS@localhost:$PORT/$NAME?search_path=public&sslmode=disable" \
  --dev-url "docker://postgres/14/$NAME" \
  --format '{{ sql . "  " }}'

if [ $? == 0 ]; then
  log ok "Migration success."
else
  log err "Migration failed!"
  exit 3
fi
## IN Github Actions the migrations will be converted to a configmap and applyed by atlas kubernetes operator
# kubectl create configmap migrations-cm \
#   --from-file="database/migrations" -o yaml \
#   --dry-run=client --save-config > database/k8s-migrations-cm.yaml

# SOS - regenerate database/migrations/atlas.sum file
# $ atlas migrate hash --dir "file://database/migrations"
exit 0