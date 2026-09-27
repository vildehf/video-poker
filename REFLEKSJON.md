# Refleksjon

## Arbeidsprosess

Jeg jobbet stegvis med sidene Spill, Regler og Spillere, før jeg laget kortene og spillfunksjonene. Jeg brukte React Router til navigasjon og Git med branches og commits underveis. I forrige innlevering glemte jeg litt bort tastaturnavigasjon og hadde for mye kode samlet i en fil. Derfor har jeg hatt ekstra fokus på dette i denne oppgaven. Jeg har prøvd å dele opp koden i mindre komponenter og funksjoner, og testet både navigasjon og VoiceOver. I tillegg til spillet ved å spille runder, navigere mellom sidene, laste siden på nytt og kontrollere mobilvisning.

## Utfordringer og feil

Jeg møtte på utfordringer med HOLD-styling, kortbytte og gammel spilltilstand i localStorage. Dette ga meg øvelse i CSS nesting, arrays og feilsøking.

Håndberegningen krevde at pokerhendene ble sjekket fra sterkest til svakest, og at ess kunne brukes til både høyt og lavt i en straight. Jeg fikk også bedre forståelse for hvordan TypeScript og tester kan hjelpe meg å oppdage feil. Ved testing med VoiceOver oppdaget jeg også at kortsymbolene ble lest opp flere ganger, og løste dette ved å gi kortene tydligere aria-labels.

## Valg jeg har tatt

Jeg delte prosjektet i sider, komponenter, hjelpefunksjoner og typer. Spilltilstanden ligger i en Zustand-store, men spillerlogikk og spillogikk er delt i egne filer for å holde koden oversiktlig. Jeg brukte persist for lagring ved reload. Spillerne fikk unike ID-er, og premiene ble samlet ett sted for å unngå duplisering.

Jeg brukte klassiske kortspill og kabal som inspirasjon til stylingen. Kortene bruker CSS Grid og CSS Modules, og jeg valgte en Card-component med en back-prop for både forside og bakside fordi de deler mye styling og representerer samme type element.
