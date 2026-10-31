# Space Exploration, Cultivation & Domination

*A working concept for a multiplayer, turn-based space strategy game.*

## Overview

The game is about exploring a procedurally generated network of planets, expanding across it, and competing with other players for control. It is intended to support online multiplayer, with possible CPU players in the future.

The initial vision included planet development, resources, population, technology, and tactical battles. That scope grew quickly, so the first version should be much smaller: a **Risk-like game about planets, moving forces, and conquering territory**. More complex systems can be added once the core game is fun.

The game should use a simple 2D interface. Fancy graphics are not a priority.

## Core Design Goals

- Support asynchronous play, so players don’t have to be online at the same time.
- Let players submit and revise orders during a planning period.
- Resolve everyone’s orders together.
- Avoid unnecessary action limits; in the long run, resources, population, and production capacity can limit what players do.
- Leave room to expand the game gradually without making the first version too complex.
- Aim for multiple viable strategies rather than one consistently dominant strategy.

## Proposed Basic Game

The first playable version could focus on:

- A map of planets connected by routes.
- Players starting with one or more planets and some forces.
- Planets generating resources or forces over time.
- Players sending forces between connected planets.
- Dice-based battles when forces meet.
- Victory through elimination, reaching a turn limit, or completing another objective.

This is a starting point, not a final ruleset.

## Map and Travel

The map is a network:

- **Planets are nodes.**
- **Routes are edges** connecting planets.
- Each route can have a distance.
- Ships or forces have a travel speed.
- Travel between planets can take one or several rounds.
- Players should be notified during resolution when their forces arrive.

### Exploration and visibility — undecided

Possible approaches discussed:

1. Show the whole network from the beginning, but hide planet details such as resources, habitability, and ownership.
2. Reveal the map gradually as players explore.
3. Generate the complete map at the start but show each player only the planets and routes they have discovered.
4. Let planets reveal nearby space based on their visibility range.

Sensors and technology could extend visibility. Better sensors might reveal more about enemy fleets, ranging from detecting an incoming attack to identifying its owner, size, and ship types.

The exact exploration and visibility rules should be decided later, potentially with input from friends.

## Multiplayer and Round Structure

The game is intended to support simultaneous planning:

1. Players enter orders during a planning window.
2. Players can revise or cancel their orders before that window closes.
3. Orders resolve together.
4. Players receive reports about movement, arrivals, and battles.
5. The next round begins.

The planning window could last anywhere from minutes to days, depending on the game mode. The asynchronous mode is the main focus for now.

If a player submits no orders before the window closes, they **pass** for that round. Automatic actions for inactive players could be considered later.

Players may want to pause a game when someone is away, then resume it. How pauses work—such as whether they require host control or agreement from other players—is undecided.

## Actions and Production

The initial design considered a limited number of actions per round, but that may not be necessary. A possible approach is to let players place as many orders as they can afford, with the planning window providing time to enter them.

In a more developed version:

- Resources and population could limit what players can order.
- Costs should be reserved when an order is submitted, so the same resources cannot be spent twice.
- Buildings and ships could take time to complete.
- Construction or training capacity could limit how much a planet produces at once.

These systems are **not part of the proposed small first version** unless testing shows they are needed.

## Combat

Combat is expected to involve dice-based randomness, with attacks and defenses affected by the forces and defenses present.

A possible combat sequence:

1. A fleet arrives at a planet.
2. The arriving player receives information about what is present, depending on what they can see.
3. Players choose tactics, if the rules allow.
4. The battle resolves using dice and the relevant attack and defense values.

Allowing players to choose tactics could make combat more interesting, but it creates a challenge for asynchronous play: the game needs a way to keep moving if someone does not respond. Default battle orders could solve this, but the details are undecided. This should be discussed further before committing to a system.

## Possible Future Systems

These ideas came up during discussion but should be treated as **future possibilities**, not requirements for the first version.

### Planet development and cultivation

Planets could differ in their resources and suitability for development. Some might require particular technologies or infrastructure before they can be settled or used effectively.

### Population

Population could grow over time up to a planet’s housing capacity. It might act as a resource required to build facilities or ships, with people permanently assigned to some jobs or structures.

Population use, housing, and autonomous buildings were discussed, but the rules are undecided.

### Technology

Technologies could apply to the whole civilization, unlocking new options across all planets. Some capabilities—such as a particular atmosphere or specialized facility—might still require planet-specific buildings.

### Deck building

A card system could represent technology, buildings, units, or special actions.

One possibility is a deck shared by the player or civilization. Another, more unusual option is for each planet to have its own deck. Neither approach has been chosen. It may be best to test the basic territory-and-battle game first and add cards later.

## Victory Conditions — undecided

Possible ways to win include:

- Be the last player remaining.
- Have the highest score when a turn limit is reached.
- Complete a specific objective.

A game could offer several victory modes for the host to choose from.

## Open Questions

- What exact rules should determine victory?
- How long should planning windows last in asynchronous games?
- Who can pause a game, and under what conditions?
- How much of the map is visible at the start?
- How should exploration reveal planets and routes?
- What information do sensors reveal at each level?
- Can players choose battle tactics, and what happens if they do not respond?
- How should capturing a planet affect its population, buildings, and defenses?
- Should the first version include cards, or should cards come later?
- What should planets produce in the simplest playable version?

## Suggested First Milestone

Build a small prototype with:

1. A procedurally generated map of connected planets.
2. A few players, each controlling a starting planet.
3. A simple rule for planets to generate forces over time.
4. Orders to send forces along routes.
5. Travel times based on route distance and force speed.
6. Dice-based battles when forces meet.
7. A simultaneous planning and resolution cycle.
8. One simple victory condition.

Once that version is enjoyable, add complexity one feature at a time—such as exploration, planet specialization, cards, technology, or population systems.
