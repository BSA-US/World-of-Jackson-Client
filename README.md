# World of Jackson

World of Jackson is an interactive feature, accessed on its own and from the [Dual Power Map](https://blacksocialists.us/dual-power-map), that explores [Cooperation Jackson](https://cooperationjackson.org/intro)'s mission to build a [Solidarity Economy](https://github.com/BSA-US/world-of-jackson/wiki/solidarity-economy) in West Jackson, its active projects, immediate challenges & needs, and long-term vision for Jackson, MS, and the broader region.

## Project overview

- [ ] A 3D map, with:
  - [ ] An accurate representation of Jackson, Mississippi
  - [ ] Points of interest that can be focused
- [ ] An overview of Cooperation Jackson that presents:
  - [ ] What is a dual power project?
  - [ ] The mission and purpose of CJ's project
  - [ ] The four institutions the project will establish
  - [ ] The material conditions surrounding the project, and their present challenges as an organization with limited capacity
  - [ ] Cooperatives and other relevant institutions in Jackson, Mississipi _(& triggering focus on the map)_
- [ ] A timeline of events, with:
  - [ ] The history preceding & precipitating Cooperation Jackson _(& triggering focus on the map)_
  - [ ] Updates posted by members of Cooperation Jackson _(& triggering focus on the map)_

## Contributing

Make sure you read the [contributor guidelines](https://github.com/BSA-US/world-of-jackson/blob/dev/CONTRIBUTING.md) before you move on. If you're new to open-source or you're still not sure how to start contributing, we now have a [beginner's guide](https://github.com/BSA-US/world-of-jackson/blob/dev/BEGINNER.md).

## Setup

### Basic setup

1. Check out the `dev` branch:
    ```sh
    git checkout dev
    ```
2. Create a new branch:
    ```sh
    git checkout -b feature/my-cool-thing
    ```
3. Install dependencies:
    ```sh
    yarn
    ```

### Run World of Jackson

```sh
yarn dev-remote
```

This will use the dev API hosted at [https://world-of-jackson-git-dev.blacksocialists.now.sh/api](https://world-of-jackson-git-dev.blacksocialists.now.sh/api)

### Develop components in isolation

```sh
yarn storybook
```

### Develop API endpoints

To make changes to the API, you'll first need to create your own [Vercel](https://vercel.com) project:

#### Additional setup

1. Configure your Vercel project
    1. Create an account
    2. Create a project
    3. In the general settings, add the following environment variables:
        - Production environment:
          - `CONTENTFUL_CONTENT_DELIVERY_API_TOKEN`: `u2t0rmxih-X9gkSpY_95PZJVa24-ufFSK4iVfPxPDho`
          - `CONTENTFUL_ENVIRONMENT`: `master`
          - `CONTENTFUL_SPACE_ID`: `7zzvnrgo4q2e`
        - Preview & development environments
          - `CONTENTFUL_CONTENT_DELIVERY_API_TOKEN`: `YxKrxYCp3AdRcB4wRjFS_tIT49DyByCqyogZ-K-kJmE`
          - `CONTENTFUL_ENVIRONMENT`: `dev`
          - `CONTENTFUL_SPACE_ID`: `7zzvnrgo4q2e`
3. Configure your local environment
    1. Install `now` globally:
        ```sh
        yarn global add now
        ```
    2. Link your local repo to your Vercel project:
        ```sh
        now
        ```
    3. Pull your environment variables:
        ```sh
        now env pull
        ```

#### Run World of Jackson with your local API

```sh
now dev
```