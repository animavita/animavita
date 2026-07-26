<h1 align="center">
  <br>
  <img src="https://i.imgur.com/amrsFJK.png" alt="Animavita" height="125" width="125">
  <br>
  <img src="https://i.imgur.com/iSizpPl.png" alt="Animavita" height="45" width="">
  <br><br>
</h1>

<p align="center">A minimal, clean and beautiful mobile app to help people find the closest pet friend to adopt, rescue lives and change the world.</p>

<p align="center"><i>"How to save a life?" - The Fray</i> </p>

<p align="center">
  <a href="https://animavita.pet">
    <img src="https://img.shields.io/badge/_Website-animavita.pet-green?style=for-the-badge" alt="Website">
  </a>
</p>

<p align="center">
  <a href="https://discord.gg/BHHz77rhb6">
    <img src="https://img.shields.io/discord/829042103295410197?color=%237289DA&label=Animavita&logo=discord&logoColor=white" alt="Discord">
  </a>
  <a href="http://makeapullrequest.com">
    <img src="https://img.shields.io/badge/contribuition-welcome-brightgreen.svg" alt="PRs Welcome">
  </a>
  <a href="https://saythanks.io/to/wendelfreitas">
      <img src="https://img.shields.io/badge/SayThanks.io-%E2%98%BC-1EAEDB.svg">
  </a>
<a href="https://www.repostatus.org/#wip"><img src="https://www.repostatus.org/badges/latest/wip.svg" alt="Project Status: WIP – Initial development is in progress, but there has not yet been a stable, usable release suitable for the public." /></a>  
</p>

## :blush: **Why?**

Animavita is a combination of two Latin words, ‘Animal’ and ‘Vitae’, which means respectively ‘Animal’ and ‘Life’. This is an idea to create or animate something that was born a while ago, when I realized that facebook is used to publicize adoption and also ask for help for animals that lives on the streets.

Animavita's purpose is not to change how people use facebook to the activities described above, but to centralize the helpful information in a single application. Anyone can make an adoption request, but it doesn’t mean that the pet will be automatically adopted. It means that the person interested can talk to the person who registered the pet, allowing both sides to have a conversation, and the user to research and decide his favorite pet.

## :dizzy: **Roadmap**

v2 is a rebuild: a simpler Animavita with a cleaner UI and a codebase that makes new features cheap to add. The goal is to get the whole owner-to-adopter loop working end to end — post a pet, find one nearby, request it, talk it over, agree — and to find out whether the decisions in [discussion #120](https://github.com/animavita/animavita/discussions/120) hold up in practice.

Complex features like in-app chat and push notifications come later.

**→ [What's left for v2, and how far along it is](https://github.com/animavita/animavita/milestone/5)**

That milestone is the single source of truth for v2 status. It used to be a checklist here, which drifted out of step with both the issues and the code — so status now lives in one place only, where it's computed rather than typed.

## :bulb: **How the app works**

The domain — what a Pet, an Adopter, an Adoption Request and a Wishlist actually are, and the rules that govern them — is documented in **[CONTEXT.md](./CONTEXT.md)**. The decisions behind those rules, and the trade-offs they cost, are in **[docs/adr/](./docs/adr/)**.

Read both before working on adoption logic. Several decisions there deliberately differ from what the current code does.

## Contributing

Read the [contribution guidelines](https://github.com/animavita/animavita/blob/v2/CONTRIBUTING.md) before contributing.

Good places to start:

- **[`good first issue`](https://github.com/animavita/animavita/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22)** — small, self-contained, and a gentle introduction to the codebase.
- **[`ready-for-agent`](https://github.com/animavita/animavita/issues?q=is%3Aissue+is%3Aopen+label%3Aready-for-agent)** — fully specified, with acceptance criteria and scope boundaries written down. Nothing left to guess at.

Some issues declare which others must land first. GitHub shows those as blocking relationships, so if an issue looks blocked, pick a different one — the frontier is whatever has no open blockers.
