# frlgrse_dynamic_pokemon_tracker
A dynamic pokemon tracker built on javascript intended to be used as a browser source.

This pokemon tracker is designed to work with 3rd generation pokemon core series games, that is Ruby, Sapphire, Emerald, FireRed and LeafGreen. It was originally built for my run of FireRed on Twitch, and as such functionality was built with that in mind, but the current tracker *should* work with all generation III versions (eventually, once I get the files updated). So far I broke the supercode into a script for FR and LG, but there are instructions in there for RSE.

Beta testing is in progress on my Twitch Channel as I'm playing FireRed, , and if you find bugs, pop them in issues so Zia can patch them (or heck, if you have a patch, let me know so I can patch it in and I'll drop you credit). It is built on the LUA files built by pokelink, but quickly becoming modified to stip down excess data generation.

This tracker is a free to use project and always will be. Use it in your youtube videos, twitch channel, etc. Alls I ask is credit back to the github project so that other people can find and use it for themselves.

Please note that this version will be in 0.8.x during beta testing until I have finished testing all the code and am reasonably satisfied it is mostly bug free.  Once beta testing is complete, it will enter version 0.9.x.

Documentation on how to create custom scenes for your twitch overlays will be uploaded by 1 April 2022, though the code is heavily commented and all comments are up to date. Until then, feel free to poke me on twitter if you have any questions.

v0.8.2 (To Be Released shortly)
-Shiny Sprites would not render correctly. They now do.
-occasionally a pokemon would randomly be replaced with an Egg for no reason. This has been patched out.

v0.8.1 - Initial Release - Currently undergoing beta testing.
-Addressed Incorrect Typing. Fairy Pokemon did not exist in Gen III and their typing is now reflected to match

v0.8.0 - Initial Release - Currently undergoing beta testing. 

Current Functionality
-Live updating of:
  -HP
  -Nickname
  -Species Name
  -Exp points
  -Level
  -captured ball
  -held item
  -gender
  -pokemon type display
  -shiny vs non shiny status
  -pokerus status.
  -in battle status conditions and fainted condition
  -rendering the correct unown letter for caught unown
  -move roster
  -configuration files to help in layout of custom overlays


Features yet to be added.

-move roster moves all currently pull the bg color for normal type. update moves to pull color for move type.
-QoL updates for easily changing certain parameters. 

Known Bugs
-When switching pokemon during battle, the team shuffles momentarily.  This is caused by how the game throws data and Im looking to patch it.
-Occasionally during leveling up, pokemon will dissapear and be replaced with 'none'.
