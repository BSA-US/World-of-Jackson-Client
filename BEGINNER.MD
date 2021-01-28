## Beginner's Guide to Contributing to WOJ

This is a detailed writeup that introduces newcomers to contributing to [World
of Jackson](https://github.com/BSA-US/world-of-jackson/) and open-source in
general.

These aim to be very in depth and take you through the process of finding an
issue, working through it, and submitting a PR (pull request).

At some point, I will release a set of videos covering the same material.

### Introduction

Although there is already enough info for some to get started by just reading
the [README](https://github.com/BSA-US/world-of-jackson/blob/master/README.md)
and the
[CONTRIBUTING](https://github.com/BSA-US/world-of-jackson/blob/master/CONTRIBUTING.md)
docs, the following is aimed to be a more step-by-step writeup for first-timers
and those who might be unfamiliar with this particular workflow.

Before we go on to the technical details, it's important to discuss team norms.
In order to be welcoming to new developers, we should keep in mind that tech and
open source are privileged spaces. The know-how and leisure time required to
contribute to this project is not equally distributed in the world! So those who
have more time and expertise should actively reach out and help others who are
just starting out or stuck. A lot of open source projects assume you already
know how to contribute, but that's not always the case. That's the primary
reason for having this document after all.

On the other hand, newcomers should remember that all existing contributors are
using their own free time and maybe have other commitments and life outside of
this project. Be patient, but ask for help!

Note: when our norms are more ironed out, we can create a separate page and I
will link it to this document.

### Finding your first issue

1. Go to the [issues](https://github.com/BSA-US/world-of-jackson/issues) page to
see what's available to be worked on. Issues should be regularly tagged with
their complexity level. It's a good idea to find one that's tagged with "good
first issue" if you're new to the project.

2. Check that the issue doesn't currently have an assignee (top right side of
the issue page).

3. To get assigned, you can leave a comment saying you'd like to work on it, or
better yet, attend one of the weekly tech meetings and volunteer directly ([see
the Basecamp calendar](https://3.basecamp.com/4111666/reports/schedules/upcoming) for more
information).

### Forking the repo

If you're not a core contributor to the project, you'll want to fork WoJ to your
own repo. That's the top rightmost button on the repo page. Forking basically
means you're creating a copy of the project and any changes you make to it won't
affect the main project. To make your changes go into the main project, you'll
need to create a [Pull Request](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/about-pull-requests).

In the next steps I will assume you have a terminal with git installed.

### Setting up Git

This project has an extra requirement that all of your commits are signed. This
ostensibly prevents others from assuming your identity and making commits on
your behalf, although ultimately all code reviewers should be vigilant about what
is going into the codebase during the PR review phase.

Note: when our security norms are more ironed out, I may link to it here.

To start off, run this command to see if you already have GPG signing turned on for git:

```
git config --get commit.gpgsign
```

If that returns `true`, you can skip to "Addressing the issue". Otherwise, you'll need to ensure that you have GPG set up.

```
gpg --list-keys --keyid-format LONG
```

If you don't have the `gpg` command at all, see
[this](https://blog.ghostinthemachines.com/2015/03/01/how-to-use-gpg-command-line/)
or do some searching on how to get that. You can generate new keys with `gpg
--full-generate-key`

Once you have created a key, you also need to tell `git` about it. See [this](https://docs.github.com/en/github/authenticating-to-github/telling-git-about-your-signing-key)

Also, you will want to enable signing by running 

```
git config --global commit.gpgsign true
```

Github needs to know your public key to recognize your commits as well. Do the following:

```
gpg --armor --export <KEY ID>
```

where `<key id>` would be for example `3AA5C34371567BD2` in `sec 4096R/3AA5C34371567BD2
2016-03-10 [expires: 2017-03-10]` when you run `gpg --list-keys --keyid-format LONG`.

Now, you should see `-----BEGIN PGP PUBLIC KEY BLOCK-----` and a large string.
Copy and paste entire block into Github by following [these instructions](https://docs.github.com/en/github/authenticating-to-github/adding-a-new-gpg-key-to-your-github-account).

In your terminal, go to the folder you want to be your project workspace and type the following, replacing `<YOUR ACCOUNT>` with your account name:

```
git clone git@github.com:<YOUR ACCOUNT>/world-of-jackson.git
```

Your local machine will recognize whatever location you cloned from as the *origin*. We need to run the following to also add the main BSA WOJ repo as the *upstream*.

```
git remote add upstream git@github.com:BSA/world-of-jackson.git
```

When you make changes you'll update *origin*, but when you want to pull other's changes, you'll pull from *upstream*.


### Running the app locally

We're now ready to get the project running locally on your machine! If you've
worked with React projects in the past, this section should be quite familiar to
you.

At minimum you'll need [Node](https://nodejs.org/en/) and
[Yarn](https://yarnpkg.com/) installed before this next step.

First, let's switch to the development branch which has the latest changes. This is the starting point for addressing any new issue. So run

```
git checkout dev
```

If you look at your current directory, you should see a bunch of files,
including a `package.json` - if you open that, you should see a `scripts`
section. The two scripts we care about at this stage are `dev`, which runs the
app, and `storybook`, which runs a [Storybook](https://storybook.js.org/) server
that allows us to view components in isolation.

Run `yarn` to install all the dependencies for the project.

After that's done, run `yarn run dev` to start up the app. You should see

```
[ ready ] compiled successfully - ready on http://localhost:3001
```

If you go to `http://localhost:3001` you should see a map of Jackson!

### Addressing the issue

For this next section, I'm going to implement a simple H1 component to address
this [issue](https://github.com/BSA-US/world-of-jackson/issues/71). Obviously
your task is going to be different, so this section might not be exactly
applicable. But I will try to point out what is relevant for any issue
requiring code changes.

For one, notice that this issue has a design in [Figma](https://www.figma.com/file/Fnz2yTpOqI7YYv05Y7qSEE/world-of-jackson?node-id=527%3A587)

That tells us what the look and feel of the component will be, and also what
states need to be accounted for. Translating designs to code can be tricky
because not everything may be fully specified, so remember to ask questions in
the issue if you're unsure of it. Since other maintainers cannot respond
immediately, you may need to make an educated guess to unblock yourself. Often
you'll have to make multiple passes at a component, allowing others to review
and suggest changes, before it can be merged.

Back to the task: for this H1, there will be 3 states: inline, floating, and collapsed.

First we want to make a new branch off of `dev`. Since this is a feature, I would do something like:

```
git checkout -b feature/H1component
```

Note: replace `feature` with `bugfix` if you're working on a bug.

Let's create a directory for this component. Notice that the folder structure is currently:

```
world-of-jackson/
  components/
    Map/
    SiteNav/
    ...
  ...
```

Let's create a directory for the H1 component by running 

```
mkdir components/H1
```

Then let's create a file for the component and for the story.

```
touch components/H1/index.tsx
touch components/H1/index.stories.js
```

In `index.tsx` I would implement my component. A lot of components will start off like this:

```
import React, {ReactElement} from 'react';
import styled from 'styled-components';

interface H1Props {
  onClick?: Function;
  collapsed?: boolean;
  inline?: boolean;
  children: ReactElement;
}

const Title = styled.button`
  border-radius: 20px;
  background-color: #fff;
`

const H1 = ({
  children,
  collapsed,
  inline,
  onClick
}) => {
    return (<Title>{children}</Title>)
}

export default H1;

```

To see the full component, check this PR: https://github.com/BSA-US/world-of-jackson/pull/77/files

Note: since we're using TypeScript, the `interface` (custom type) is the most
important piece of code for understanding what your component can do. It should
be near the top. In this case, the issue already had a list of props for the
designer thinks should go into the component, which makes things easier for me!

I usually create a dummy return at first, and in this case I think that it
should take a children prop and render it. Since I'm only implementing a design,
with no real changes to how data flows, it's actually a good idea to take a
"story-first" approach. So I would run:

```
yarn run storybook
```

If you haven't used it before, definitely check out the docs for Storybook (link
in references). To create a simple story, I would write the following into the
`H1.stories.js` file I created:

```
import React from "react";
import H1 from './H1';

export default {
  title: 'H1'
}

const onClick = () => window.alert('Hi!')

export const Inline = () => <H1 inline onClick={onClick}>World of Jackson</H1>
export const Floating = () => <H1 onClick={onClick}>World of Jackson</H1>
export const Collapsed = () => <H1 collapsed onClick={onClick}>World of Jackson</H1>
```

Your Storybook should automatically refresh and show the various states of your
component (inline, floating, and collapsed). Now you can develop your component and get instant feedback.

### Submitting your PR

Now that you have something you think is ready for another pair of eyes, let's submit our work.

Make sure that the right work is staged by running `git status`. 

Also make sure you're still on the right branch. In this case, it was `feature/H1component`.

Use `git restore --staged <file>` to remove things from the stage. Use `git add <file>`
to add things to it. Knowing when to add files individually and when it's okay
to `git add .` to add everything is a matter of experience. Fortunately almost
anything is undoable in `git`. Once your stage is good, run:

```
git commit -m "<MSG>"
```

where `<MSG>` should be a description of what you did. Writing good commits is
also a matter of experience, but a good place to start is [this
article](https://chris.beams.io/posts/git-commit/).

Once you've committed, you still need to push your commit up to your origin, so run

```
git push
```

To open a PR, go to your repository on Github and either click the big green
notice that should've appeared at the top (something like "a change was recently
pushed, click here to open a PR") or follow [these
instructions](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request).

Make sure your branch is being compared to `dev` branch of the BSA repo. In the description of the PR, I try to always link to the issue it is fixing. I also like to note any unfinished work or points that you were unsure about. Something like:

```
Fixes #77

- [x] Inline state 
- [x] Collapsed state 
- [ ] Floating state 

Should this have a tooltip?
```

I also generally like to check the "Files changed" section of the PR to see if I
left something out.

Finally, make sure you add at least one reviewer. Larger PRs generally should
have more reviewers though the exact amount varies per project (see team norms
document). If the reviewer comes back with suggestions, or if they don't respond
for awhile, don't be discouraged: it's normal, especially for open source. It's
also good to follow up periodically in the original issue, but always be
respectful of the contributors. Nothing is stopping you from working on the next
issue while your original PR is waiting for review.

That's it! You've made your first contribution.

References:

- [React](https://reactjs.org/docs/getting-started.html)
- [TypeScript](https://www.typescriptlang.org/) 
- [Storybook](https://storybook.js.org/docs/react/get-started/introduction)
- [Contentful](https://www.contentful.com/)
