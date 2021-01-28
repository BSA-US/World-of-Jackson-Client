# Contributing to World of Jackson

- **If you'd like to be actively involved with the team,** you can [contact us to join the Basecamp](https://blacksocialists.us/contact), and we'll get you set up to join calls, chat with us about the vision, ideas, and design, and get access to more documentation and ways to collaborate.
- **Anyone outside the team** is welcome to collaborate with us through [issues](https://github.com/BSA-US/world-of-jackson/issues) and [pull requests](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request-from-a-fork).

## Tech stack

World of Jackson is a [Next.js](https://nextjs.org) app built on [Vercel](https://vercel.com/home), using [Vercel Serverless Functions](https://vercel.com/docs/v2/serverless-functions/introduction) for the API and [Contentful](http://contentful.com) for the database. It is written in [TypeScript](https://www.typescriptlang.org).

### Working on the Next.js client

- **CSS:** [Stylus](https://stylus-lang.com) with [locally scoped CSS modules](https://github.com/css-modules/css-modules/blob/master/docs/local-scope.md#css-modules--local-scope). Poke around the `/styles` directory to see what's up
- **Interacting with APIs:** [Isomorphic Unfetch](https://github.com/developit/unfetch/tree/master/packages/isomorphic-unfetch) (it's like axios, but waaay smaller)
- **Interacting with the database:** Import helpers from [the /db directory](https://github.com/BSA-US/world-of-jackson/blob/master/db)

## Getting started

1. Make sure to read [the wiki](https://github.com/BSA-US/world-of-jackson/wiki) if you're not 100% on what a Dual Power Project is
2. See what's up in the [projects](https://github.com/BSA-US/world-of-jackson/projects) and [issues](https://github.com/BSA-US/world-of-jackson/issues)
3. [Set up commit signing](https://help.github.com/en/github/authenticating-to-github/signing-commits)

## Writing commit messages

- So everyone can more easily read your work, please follow [the Conventional Commits standard](https://www.conventionalcommits.org/) for your commit messages
- When working on an issue, [reference it](https://help.github.com/en/github/writing-on-github/autolinked-references-and-urls#issues-and-pull-requests) in your commit message

This commit, in which I add this section of this document, might look like:
    ```
    docs(contrib): #17 add conventional commits
    ```

If I was doing this from a fork, I would instead say:
    ```
    docs(contrib): BSA-US/world-of-jackson#17 add conventional commits
    ```

## Submitting a pull request

1. Test your work
2. Bring your work up to date by rebasing it onto this repo's `master` branch (see below)
3. Test your work again
4. Create a pull request
5. Change the target branch of the PR to `dev`
6. Summarize your changes and [mention any relevant issues](https://help.github.com/en/github/writing-on-github/autolinked-references-and-urls#issues-and-pull-requests)
7. Submit your PR

### Rebasing

New to rebasing? It can be daunting the first time, but we'll get through this together.

#### Rebasing when collaborating from a fork

1. The first time you do this, add this repo as a remote in your forked repo:
    ```sh
    git remote add upstream https://github.com/https://github.com/BSA-US/world-of-jackson.git
    git fetch upstream
    ```
2. Rebase your local branch onto `upstream/master`
    ```sh
    git checkout my-branch
    git rebase upstream/master
    ```
3. Resolve the merge conflicts, choosing to keep your changes wherever you made them, and for all other conflicts choosing what is on `upstream/master`
4. When finished, force-push your newly in-sync branch:
    ```sh
    git push -f origin my-branch
    ```
5. Create a pull request across forks, making note of your changes

#### Rebasing when collaborating from within this repo

1. Rebase your local branch onto `master`
    ```sh
    git checkout my-branch
    git rebase master
    ```
2. Resolve the merge conflicts, choosing to keep your changes wherever you made them, and for all other conflicts choosing what is on `master`
3. When finished, force-push your newly in-sync branch:
    ```sh
    git push -f origin my-branch
    ```
4. Create a pull request, making note of your changes

## But what should I work on?

All contributions are welcome. We have our own priorities for the project which you can see:

- summarized in our [README](https://github.com/BSA-US/world-of-jackson/blob/master/README.md),
- broken down a bit more in our [Projects](https://github.com/BSA-US/world-of-jackson/projects), and
- fully broken down in the [issues](https://github.com/BSA-US/world-of-jackson/issues)

Are we missing something essential? [Create an issue](https://github.com/BSA-US/world-of-jackson/issues/new), assign it to yourself, and get going!!
