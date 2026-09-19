# Video Poker

Et videopokerspill laget med React, TypeScript, React Router og Zustand.

## Kom i gang

Installer avhengighetene:

```bash
npm install
```

Start utviklingsserveren:

```bash
npm run dev
```

Åpne adressen som vises i terminalen.

## Spillet

- Opprett eller velg en spiller. Nye spillere får 100 mynter.
- Velg innsats og hvilke kort du vil beholde med HOLD.
- Bytt kort én gang per runde og få premie etter pokerhånden.
- Spilltilstanden lagres i localStorage i nettleseren.

Appen har egne sider for spillet, regler og spillere.

## Prosjektstruktur

- `src/components`: spillbrett og gjenbrukbare komponenter.
- `src/pages`: de tre sidene i appen.
- `src/store`: spilltilstand og handlinger i Zustand.
- `src/types`: TypeScript-typer.
- `src/utils`: kortstokk, stokking, håndberegning og premier.

## Kontroller

Bygg prosjektet:

```bash
npm run build
```

Kjør kodekontroll:

```bash
npm run lint
```

Kjør testene for pokerhender med Node 22.6 eller nyere:

```bash
node --experimental-strip-types --test src/utils/checkPokerHand.test.ts
```

## Manuell testing

Mobilvisning og tastaturnavigasjon er testet. Det er også kontrollert
at kort og saldo beholdes ved navigasjon mellom sidene og ved reload.
