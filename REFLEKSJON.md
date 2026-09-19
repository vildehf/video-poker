# Refleksjon

## Arbeidsprosess

Jeg startet med å sette opp prosjektet og lage de tre sidene Spill, Regler og Spillere. For å navigere mellom de tre sidene brukte jeg React Router.

Etter det begynte jeg med kortene. Jeg lagde typen "PlayingCard" og en "Card-komponent" som viser kortets verdi og symbol. Deretter lagde jeg en kortstokk med 52 kort og funksjonalitet for å stokke kortene og dele ut fem kort.

Jeg har jobbet stegvis med oppgaven og brukt Git underveis, samt ulike branches for de ulike delene av prosjektet og gjort commits når jeg har kommet til naturlige delmål.

Jeg testet også spillet underveis både ved å spille flere runder, refreshe siden og bruke tastaturet. Jeg sjekket blant annet at spilltilstanden fortsatt var der etter refresh, og at knapper og kort kunne brukes med tastaturet når de skulle være aktive. Jeg brukte også "npm run build" underveis for å sjekke at prosjektet kunne bygges uten TypeScript-feil.

## Utfordringer og feil

Jeg støtte på en utfordring da jeg skulle lage HOLD-funksjonen for kortene. Jeg hadde lagt ".held" inni ".card" i CSS-en, men stylingen ble ikke brukt når jeg trykket på et kort. Jeg lærte at når begge klassene er på samme element må jeg bruke "&.held" med CSS nesting.

Jeg fikk også problemer da nye kort skulle deles ut. I starten kunne kort som allerede var på hånden bli delt ut på nytt. Jeg løste det ved å filtrere bort kortene som allerede var i hånden før nye kort ble valgt. Det gjorde at jeg fikk bedre forståelse for hvordan filter og arrays kan brukes i spill-logikk.

Jeg fikk også en feil da jeg begynte å flytte spilltilstanden til Zustand. Det lå gammel spilltilstand i localStorage som ikke passet med den nye strukturen i koden. Dette førte til at spillet krasjet. Jeg lærte at localStorage kan inneholde gammel data mens man utvikler, og at dette kan påvirke den nye koden selv om koden i seg selv ser riktig ut.

Det var også utfordrende å lage funksjonen som sjekker pokerhånden. Jeg måtte sjekke hendene i riktig rekkefølge, slik at for eksempel Royal Flush blir funnet før Straight Flush og Flush. Jeg måtte også passe på at ess kunne brukes lavt i en straight med A, 2, 3, 4 og 5. Dette ga meg mer trening i arrays og funksjoner som map, sort og every.

## Valg jeg har tatt

Jeg valgte å dele prosjektet inn i "pages" og "components". Sidene brukes til de tre hovedsidene i applikasjonen, mens komponenter brukes til deler som "Card", "Game", "Totalcoins", "Currentbet" og "Payouttable". Dette gjør det lettere å holde oversikt over prosjektet.

Jeg valgte å lage kortene med CSS i stedet for bilder. Kortets verdi og symbol kommer fra "PlayingCard", mens CSS brukes til utseendet. Jeg valgte også å bruke CSS Modules slik at stylingen kan holdes sammen med de ulike delene av applikasjonen.

Jeg valgte å bruke den samme "Card"-komponenten for både forsiden og baksiden av kortet. Jeg la til en "back"-prop som bestemmer om baksiden skal vises. Jeg valgte dette fordi forside og bakside fortsatt er to varianter av et spillkort, og da slipper jeg å lage en ekstra komponent med mye av den samme stylingen.

Jeg valgte også å lage en "utils"-mappe for funksjoner som ikke trenger å være egne React-komponenter. Her ligger blant annet "createDeck", "shuffleDeck" og "checkPokerHand". "createDeck" lager kortstokken med 52 kort, "shuffleDeck" stokker kortstokken, og "checkPokerHand" sjekker hvilken pokerhånd kortene utgjør. Jeg valgte å skille disse ut fra "Game" for å gjøre spillkoden enklere å lese og holde funksjonene adskilt etter hva de gjør.

Jeg startet med React state og localStorage for å forstå spill-logikken steg for steg. Etter at vi lærte Zustand flyttet jeg den felles spilltilstanden til en Zustand-store. Her lagres blant annet valgt spiller, kortstokken, hånden, kastede kort, innsats og hvilke kort som er valgt til HOLD. Jeg brukte også persist slik at spilltilstanden blir lagret når siden lastes inn på nytt.
