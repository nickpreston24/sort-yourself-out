# Nuxt 3 Minimal Starter

We recommend to look at the [documentation](https://v3.nuxtjs.org).

## Setup

Follow [this template](https://github.com/danvega/nuxt3-tailwind3-starter)

## Development

Start the development server on http://localhost:3000

```bash
yarn dev
```

## Production

Build the application for production:

```bash
yarn build
```

Checkout the [deployment documentation](https://v3.nuxtjs.org/docs/deployment).

# [60-30-10% Rule](https://youtu.be/UWwNIMHFdW4):

pallete:
60% is the neutral color or creamy color. Can be a dark color
30% is the primary color
10% is the call to action color ("click me, do something with me" - like play buttons)

Reverse:
60% is the bright color
30% is a lighter hue
10% on the actionables, still
(colors instead of neutrals)

Dark:
60% really dark colors (black)
30% lighter colors (like a dark orange on black)
10% for accents/actionables (bright orange)

Gradients work well on the 30%.

# Todos

## Critical

- [x] Splash screen on start page
- [ ] Set up a Twilio account for SMS
- [x] Fix the Clear button on Tasks form.
- [x] Fix the input fields on tasks form.
- [ ] Add due dates
  - [ ] https://www.vuescript.com/datetime-range-picker/
- [x] Support nested Tasks
- [x] Support Assignments to Rewards
- [x] Put Tasks in a Grid
- [x] Learn CSS Grid :)
- [x] Add a Journal Textbox
- [x] (*optional*) Find or make a simple Gannt Chart
  <!-- - [ ] Add the Radial Progress bar to the Gannt chart. -->


![img](https://www.productplan.com/uploads/2019/11/Gantt-chart.png)


  -  Learn tables for the Gannt chart
- [x] Show the top 3 Rewards in small Cards
- [x] Show % Done for each card w/ radial progress

### Functionality
- [ ] (*optional*) Find a Schedule Template similar to Airtable's .
- [ ] Make Tasks assignable to subtasks
  - [ ] Design a 'Perfect Day' Task
  - [ ] Design a 'Essentials' Task
- [ ] Add a Scheduling button that sets the Frequency, "Daily", "Weekly", "Every other Month, starting 12am Tuesday", etc.
- [ ] Make the textarea larger on hover/edit
- [x] Add Modal
- [x] Use Modal when editing the textarea
- [x] A + sign for new Rewards (at the end of the grid)
- [ ] Airtable Pagification
  - [ ] Add Arrows for Pagification
- [x] Add a Task to a Reward
- [x] Pomodoro timer
  - [ ] [Emulate this](https://github.com/dejwid/react-pomodoro-timer/blob/master/src/Timer.js)
- [ ] Icons needed:
  - [x] Trashcan
  - [x] Checkmark
  - [x] Calendar
  - [x] Copy
  - [x] Cancel / 'X'
  - [x] Reload/Refresh
  - [x] Arrows, right and left
  - [x] Edit
  - [x] Up arrow for assignment
- [x] Diy tooltip on hover
- [ ] Fix: For your `/atoms` components, use the inline darkMode switcher: `:class='darkMode ? bg-regal-800 : bg-sunglo-500'`

## Nice to haves

- [ ] [Overlay navigation](https://www.w3schools.com/howto/howto_js_fullscreen_overlay.asp)
- [ ] Toasts
- [ ] Tooltips
- [ ] Repeating (lobster) svg backgrounds
- [ ] Expand things (say, your Task Cards on hover) slowly and smoothly by animation...think of a Flubber-like animation where a Card shrinks or grows and shows content into that space.  For example, the `<textarea>`s could warp in and out of existence...
- [ ] [Export](https://github.com/simonw/airtable-export) Airtable contents to disk
- [ ] AirtableField.vue -- Dynamic field, like the Typography, which provides the right component for the value, based on the airtable primitive type.  [Inspiration](https://www.airtable.com/developers/scripting/api/field)
- [ ] Luxon for timestamps.  It seems to need to be plugged in...which was hard.
- [ ] vue-preferences ... again, plugins don't work well right now.
- [ ] marked for MD support
- [ ] Funny fonts like a superhero/villain font.

