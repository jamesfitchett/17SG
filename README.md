# 17SG team workspace

The shared workspace for 17SG, a PC game about the UN Sustainable Development Goals (IncUB8 / UH 4504, Virginia Tech).

- **Pitch:** the Hub concept, storyboards, and every team idea.
- **Plan:** timeline (Gantt), team roles, deliverables.
- **Research:** personas, stakeholders, How Might We, Four Sets.
- **Discuss:** open questions and the pin board.

## Signing in

Press **Sign in**, enter your name and email, and open the link we email you. Only emails on the team list can get in. James manages the list from **Team access**.

## How it's built

- `index.html`: the whole site.
- `seeds.json`: starter content. James loads it once from **Team access > Load starter content**.
- `firestore.rules`: the database security rules. Paste them into Firebase > Firestore > Rules.
- Data and sign-in run on Firebase (Firestore and passwordless email-link auth). Hosting is GitHub Pages.

The Firebase web config in `index.html` isn't a secret; Firebase web apps are designed to ship it. The security rules are what protect the data.
