# Refleksjon

## Arbeidsprosess

Jeg startet med å sette opp prosjektet og lage de tre sidene Spill, Regler og Spillere. For å navigere mellom de tre sidene brukte jeg React Router.

Etter det begynte jeg med kortene. Jeg lagde typen "PlayinCard" og en "Card-komponent" som viser kortets verdi og symbol. Deretter lagde jeg en kortstokk med 52 kort og funksjonalitet for å stokke kortene og dele ut fem kort.

Jeg har jobbet stegvis med oppgaven og brukt Git underveis, samt ulike branches for de ulike delen av prosjektet og gjort commits når jeg har kommet til naturlige delmål.

## Utfordringer og feil

Jeg støtte på en utfordring da jeg skulle lage HOLD-funksjonen for kortene. Jeg hadde lagt ".held" inni ".card" i CSS-en, men stylingen ble ikke brukt når jeg trykket på et kort. Jeg lærte at når begge klassene ikke er på samme elementet må jeg bruke "&.held" med CSS nesting.

Jeg fikk også problemer da nye kort skulle deles ut. I starten kunne kort som allerede var på hånden bli delt ut på nytt. Jeg løste det ved å filtrere bort kortene som allerede var i hånden før nye kort ble valgt. Det gjorde at jeg fikk bedre forståelse for hvordan filter og arrays kan brukes i spill-logikk.

## Valg jeg har tatt

Jeg valgte å dele prosjektet inn i "pages" og "components". Sidene brukes til de tre hovedsidene i applikasjonen, mens komponenter brukes til deler som "card", "game", "totalcoins", "currentbet" og "payouttable". Dette gjør det lettere å holde oversikt over prosjektet.

Jeg valgte å lage kortene med CSS i stedet for bilder. Kortets verdi og symbol kommer fra "PlayingCard", mens CSS brukes til utseendet. Jeg valgte også å bruke CSS Modules slik at stylingen kan holdes sammen med de ulike delen av applikasjonen.

Jeg valgte også å lage en "utils"-mappe for funksjoner som ikke trenger å være egne React-komponenter. Her ligger blant annet "createDeck" og "shuffleDeck". "createDeck" lager kortstokken med 52 kort, mens "shuffleDeck" stokker kortstokken. Jeg valgte å skille disse ut fra "Game" for å gjøre spillkoden enklere å lese og holde funksjonen adskilt etter hva de gjør.

Jeg har foreløpig jobbet med React State og localStorage for å forståe spill-logikken steg for steg. Zustand skal brukes senere til den felles spilltilstanden når dette er gjennomgått i undervisning.
