# Úvod

Slackify je **headless** redakčný systém, ktorého implementácia sa skladá z piatich služieb:

- **frontend** - React webová aplikácia.
- **service-private** - GraphQL služba pre **frontend**.
- **service-public** - Verejná GraphQL služba pre získanie obsahu zo Slackify.
- **service-slack** - HTTP služba pre komunikáciu so Slack API.

## Prístupové údaje

?> _TODO_

## Dôležité webové adresy

- https://slackify.now.sh/ - Webová konzola Slackify (služba **frontend**).
- https://slackify-service-public.herokuapp.com/ - Verejná GraphQL služba **service-public** aj s playground pre testovanie GraphQL dotazov a vlastnou dokumentáciou.

## Štruktúra priečinkov

> Niektoré menej dôležité časti štruktúry boli vynechané pre prehľadnosť.

```text
.
├── packages
|    ├── frontend
|    |    ├── cypress // End to end testy
|    |    ├── pages // Jednotlivé stránky pre SSR
|    |    ├── src // Zdrojové kódy aplikácie
|    |    └── .env // Konfigurácia environmentálnych premenných
|    ├── prisma
|    |    ├── migrations // História migrácií databázy
|    |    ├── scripts
|    |    |    └── post-migrate.sh // Skript pre doplnenie databázových pravidiel
|    |    ├── seed // Testovacie (demo) dáta pre databázu
|    |    ├── schema.prisma // Konfiguračný súbor prisma
|    |    └── .env // Konfigurácia environmentálnych premenných
|    ├── service-private
|    |    ├── src
|    |    |    ├── permissions // GraphQL Shield pravidlá pre autorizáciu
|    |    |    └── schema // Zdrojové kódy GraphQL schémy
|    |    └── .env // Konfigurácia environmentálnych premenných
|    ├── service-public
|    |    ├── src
|    |    |    ├── permissions // GraphQL Shield pravidlá pre autorizáciu
|    |    |    ├── schema // Zdrojové kódy GraphQL schémy
|    |    |    └── middleware.ts // GraphQL middleware
|    |    └── .env // Konfigurácia environmentálnych premenných
|    └── service-slack
|         ├── src // Zdrojové súbory aplikácie
|    |    └── .env // Konfigurácia environmentálnych premenných
├── resources
|    ├── docs // Dokumentácia
|    ├── thesis // Zdrojové súbory textovej práce
|    └── tools
|        ├── ngrok // Nástroj pre vytvorenie HTTP(S) tunela na localhost
|        └── ngrok_start // Skript, ktorý spustí ngrok pre port 4000 |(service-slack)
└── scripts
     └── build.sh // Skript pre kompiláciu zdrojových súborov využívaný pri CI
```
