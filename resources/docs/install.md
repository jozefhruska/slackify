# Lokálna inštalácia a spustenie

!> Všetkých 5 služieb a databázová vrstva sú prepojené pomocou knižnice **lerna**, ktorá umoňuje nainštalovať všetky zdieľané balíčky na jedno miesto a ušetriť tak miesto na disku. Balíčky všetkých 5 služieb a databázovej vrstvy sa nainštalujú pomocou príkazu `npm i` v koreňovom adresári práce. Postupy inštalácie pre každú z 5 služieb a databázovú vrstvu predpokladajú, že tento príkaz už bol spustený **vopred**.

## Systémové prerekvizity

- Node.js > v12.14.0
- Docker > 19.03.8

## Databázová vrstva

Pred inštaláciou a spustením samotných služieb systému je nutné spustiť databázu a vygenerovať databázového klienta.

> Inicializácia schémy databázy, seed aj generovanie klienta je vždy vykonávané pre databázu definovanú pomocou environmentálnej premennej `DATABASE_URL`.

### Environmentálne premenné

- `DATABSE_URL` - PostgreSQL URI definujúca databázu, ku ktorej sa má databázová vrstva pripojiť. (_Povinná_)

### Postup spustenia databázy

1. Otvorte terminál v adresári `./packages/prisma/` (relatívne ku koreňovému adresáru práce).
2. Pomocou príkazu `docker-compose up` spustite Docker kontainer s PostgreSQL databázou.
3. Pomocou príkazu `npm run migrate:up` inicializujte schému databázy.
4. Pomocou príkazu `cd ./scripts && ./post-migrate.sh` aplikujte dodatočné pravidlá pre databázu.

#### Prístupové údaje k databáze

- **Názov kontainera:** slackify_db
- **Host:** localhost
- **Port:** 5432
- **Názov databázy:** postgres
- **Uzívateľ:** postgres
- **Heslo:** password

### Postup pre vygenerovanie databázového klienta

1. Otvorte terminál v adresári `./packages/prisma/` (relatívne ku koreňovému adresáru práce).
2. Pomocou príkazu `npm run generate` vygenerujte databázového klienta pre všetkých 5 služieb Slackify.

## Služba "**frontend**"

!> Pre funkčnosť vyžaduje vopred spustenú službu **service-private**.

### Environmentálne premenné

- `SCHEMA_URL` - Adresa spustenej GraphQL služby **service-private**. (_Povinná_)
- `REDIRECT_HOST` - Adresa na ktorú bude užívateľ presmerovaný z OAuth autorizačnej služby Slacku.

### Postup inštalácie

1. Otvorte terminál v adresári `./packages/frontend/` (relatívne ku koreňovému adresáru práce).
2. Pomocou príkazu `npm run build` skompilujte zdrojové súbory aplikácie.

### Postup spustenia

1. Pomocou príkazu `npm start` spustite aplikáciu.
2. Aplikácia by mala byť dostupná na adrese http://localhost:3000/.

## Služba "**service-private**"

### Environmentálne premenné

- `SLACK_CLIENT_ID` - ID aplikácie zasielané na Slack API pri OAuth autentifikácií. (_Povinná_)
- `SLACK_CLIENT_SECRET` - Tajný token aplikácie zasielaný na Slack API pri OAuth autentifikácií. (_Povinná_)
- `SIGNING_SECRET` - Heslo pre šifrovanie a odšifrovanie JWT. (_Povinná_)
- `PORT` - Port na ktorom sa aplikácia spustí.

### Postup inštalácie

1. Otvorte terminál v adresári `./packages/service-private/` (relatívne ku koreňovému adresáru práce).
2. Pomocou príkazu `npm run build` skompilujte zdrojové súbory aplikácie.

### Postup spustenia

1. Pomocou príkazu `npm start` spustite aplikáciu.
2. Aplikácia by mala byť dostupná na adrese http://localhost:5000/.

## Služba "**service-public**"

### Environmentálne premenné

- `PORT` - Port na ktorom sa aplikácia spustí.

### Postup inštalácie

1. Otvorte terminál v adresári `./packages/service-public/` (relatívne ku koreňovému adresáru práce).
2. Pomocou príkazu `npm run build` skompilujte zdrojové súbory aplikácie.

### Postup spustenia

1. Pomocou príkazu `npm start` spustite aplikáciu.
2. Aplikácia by mala byť dostupná na adrese http://localhost:5100/.

## Služba "**service-slack**"

### Environmentálne premenné

- `SLACK_SIGNING_SECRET` - Tajný token pre podpis správ smerujúcich na Slack API. Pomocou tohto tokena Slack autorizuje aplikáciu.
- `PORT` - Port na ktorom sa aplikácia spustí.

### Postup inštalácie

1. Otvorte terminál v adresári `./packages/service-slack/` (relatívne ku koreňovému adresáru práce).
2. Pomocou príkazu `npm run build` skompilujte zdrojové súbory aplikácie.

### Postup spustenia

1. Pomocou príkazu `npm start` spustite aplikáciu.
2. Aplikácia by mala byť dostupná na adrese http://localhost:5100/.
