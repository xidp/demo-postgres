#! /bin/sh

# include github.com/gabtec/shell-h
source /dev/stdin  <<< "$(curl -s https://raw.githubusercontent.com/gabtec/shell-h/main/lib/helpers.sh)"

# --- Banner ---
BANNER=$(figlet -k "Install")

if [ $? -eq 0 ]
then
  figlet -k "Install"
  echo ""
else 
  echo " --------- Install ---------"
  echo ""
fi 

# --- Atlas Cli ---
ATLAS_VERSION=$(atlas version | grep version | cut -d " " -f 3 | cut  -c 1-7)

if [ $? == 0 ]
then
	# exec OK
  log ok "Atlas cli found at version: ${ATLAS_VERSION}"
else
	# exec error
  log warn "Atlas not found!"
  log info "Installing Atlas"
  brew install ariga/tap/atlas
fi

log info "Installing project dependencies..."
npm install

log info "Creating .env file..."
cp env.example .env

log info "Starting a new database..."
docker compose up -d

# wait until postgres is accepting connections
until docker exec $(docker ps -lq) pg_isready &>/dev/null
do
  # wait 1 second
  log warn "Waiting for database to become ready..."
  sleep 1 
done

log ok "Database up and running."

log info "Running first database migration..."
USER=$(cat .env | grep USER | cut -d "=" -f 2)
PASS=$(cat .env | grep PASSWORD | cut -d "=" -f 2)
PORT=$(cat .env | grep PORT | cut -d "=" -f 2)
NAME=$(cat .env | grep NAME | cut -d "=" -f 2)

atlas migrate apply --dir "file://database/migrations" --url "postgres://${USER}:${PASS}@localhost:${PORT}/${NAME}?sslmode=disable"

sleep 1

if [ $? == 0 ]; then
  log ok "Migration success."
  log info "Starting development server..."
  npm run start:dev
else
  log err "Ups! Migration failed!"
  exit 3
fi

exit 0
