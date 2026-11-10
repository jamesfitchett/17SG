# 17SG team workspace

The shared workspace for 17SG, a PC game about the UN Sustainable Development Goals (IncUB8 / UH 4504, Virginia Tech).

- **Foundation:** problem statement, mission, goals, this semester's deliverables.
- **The game:** what's decided, then the Hub, Mini games and Rapid Response, each with proposed decisions and mapped ideas to vote on.
- **Playbook:** how game studios work, sized to our sprint to Dec 3.
- **Votes:** every proposed decision, the tally, and the decision log.
- **Plan:** timeline (Gantt), team roles, deliverables.
- **Research:** personas, stakeholders, How Might We, Four Sets.
- **Discuss:** open questions and every comment.

Votes are stored with each person's comments (`people/{uid}`), so no database rule changes are needed.

## Signing in

Press **Sign in** and choose **Continue with Google**, using the Gmail address James added. Only emails on the team list can get in. James manages the list from **Team access**.

## How it's built

- `index.html`: the whole site.
- `seeds.json`: starter content. James loads it once from **Team access > Load starter content**.
- `firestore.rules`: the database security rules. Paste them into Firebase > Firestore > Rules.
- Data and sign-in run on Firebase (Firestore and Google sign-in). Hosting is GitHub Pages.

The Firebase web config in `index.html` isn't a secret; Firebase web apps are designed to ship it. The security rules are what protect the data.
