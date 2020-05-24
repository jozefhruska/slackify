# Úvod

Slackify je **headless** redakčný systém, ktorého implementácia sa skladá z piatich služieb:

- **frontend** - React webová aplikácia.
- **service-private** - GraphQL služba pre **frontend**.
- **service-public** - Verejná GraphQL služba pre získanie obsahu zo Slackify.
- **service-slack** - HTTP služba pre komunikáciu so Slack API.

## Prístupové údaje

- **Slack App ID:** APN41U9L5
- **Slack Client ID:** 791343423090.804137961685
- **Slack Client Secret:** 5084f361758ccc331aa0d135662810c1
- **Slack Signing Secret:** 51f388598a2219f91800a7fc641ea2ef

### Testovací tím v aplikácií Slack

Do tohto tímu je nutné sa prihlásiť pre prepojenie tímu so Slackify.

- **URL:** http://slackifycms-demo.slack.com/
- **Email:** xhrusk25@stud.fit.vutbr.cz
- **Heslo:** slackify-demo

## Dôležité webové adresy

- https://slackify.now.sh/ - Webová konzola Slackify (služba **frontend**).
- http://slackifycms-demo.slack.com/ - Prihlásenie do testovacieho tímu v Slacku
- https://slackify-service-public.herokuapp.com/ - Verejná GraphQL služba **service-public** aj s playground pre testovanie GraphQL dotazov a vlastnou dokumentáciou. (služba je nasadená na free dyno heroku, môže trvať ~30 sekúnd než sa prebudí)

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
