# Making a platformer in a web browser

## Initial considerations

- use canvas?
- Use sprites?
- How do I make those sprites look pixelated?
- How to animate movement nicely?

## Plan

- [x] understand how to paint in canvas
- [x] understand how to include images/sprites in canvas
- [] Understand animation in canvas
    - animation is drawings updating themselves based on time
- [] Add sprite animation to canvas
- [] Work with time-based rules, like physics, gravity
- [] Look over how platformers are made and gather ideas from there

## Animating in canvas

- my scene should consist of obbjects
- objects know where they exist in the scene, world, and what they can do
- controls, from user interaction, are routed to relevant objects
- each object knows what to do when it receives a command - it changes its state
- each object knows how to draw itself
- each object gets affected by the passage of time
- each object knows how to draw itself based on a certain time
- should the object keep its own time (and that way objects that are not affected by time don't need to have this)
- or should time be kept universally and communicated to all objects?
- should we request for objects to draw themselves on the canvas from some general frame
- or should each object decide to draw itself when it changes its state and send the new drawing of itself to the canvas?
- how do we handle layers?