//configuration file
//In this section, if you don't want to draw a value, set it to false.

var hp_draw = true;
var hp_numeric_draw = true;
var species_name_draw = true;
var held_item_draw = true;
var nickname_draw = true;
var pokeball_draw = true;
var gender_draw = true;
var types_draw = true;
var shiny_star_draw = true;
var sprite_draw = true;
var level_draw = true;
var status_draw = true;
var experience_draw = true;
var moves_draw = true;
var shiny_star_draw = true;

//328 is default for sdp's code
var health_bar_width = 277;
var exp_bar_width = 277;
// image and sprit locations / extensions

//image sprites must be lowercase nospaces of the images. e.g Max Revive = maxrevive.xxx
var item_images_root = "https://www.serebii.net/itemdex/sprites/";
var item_extension = ".png";

//pokemon sprites must be lowercase names of pokemon only. e.g. Bulbasaur = bulbasaur.xxx Mr. Mime = mr.mime.xxx Make sure the egg sprite is also with the pokemon sprites, and write its filename below as a full filename e.g. egg.png
var pokemon_normal_sprites_root = "sprites/normal_sprites/";
var pokemon_shiny_sprites_root = "sprites/shiny_sprites/";
var pokemon_sprites_extension = ".gif";
var egg_filename = "egg.png";
