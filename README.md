# 17SG team workspace

The shared workspace for 17SG, a PC game about the UN Sustainable Development Goals (IncUB8 / UH 4504, Virginia Tech).

- **Foundation:** problem statement, mission, goals, this semester's deliverables.
- **The game:** what's decided, then the Hub, Mini games and Rapid Response, each with proposed decisions and mapped ideas to vote on.
- **Playbook:** how game studios work, sized to our sprint to Dec 3.
- **Votes:** every proposed decision, the tally, and the decision log.
- **Plan:** timeline (Gantt), team roles, deliverables.
- **Research:** personas, stakeholders, How Might We, Four Sets.
- **Discuss:** open questions and every comment.
- **History:** a permanent, append-only record of every comment, vote, vote change, delete and @mention.

## Nothing gets lost

- Each person's comments and votes live in `people/{uid}`. The rules only let that list grow: nothing can be removed and the record can't be deleted.
- Deleting a comment hides it. Changing a vote adds a new vote on top. The site always merges, never overwrites.
- Every action is also written to `log`, which nobody can edit or delete.
- James's browser saves a full copy to `backups` once a day, and **History > Download full backup** saves one to disk.

## Who can edit

- Anyone on the team can add entries and comment.
- James can edit, delete and restore everything, including the proposed decisions on the Votes tab (stored in `decisions`) and hiding comments (`moderation`).
- Teammates can edit only what they added.

## @mentions

Type `@` in a comment or thumbs-down reason to tag a teammate. They get an email through `mail/Code.gs`, a Google Apps Script running under James's account. Paste its web app URL into `window.MAIL_URL` in `index.html`. Without it, tagging opens the writer's email app instead.

## Signing in

Press **Sign in** and choose **Continue with Google**, using the Gmail address James added. Only emails on the team list can get in. James manages the list from **Team access**.

## How it's built

- `index.html`: the whole site.
- `seeds.json`: starter content. James loads it once from **Team access > Load starter content**.
- `firestore.rules`: the database security rules. Paste them into Firebase > Firestore > Rules.
- Data and sign-in run on Firebase (Firestore and Google sign-in). Hosting is GitHub Pages.

The Firebase web config in `index.html` isn't a secret; Firebase web apps are designed to ship it. The security rules are what protect the data.
