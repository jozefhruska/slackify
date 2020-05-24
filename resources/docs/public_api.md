# Verejné API

Verejné GraphQL API (služba **service-public**) slúži pre koncových užívateľov headless CMS. Z tohto rozhrania môžu získať obsah, ktorý vytvorili v redakčném systéme.

!> Pre získanie obsahu z redakčného systému musí HTTP požiadavka obsahovať header "Authorization" s prístupovým tokenom tímu. **Prístupový token tímu je možné nájsť v sekcií "Settings" (nastavenia) vo webovej konzole aj Slack aplikácií.** Pre testovanie verejného API je možné využiť GraphQL playground, ktorý sa nachádza na https://slackify-service-public.herokuapp.com/.

Verejné GraphQL API poskytuje 4 query metódy:

- `collections()` - Získanie všetkých kolekcií v redakčnom systéme.
- `collection()`- Získanie jednej kolekcie v redakčnom systéme.
- `components()`- Získanie všetkých komponentov v redakčnom systéme.
- `component()` - Získanie jedného komponentu v redakčnom systéme.

> Podrobnejšia dokumentácia možností verejného API dostupná na https://slackify-service-public.herokuapp.com/.
