//sets some CSS values from the configuration file
var configuration_loop = 1;

while(configuration_loop < 7){
    document.getElementById("roster_".concat(configuration_loop, "_exp_border")).style.width = exp_bar_width;
    document.getElementById("roster_".concat(configuration_loop, "_border")).style.width = health_bar_width;
    
    configuration_loop ++;
}

//creates various arrays of pokemon data looked up by pokemon types for the pokemon types. Each type is assigned a number which is used later to call the correct data from this array. 

//Defines the filenames of all pokemon. if your sprite files are different, edit them here. pokemon_file_names[0] is empty so this array can be referenced using species number (based on national pokedex)
const pokemon_file_names = ["", "Bulbasaur", "Ivysaur", "Venusaur", "Charmander", "Charmeleon", "Charizard", "Squirtle", "Wartortle", "Blastoise", "Caterpie", "Metapod", "Butterfree", "Weedle", "Kakuna", "Beedrill", "Pidgey", "Pidgeotto", "Pidgeot", "Rattata", "Raticate", "Spearow", "Fearow", "Ekans", "Arbok", "Pikachu", "Raichu", "Sandshrew", "Sandslash", "Nidoran_f", "Nidorina", "Nidoqueen", "Nidoran_m", "Nidorino", "Nidoking", "Clefairy", "Clefable", "Vulpix", "Ninetales", "Jigglypuff", "Wigglytuff", "Zubat", "Golbat", "Oddish", "Gloom", "Vileplume", "Paras", "Parasect", "Venonat", "Venomoth", "Diglett", "Dugtrio", "Meowth", "Persian", "Psyduck", "Golduck", "Mankey", "Primeape", "Growlithe", "Arcanine", "Poliwag", "Poliwhirl", "Poliwrath", "Abra", "Kadabra", "Alakazam", "Machop", "Machoke", "Machamp", "Bellsprout", "Weepinbell", "Victreebel", "Tentacool", "Tentacruel", "Geodude", "Graveler", "Golem", "Ponyta", "Rapidash", "Slowpoke", "Slowbro", "Magnemite", "Magneton", "Farfetchd", "Doduo", "Dodrio", "Seel", "Dewgong", "Grimer", "Muk", "Shellder", "Cloyster", "Gastly", "Haunter", "Gengar", "Onix", "Drowzee", "Hypno", "Krabby", "Kingler", "Voltorb", "Electrode", "Exeggcute", "Exeggutor", "Cubone", "Marowak", "Hitmonlee", "Hitmonchan", "Lickitung", "Koffing", "Weezing", "Rhyhorn", "Rhydon", "Chansey", "Tangela", "Kangaskhan", "Horsea", "Seadra", "Goldeen", "Seaking", "Staryu", "Starmie", "Mr.Mime", "Scyther", "Jynx", "Electabuzz", "Magmar", "Pinsir", "Tauros", "Magikarp", "Gyarados", "Lapras", "Ditto", "Eevee", "Vaporeon", "Jolteon", "Flareon", "Porygon", "Omanyte", "Omastar", "Kabuto", "Kabutops", "Aerodactyl", "Snorlax", "Articuno", "Zapdos", "Moltres", "Dratini", "Dragonair", "Dragonite", "Mewtwo", "Mew", "Chikorita", "Bayleef", "Meganium", "Cyndaquil", "Quilava", "Typhlosion", "Totodile", "Croconaw", "Feraligatr", "Sentret", "Furret", "Hoothoot", "Noctowl", "Ledyba", "Ledian", "Spinarak", "Ariados", "Crobat", "Chinchou", "Lanturn", "Pichu", "Cleffa", "Igglybuff", "Togepi", "Togetic", "Natu", "Xatu", "Mareep", "Flaaffy", "Ampharos", "Bellossom", "Marill", "Azumarill", "Sudowoodo", "Politoed", "Hoppip", "Skiploom", "Jumpluff", "Aipom", "Sunkern", "Sunflora", "Yanma", "Wooper", "Quagsire", "Espeon", "Umbreon", "Murkrow", "Slowking", "Misdreavus", "Unown", "Wobbuffet", "Girafarig", "Pineco", "Forretress", "Dunsparce", "Gligar", "Steelix", "Snubbull", "Granbull", "Qwilfish", "Scizor", "Shuckle", "Heracross", "Sneasel", "Teddiursa", "Ursaring", "Slugma", "Magcargo", "Swinub", "Piloswine", "Corsola", "Remoraid", "Octillery", "Delibird", "Mantine", "Skarmory", "Houndour", "Houndoom", "Kingdra", "Phanpy", "Donphan", "Porygon2", "Stantler", "Smeargle", "Tyrogue", "Hitmontop", "Elekid", "Magby", "Miltank", "Blissey", "Raikou", "Entei", "Suicune", "Larvitar", "Pupitar", "Tyranitar", "Lugia", "Ho-Oh", "Celebi", "Treecko", "Grovyle", "Sceptile", "Torchic", "Combusken", "Blaziken", "Mudkip", "Marshtomp", "Swampert", "Poochyena", "Mightyena", "Zigzagoon", "Linoone", "Wurmple", "Silcoon", "Beautifly", "Cascoon", "Dustox", "Lotad", "Lombre", "Ludicolo", "Seedot", "Nuzleaf", "Shiftry", "Taillow", "Swellow", "Wingull", "Pelipper", "Ralts", "Kirlia", "Gardevoir", "Surskit", "Masquerain", "Shroomish", "Breloom", "Slakoth", "Vigoroth", "Slaking", "Nincada", "Ninjask", "Shedinja", "Whismur", "Loudred", "Exploud", "Makuhita", "Hariyama", "Azurill", "Nosepass", "Skitty", "Delcatty", "Sableye", "Mawile", "Aron", "Lairon", "Aggron", "Meditite", "Medicham", "Electrike", "Manectric", "Plusle", "Minun", "Volbeat", "Illumise", "Roselia", "Gulpin", "Swalot", "Carvanha", "Sharpedo", "Wailmer", "Wailord", "Numel", "Camerupt", "Torkoal", "Spoink", "Grumpig", "Spinda", "Trapinch", "Vibrava", "Flygon", "Cacnea", "Cacturne", "Swablu", "Altaria", "Zangoose", "Seviper", "Lunatone", "Solrock", "Barboach", "Whiscash", "Corphish", "Crawdaunt", "Baltoy", "Claydol", "Lileep", "Cradily", "Anorith", "Armaldo", "Feebas", "Milotic", "Castform", "Kecleon", "Shuppet", "Banette", "Duskull", "Dusclops", "Tropius", "Chimecho", "Absol", "Wynaut", "Snorunt", "Glalie", "Spheal", "Sealeo", "Walrein", "Clamperl", "Huntail", "Gorebyss", "Relicanth", "Luvdisc", "Bagon", "Shelgon", "Salamence", "Beldum", "Metang", "Metagross", "Regirock", "Regice", "Registeel", "Latios", "Kyogre", "Groudon", "Rayquaza", "Jirachi", "Deoxys"];

//these two arrays define strings and bg colours for the divs which indicate the pokemon types, and then the types of a pokemon based on their Gen III typing. [0] in the type array is defined null so array can be referenced by species national dex number
const pokemon_type_names = ["", "Normal", "Fighting", "Flying", "Poison", "Ground", "Rock", "Bug", "Ghost", "Steel", "Fire", "Water", "Grass", "Electric", "Psychic", "Ice", "Dragon", "Dark", "Fairy"];
const pokemon_type_colors = ["rgba(0, 0, 0, 0)", "rgba(130,130,130,255)", "rgba(229,145,32,255)", "rgba(116,171,209,255)", "rgba(148,84,204,255)", "rgba(165,115,60,255)", "rgba(169,164,128,255)", "rgba(160,160,39,255)", "rgba(110,69,112,255)", "rgba(106,173,201,255)", "rgba(229,97,62,255)", "rgba(48,154,226,255)", "rgba(67,153,55,255)", "rgba(223,189,40,255)", "rgba(233,107,141,255)", "rgba(233,107,141,255)", "rgba(233,107,141,255)", "rgba(79,71,71,255)", "rgba(225,141,225,255)"];

const pokemon_type_1_lookup = [0, 12, 12, 12, 10, 10, 10, 11, 11, 11, 7, 7, 7, 7, 7, 7, 1, 1, 1, 1, 1, 1, 1, 4, 4, 13, 13, 5, 5, 4, 4, 4, 4, 4, 4, 18, 18, 10, 10, 1, 1, 4, 4, 12, 12, 12, 7, 7, 7, 7, 5, 5, 1, 1, 11, 11, 2, 2, 10, 10, 11, 11, 11, 14, 14, 14, 2, 2, 2, 12, 12, 12, 11, 11, 6, 6, 6, 10, 10, 11, 11, 13, 13, 1, 1, 1, 11, 11, 4, 4, 11, 11, 8, 8, 8, 6, 14, 14, 11, 11, 13, 13, 12, 12, 5, 5, 2, 2, 1, 4, 4, 5, 5, 1, 12, 1, 11, 11, 11, 11, 11, 11, 14, 7, 15, 13, 10, 7, 1, 11, 11, 11, 1, 1, 11, 13, 10, 1, 6, 6, 6, 6, 6, 1, 15, 13, 10, 16, 16, 16, 14, 14, 12, 12, 12, 10, 10, 10, 11, 11, 11, 1, 1, 1, 1, 7, 7, 7, 7, 4, 11, 11, 13, 18, 1, 18, 18, 14, 14, 13, 13, 13, 12, 11, 11, 6, 11, 12, 12, 12, 1, 12, 12, 7, 11, 11, 14, 17, 17, 11, 8, 14, 14, 1, 7, 7, 1, 5, 9, 18, 18, 11, 7, 7, 7, 17, 1, 1, 10, 10, 15, 15, 11, 11, 11, 15, 11, 9, 17, 17, 11, 5, 5, 1, 1, 1, 2, 2, 15, 13, 10, 1, 1, 13, 10, 11, 6, 6, 6, 14, 10, 14, 12, 12, 12, 10, 10, 10, 11, 11, 11, 17, 17, 1, 1, 7, 7, 7, 7, 7, 11, 11, 11, 12, 12, 12, 1, 1, 11, 11, 14, 14, 14, 7, 7, 12, 12, 1, 1, 1, 7, 7, 7, 1, 1, 1, 2, 2, 1, 6, 1, 1, 17, 9, 9, 9, 9, 2, 2, 13, 13, 13, 13, 7, 7, 12, 4, 4, 11, 11, 11, 11, 10, 10, 10, 14, 14, 1, 5, 5, 5, 12, 12, 1, 16, 1, 4, 6, 6, 11, 11, 11, 11, 5, 5, 6, 6, 6, 6, 11, 11, 1, 1, 8, 8, 8, 8, 12, 14, 17, 14, 15, 15, 15, 15, 15, 11, 11, 11, 11, 11, 16, 16, 16, 9, 9, 9, 6, 15, 9, 16, 16, 11, 5, 16, 9, 14];

const pokemon_type_2_lookup = [0, 4, 4, 4, 0, 0, 3, 0, 0, 0, 0, 0, 3, 4, 4, 4, 3, 3, 3, 0, 0, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 5, 0, 0, 0, 0, 18, 18, 3, 3, 4, 4, 4, 12, 12, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 5, 5, 5, 0, 0, 14, 14, 9, 9, 3, 3, 3, 0, 15, 0, 0, 0, 15, 4, 4, 4, 5, 0, 0, 0, 0, 0, 0, 14, 14, 0, 0, 0, 0, 0, 0, 0, 6, 6, 0, 0, 0, 0, 0, 0, 0, 0, 14, 18, 3, 14, 0, 0, 0, 0, 0, 3, 15, 0, 0, 0, 0, 0, 0, 11, 11, 11, 11, 3, 0, 3, 3, 3, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 4, 4, 3, 13, 13, 0, 0, 18, 0, 3, 3, 3, 0, 0, 0, 0, 18, 18, 0, 0, 3, 3, 3, 0, 0, 0, 3, 5, 5, 0, 0, 3, 14, 0, 0, 0, 14, 0, 9, 0, 3, 5, 0, 0, 4, 9, 6, 2, 15, 0, 0, 0, 6, 5, 5, 6, 0, 0, 3, 3, 3, 10, 10, 16, 0, 0, 0, 0, 0, 0, 0, 14, 0, 0, 0, 0, 0, 0, 0, 5, 5, 17, 3, 3, 12, 0, 0, 0, 0, 2, 2, 0, 5, 5, 0, 0, 0, 0, 0, 0, 3, 0, 4, 12, 12, 12, 0, 17, 17, 3, 3, 3, 3, 18, 18, 18, 11, 3, 0, 2, 0, 0, 0, 5, 3, 8, 0, 0, 0, 0, 0, 18, 0, 0, 0, 8, 18, 6, 6, 6, 14, 14, 0, 0, 0, 0, 0, 0, 4, 0, 0, 17, 17, 0, 0, 5, 5, 0, 0, 0, 0, 0, 16, 16, 0, 17, 3, 3, 0, 0, 14, 14, 5, 5, 0, 17, 14, 14, 12, 12, 7, 7, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 11, 11, 11, 0, 0, 0, 6, 0, 0, 0, 3, 14, 14, 14, 0, 0, 0, 14, 14, 0, 0, 3, 14, 0];

//patch code for those fairy type pokemon which were not so in Gen III
//pure fairy type were all normal
pokemon_type_1_lookup[35] = 1;  
pokemon_type_1_lookup[36] = 1;   
pokemon_type_1_lookup[173] = 1; 
pokemon_type_1_lookup[175] = 1; 
pokemon_type_1_lookup[209] = 1; 
pokemon_type_1_lookup[210] = 1; 

//dual type fairy type 1 becomes normal type 1
pokemon_type_1_lookup[176] = 1;

//dual type fairy type 2 never had a second type
pokemon_type_2_lookup[39] = 0;
pokemon_type_2_lookup[40] = 0;
pokemon_type_2_lookup[122] = 0;
pokemon_type_2_lookup[174] = 0;
pokemon_type_2_lookup[183] = 0;
pokemon_type_2_lookup[184] = 0;
pokemon_type_2_lookup[280] = 0;
pokemon_type_2_lookup[281] = 0;
pokemon_type_2_lookup[282] = 0;
pokemon_type_2_lookup[298] = 0;
pokemon_type_2_lookup[303] = 0;


//these two arrays define a 'gender symbol' and rgb colours. [0] is blank and used to erase the tags for gender neutral pokemon, and then an array of the threshhold values for all pokemon in Gen III
const pokemon_gender_symbols = ["", "&#9792", "&#9794"];
const pokemon_gender_colors = ["rgba(0, 0, 0, 0)", "rgba(217, 127, 255, 255)", "rgba(78, 117, 255, 255)"];

const gender_threshold_values = [0, 31, 31, 31, 31, 31, 31, 31, 31, 31, 127, 127, 127, 127, 127, 127, 127, 127, 127, 127, 127, 127, 127, 127, 127, 127, 127, 127, 127, 254, 0, 0, 0, 191, 191, 191, 191, 191, 191, 127, 127, 127, 127, 127, 127, 127, 127, 127, 127, 127, 127, 127, 127, 127, 127, 127, 63, 63, 127, 127, 127, 63, 63, 63, 63, 63, 63, 127, 127, 127, 127, 127, 127, 127, 127, 127, 127, 127, 127, 255, 255, 127, 127, 127, 127, 127, 127, 127, 127, 127, 127, 127, 127, 127, 127, 127, 127, 127, 255, 255, 127, 127, 127, 127, 0, 0, 127, 127, 127, 127, 127, 254, 127, 254, 127, 127, 127, 127, 255, 255, 127, 127, 254, 63, 63, 127, 0, 127, 127, 127, 255, 31, 31, 31, 31, 255, 31, 31, 31, 31, 31, 31, 255, 255, 255, 127, 127, 127, 255, 255, 31, 31, 31, 31, 31, 31, 31, 31, 31, 127, 127, 127, 127, 127, 127, 127, 127, 127, 127, 127, 127, 191, 191, 31, 31, 127, 127, 127, 127, 127, 127, 127, 127, 127, 127, 127, 127, 127, 127, 127, 127, 127, 127, 127, 31, 31, 127, 127, 127, 255, 127, 127, 127, 127, 127, 127, 127, 191, 191, 127, 127, 127, 127, 127, 127, 127, 127, 127, 127, 127, 191, 127, 127, 127, 127, 127, 127, 127, 127, 127, 127, 255, 127, 127, 0, 0, 63, 63, 254, 254, 255, 255, 255, 127, 127, 127, 255, 255, 255, 31, 31, 31, 31, 31, 31, 31, 31, 31, 127, 127, 127, 127, 127, 127, 127, 127, 127, 127, 127, 127, 127, 127, 127, 127, 127, 127, 127, 127, 127, 127, 127, 127, 127, 127, 127, 127, 127, 127, 127, 255, 127, 127, 127, 63, 63, 191, 127, 191, 191, 127, 127, 127, 127, 127, 127, 127, 127, 127, 127, 127, 0, 254, 127, 127, 127, 127, 127, 127, 127, 127, 127, 127, 127, 127, 127, 127, 127, 127, 127, 127, 127, 127, 127, 127, 255, 255, 127, 127, 127, 127, 255, 255, 31, 31, 31, 31, 127, 127, 127, 127, 127, 127, 127, 127, 127, 127, 127, 127, 127, 127, 127, 127, 127, 127, 127, 127, 31, 191, 127, 127, 127, 255, 255, 255, 255, 255, 255, 0, 255, 255, 255, 255, 255];

//these arrays define status conditions, including feinted pokemon and pokerus.  colours are consistent with firered/leafgreen
const pokemon_status_names = ["", "PSN", "FRZ", "SLP", "PAR", "BPN", "BRN", "FNT", "PKRS"];
const pokemon_status_colors = ["rgba(0, 0, 0 ,0)", "rgba(192, 96, 192, 255)", "rgba(136,176,224,255)", "rgba(160,160,136,255)", "rgba(184,184,24,255)", "rgba(192, 96, 192, 255)", "rgba(224,112,80,255)", "rgba(176,32,32,255)", "rgba(192,96,192,255)"];

//names of held item files. if your files are named differently, update them here.
const gen_3_items = ["", "MasterBall", "UltraBall", "GreatBall", "PokeBall", "SafariBall", "NetBall", "DiveBall", "NestBall", "RepeatBall", "TimerBall", "LuxuryBall", "PremierBall", "Potion", "Antidote", "BurnHeal", "IceHeal", "Awakening", "ParlyzHeal", "FullRestore", "MaxPotion", "HyperPotion", "SuperPotion", "FullHeal", "Revive", "MaxRevive", "FreshWater", "SodaPop", "Lemonade", "MoomooMilk", "EnergyPowder", "EnergyRoot", "HealPowder", "RevivalHerb", "Ether", "MaxEther", "Elixir", "MaxElixir", "LavaCookie", "BlueFlute", "YellowFlute", "RedFlute", "BlackFlute", "WhiteFlute", "BerryJuice", "SacredAsh", "ShoalSalt", "ShoalShell", "RedShard", "BlueShard", "YellowShard", "GreenShard", "unknown", "unknown", "unknown", "unknown", "unknown", "unknown", "unknown", "unknown", "unknown", "unknown", "unknown", "HPUp", "Protein", "Iron", "Carbos", "Calcium", "RareCandy", "PPUp", "Zinc", "PPMax", "unknown", "GuardSpec.", "DireHit", "XAttack", "XDefend", "XSpeed", "XAccuracy", "XSpecial", "PokeDoll", "FluffyTail", "unknown", "SuperRepel", "MaxRepel", "EscapeRope", "Repel", "unknown", "unknown", "unknown", "unknown", "unknown", "unknown", "SunStone", "MoonStone", "FireStone", "Thunderstone", "WaterStone", "LeafStone", "unknown", "unknown", "unknown", "unknown", "TinyMushroom", "BigMushroom", "unknown", "Pearl", "BigPearl", "Stardust", "StarPiece", "Nugget", "HeartScale", "unknown", "unknown", "unknown", "unknown", "unknown", "unknown", "unknown", "unknown", "unknown", "OrangeMail", "HarborMail", "GlitterMail", "MechMail", "WoodMail", "WaveMail", "BeadMail", "ShadowMail", "TropicMail", "DreamMail", "FabMail", "RetroMail", "CheriBerry", "ChestoBerry", "PechaBerry", "RawstBerry", "AspearBerry", "LeppaBerry", "OranBerry", "PersimBerry", "LumBerry", "SitrusBerry", "FigyBerry", "WikiBerry", "MagoBerry", "AguavBerry", "IapapaBerry", "RazzBerry", "BlukBerry", "NanabBerry", "WepearBerry", "PinapBerry", "PomegBerry", "KelpsyBerry", "QualotBerry", "HondewBerry", "GrepaBerry", "TamatoBerry", "CornnBerry", "MagostBerry", "RabutaBerry", "NomelBerry", "SpelonBerry", "PamtreBerry", "WatmelBerry", "DurinBerry", "BelueBerry", "LiechiBerry", "GanlonBerry", "SalacBerry", "PetayaBerry", "ApicotBerry", "LansatBerry", "StarfBerry", "EnigmaBerry", "unknown", "unknown", "unknown", "BrightPowder", "WhiteHerb", "MachoBrace", "Exp.Share", "QuickClaw", "SootheBell", "MentalHerb", "ChoiceBand", "King'sRock", "SilverPowder", "AmuletCoin", "CleanseTag", "SoulDew", "DeepSeaTooth", "DeepSeaScale", "SmokeBall", "Everstone", "FocusBand", "LuckyEgg", "ScopeLens", "MetalCoat", "Leftovers", "DragonScale", "LightBall", "SoftSand", "HardStone", "MiracleSeed", "BlackGlasses", "BlackBelt", "Magnet", "MysticWater", "SharpBeak", "PoisonBarb", "NeverMeltIce", "SpellTag", "TwistedSpoon", "Charcoal", "DragonFang", "SilkScarf", "Up-Grade", "ShellBell", "SeaIncense", "LaxIncense", "LuckyPunch", "MetalPowder", "ThickClub", "Stick", "unknown", "unknown", "unknown", "unknown", "unknown", "unknown", "unknown", "unknown", "unknown", "unknown", "unknown", "unknown", "unknown", "unknown", "unknown", "unknown", "unknown", "unknown", "unknown", "unknown", "unknown", "unknown", "unknown", "unknown", "unknown", "unknown", "unknown", "unknown", "RedScarf", "BlueScarf", "PinkScarf", "GreenScarf", "YellowScarf", "MachBike", "CoinCase", "Itemfinder", "OldRod", "GoodRod", "SuperRod", "S.S.Ticket", "ContestPass", "unknown", "WailmerPail", "DevonGoods", "SootSack", "BasementKey", "AcroBike", "PokeblockCase", "Letter", "EonTicket", "RedOrb", "BlueOrb", "Scanner", "Go-Goggles", "Meteorite", "Rm.1Key", "Rm.2Key", "Rm.4Key", "Rm.6Key", "StorageKey", "RootFossil", "ClawFossil", "DevonScope", "TM01", "TM02", "TM03", "TM04", "TM05", "TM06", "TM07", "TM08", "TM09", "TM10", "TM11", "TM12", "TM13", "TM14", "TM15", "TM16", "TM17", "TM18", "TM19", "TM20", "TM21", "TM22", "TM23", "TM24", "TM25", "TM26", "TM27", "TM28", "TM29", "TM30", "TM31", "TM32", "TM33", "TM34", "TM35", "TM36", "TM37", "TM38", "TM39", "TM40", "TM41", "TM42", "TM43", "TM44", "TM45", "TM46", "TM47", "TM48", "TM49", "TM50", "HM01", "HM02", "HM03", "HM04", "HM05", "HM06", "HM07", "HM08", "unknown", "unknown", "Oak'sParcel", "PokeFlute", "SecretKey", "BikeVoucher", "GoldTeeth", "OldAmber", "CardKey", "LiftKey", "HelixFossil", "DomeFossil", "SilphScope", "Bicycle", "TownMap", "VS.Seeker", "FameChecker", "TMCase", "BerryPouch", "TeachyTV", "TriPass", "RainbowPass", "Tea", "MysticTicket", "AuroraTicket", "PowderJar", "Ruby", "Sapphire", "MagmaEmblem", "OldSeaMap"];

//names of the unown alphabet files
const unown_file_names = ["unown-alpha", "unown-bravo", "unown-charlie", "unown-delta", "unown-epsilon", "unown-foxtrot", "unown-golf", "unown-hotel", "unown-india", "unown-juliett", "unown-kilo", "unown-lima", "unown-mike", "unown-november", "unown-oscar", "unown-papa", "unown-quebec", "unown-romeo", "unown-sierra", "unown-tango", "unown-uniform", "unown-victor", "unown-whiskey", "unown-xray", "unown-yankee", "unown-zulu", "unown-exclamation", "unown-interrogation"]

//these arrays define which level curve a pokemon follows, and the level curve threshholds. all array[0] is a 0 placeholder so that level 1 pokemon maths can be done correctly.

const pokemon_level_curve = [0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 3, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 1, 1, 2, 2, 1, 1, 2, 2, 3, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 4, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 3, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 4, 4, 3, 3, 3, 2, 2, 2, 2, 2, 2, 2, 4, 4, 2, 2, 2, 2, 2, 2, 2, 4, 4, 1, 2, 2, 2, 2, 2, 2, 4, 4, 2, 2, 2, 2, 2, 4, 4, 4, 4, 4, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 2, 1, 1, 1, 1, 2, 4, 4, 2, 1, 1, 1, 1, 2, 2, 3, 3, 3, 3, 1, 1, 2, 3, 3, 3, 3, 1, 3, 3, 2, 2, 2, 2, 2, 3, 2, 1, 2, 2, 2, 2, 2, 2, 3, 2, 1, 1, 2, 2, 3, 4, 3, 2, 2, 2, 2, 4, 4, 1, 2, 2, 1, 4, 4, 4, 4, 2, 2, 2, 2, 4, 1, 2, 2, 2, 2, 2, 4, 1, 4, 4, 4, 4, 4, 4, 4, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 4, 4, 4, 2, 2, 5, 5, 4, 4, 4, 0, 0, 0, 3, 3, 3, 5, 5, 1, 2, 1, 1, 3, 1, 4, 4, 4, 2, 2, 4, 4, 2, 2, 0, 5, 3, 5, 5, 4, 4, 5, 5, 2, 2, 2, 1, 1, 1, 3, 3, 3, 3, 3, 0, 0, 0, 5, 1, 1, 2, 2, 5, 5, 2, 2, 0, 0, 0, 0, 0, 0, 2, 3, 1, 1, 1, 1, 4, 1, 3, 2, 2, 2, 3, 3, 3, 0, 0, 0, 4, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4];

const level_curve_erratic = [0, 0, 15, 52, 122, 237, 406, 637, 942, 1326, 1800, 2369, 3041, 3822, 4719, 5737, 6881, 8155, 9564, 11111, 12800, 14632, 16610, 18737, 21012, 23437, 26012, 28737, 31610, 34632, 37800, 41111, 44564, 48155, 51881, 55737, 59719, 63822, 68041, 72369, 76800, 81326, 85942, 90637, 95406, 100237, 105122, 110052, 115015, 120001, 125000, 131324, 137795, 144410, 151165, 158056, 165079, 172229, 179503, 186894, 194400, 202013, 209728, 217540, 225443, 233431, 241496, 249633, 257834, 267406, 276458, 286328, 296358, 305767, 316074, 326531, 336255, 346965, 357812, 367807, 378880, 390077, 400293, 411686, 423190, 433572, 445239, 457001, 467489, 479378, 491346, 501878, 513934, 526049, 536557, 548720, 560922, 571333, 583539, 591882, 600000];

const level_curve_fast = [0, 0, 6, 21, 51, 100, 172, 274, 409, 583, 800, 1064, 1382, 1757, 2195, 2700, 3276, 3930, 4665, 5487, 6400, 7408, 8518, 9733, 11059, 12500, 14060, 15746, 17561, 19511, 21600, 23832, 26214, 28749, 31443, 34300, 37324, 40522, 43897, 47455, 51200, 55136, 59270, 63605, 68147, 72900, 77868, 83058, 88473, 94119, 100000, 106120, 112486, 119101, 125971, 133100, 140492, 148154, 156089, 164303, 172800, 181584, 190662, 200037, 209715, 219700, 229996, 240610, 251545, 262807, 274400, 286328, 298598, 311213, 324179, 337500, 351180, 365226, 379641, 394431, 409600, 425152, 441094, 457429, 474163, 491300, 508844, 526802, 545177, 563975, 583200, 602856, 622950, 643485, 664467, 685900, 707788, 730138, 752953, 776239, 800000];

const level_curve_medium_fast = [0, 0, 8, 27, 64, 125, 216, 343, 512, 729, 1000, 1331, 1728, 2197, 2744, 3375, 4096, 4913, 5832, 6859, 8000, 9261, 10648, 12167, 13824, 15625, 17576, 19683, 21952, 24389, 27000, 29791, 32768, 35937, 39304, 42875, 46656, 50653, 54872, 59319, 64000, 68921, 74088, 79507, 85184, 91125, 97336, 103823, 110592, 117649, 125000, 132651, 140608, 148877, 157464, 166375, 175616, 185193, 195112, 205379, 216000, 226981, 238328, 250047, 262144, 274625, 287496, 300763, 314432, 328509, 343000, 357911, 373248, 389017, 405224, 421875, 438976, 456533, 474552, 493039, 512000, 531441, 551368, 571787, 592704, 614125, 636056, 658503, 681472, 704969, 729000, 753571, 778688, 804357, 830584, 857375, 884736, 912673, 941192, 970299, 1000000];

const level_curve_medium_slow = [0, 0, 9, 57, 96, 135, 179, 236, 314, 419, 560, 742, 973, 1261, 1612, 2035, 2535, 3120, 3798, 4575, 5460, 6458, 7577, 8825, 10208, 11735, 13411, 15244, 17242, 19411, 21760, 24294, 27021, 29949, 33084, 36435, 40007, 43808, 47846, 52127, 56660, 61450, 66505, 71833, 77440, 83335, 89523, 96012, 102810, 109923, 117360, 125126, 133229, 141677, 150476, 159635, 169159, 179056, 189334, 199999, 211060, 222522, 234393, 246681, 259392, 272535, 286115, 300140, 314618, 329555, 344960, 360838, 377197, 394045, 411388, 429235, 447591, 466464, 485862, 505791, 526260, 547274, 568841, 590969, 613664, 636935, 660787, 685228, 710266, 735907, 762160, 789030, 816525, 844653, 873420, 902835, 932903, 963632, 995030, 1027103, 1059860];

const level_curve_slow = [0, 0, 10, 33, 80, 156, 270, 428, 640, 911, 1250, 1663, 2160, 2746, 3430, 4218, 5120, 6141, 7290, 8573, 10000, 11576, 13310, 15208, 17280, 19531, 21970, 24603, 27440, 30486, 33750, 37238, 40960, 44921, 49130, 53593, 58320, 63316, 68590, 74148, 80000, 86151, 92610, 99383, 106480, 113906, 121670, 129778, 138240, 147061, 156250, 165813, 175760, 186096, 196830, 207968, 219520, 231491, 243890, 256723, 270000, 283726, 297910, 312558, 327680, 343281, 359370, 375953, 393040, 410636, 428750, 447388, 466560, 486271, 506530, 527343, 548720, 570666, 593190, 616298, 640000, 664301, 689210, 714733, 740880, 767656, 795070, 823128, 851840, 881211, 911250, 941963, 973360, 1005446, 1038230, 1071718, 1105920, 1140841, 1176490, 1212873, 1250000];

const level_curve_fluctuating = [0, 0, 4, 13, 32, 65, 112, 178, 276, 393, 540, 745, 967, 1230, 1591, 1957, 2457, 3046, 3732, 4526, 5440, 6482, 7666, 9003, 10506, 12187, 14060, 16140, 18439, 20974, 23760, 26811, 30146, 33780, 37731, 42017, 46656, 50653, 55969, 60505, 66560, 71677, 78533, 84277, 91998, 98415, 107069, 114205, 123863, 131766, 142500, 151222, 163105, 172697, 185807, 196322, 210739, 222231, 238036, 250562, 267840, 281456, 300293, 315059, 335544, 351520, 373744, 390991, 415050, 433631, 459620, 479600, 507617, 529063, 559209, 582187, 614566, 639146, 673863, 700115, 737280, 765275, 804997, 834809, 877201, 908905, 954084, 987754, 1035837, 1071552, 1122660, 1160499, 1214753, 1254796, 1312322, 1354652, 1415577, 1460276, 1524731, 1571884, 1640000];

//Move Arrays for move typing/ later on move lookup by index.
const move_names = ["", "Pound", "Karate Chop", "Double Slap", "Comet Punch", "Mega Punch", "Pay Day", "Fire Punch", "Ice Punch", "Thunder Punch", "Scratch", "Vise Grip", "Guillotine", "Razor Wind", "Swords Dance", "Cut", "Gust", "Wing Attack", "Whirlwind", "Fly", "Bind", "Slam", "Vine Whip", "Stomp", "Double Kick", "Mega Kick", "Jump Kick", "Rolling Kick", "Sand-Attack", "Headbutt", "Horn Attack", "Fury Attack", "Horn Drill", "Tackle", "Body Slam", "Wrap", "Take Down", "Thrash", "Double-Edge", "Tail Whip", "Poison Sting", "Twineedle", "Pin Missile", "Leer", "Bite", "Growl", "Roar", "Sing", "Supersonic", "Sonic Boom", "Disable", "Acid", "Ember", "Flamethrower", "Mist", "Water Gun", "Hydro Pump", "Surf", "Ice Beam", "Blizzard", "Psybeam", "Bubble Beam", "Aurora Beam", "Hyper Beam", "Peck", "Drill Peck", "Submission", "Low Kick", "Counter", "Seismic Toss", "Strength", "Absorb", "Mega Drain", "Leech Seed", "Growth", "Razor Leaf", "Solar Beam", "PoisonPowder", "Stun Spore", "Sleep Powder", "Petal Dance", "String Shot", "Dragon Rage", "Fire Spin", "ThunderShock", "Thunderbolt", "Thunder Wave", "Thunder", "Rock Throw", "Earthquake", "Fissure", "Dig", "Toxic", "Confusion", "Psychic", "Hypnosis", "Meditate", "Agility", "Quick Attack", "Rage", "Teleport", "Night Shade", "Mimic", "Screech", "Double Team", "Recover", "Harden", "Minimize", "Smokescreen", "Confuse Ray", "Withdraw", "Defense Curl", "Barrier", "Light Screen", "Haze", "Reflect", "Focus Energy", "Bide", "Metronome", "Mirror Move", "Self-Destruct", "Egg Bomb", "Lick", "Smog", "Sludge", "Bone Club", "Fire Blast", "Waterfall", "Clamp", "Swift", "Skull Bash", "Spike Cannon", "Constrict", "Amnesia", "Kinesis", "Soft-Boiled", "High Jump Kick", "Glare", "Dream Eater", "Poison Gas", "Barrage", "Leech Life", "Lovely Kiss", "Sky Attack", "Transform", "Bubble", "Dizzy Punch", "Spore", "Flash", "Psywave", "Splash", "Acid Armor", "Crabhammer", "Explosion", "Fury Swipes", "Bonemerang", "Rest", "Rock Slide", "Hyper Fang", "Sharpen", "Conversion", "Tri Attack", "Super Fang", "Slash", "Substitute", "Struggle", "Sketch", "Triple Kick", "Thief", "Spider Web", "Mind Reader", "Nightmare", "Flame Wheel", "Snore", "Curse", "Flail", "Conversion 2", "Aeroblast", "Cotton Spore", "Reversal", "Spite", "Powder Snow", "Protect", "Mach Punch", "Scary Face", "Feint Attack", "Sweet Kiss", "Belly Drum", "Sludge Bomb", "Mud-Slap", "Octazooka", "Spikes", "Zap Cannon", "Foresight", "Destiny Bond", "Perish Song", "Icy Wind", "Detect", "Bone Rush", "Lock-On", "Outrage", "Sandstorm", "Giga Drain", "Endure", "Charm", "Rollout", "False Swipe", "Swagger", "Milk Drink", "Spark", "Fury Cutter", "Steel Wing", "Mean Look", "Attract", "Sleep Talk", "Heal Bell", "Return", "Present", "Frustration", "Safeguard", "Pain Split", "Sacred Fire", "Magnitude", "Dynamic Punch", "Megahorn", "Dragon Breath", "Baton Pass", "Encore", "Pursuit", "Rapid Spin", "Sweet Scent", "Iron Tail", "Metal Claw", "Vital Throw", "Morning Sun", "Synthesis", "Moonlight", "Hidden Power", "Cross Chop", "Twister", "Rain Dance", "Sunny Day", "Crunch", "Mirror Coat", "Psych Up", "Extreme Speed", "Ancient Power", "Shadow Ball", "Future Sight", "Rock Smash", "Whirlpool", "Beat Up", "Fake Out", "Uproar", "Stockpile", "Spit Up", "Swallow", "Heat Wave", "Hail", "Torment", "Flatter", "Will-O-Wisp", "Memento", "Facade", "Focus Punch", "Smelling Salts", "Follow Me", "Nature Power", "Charge", "Taunt", "Helping Hand", "Trick", "Role Play", "Wish", "Assist", "Ingrain", "Superpower", "Magic Coat", "Recycle", "Revenge", "Brick Break", "Yawn", "Knock Off", "Endeavor", "Eruption", "Skill Swap", "Imprison", "Refresh", "Grudge", "Snatch", "Secret Power", "Dive", "Arm Thrust", "Camouflage", "Tail Glow", "Luster Purge", "Mist Ball", "Feather Dance", "Teeter Dance", "Blaze Kick", "Mud Sport", "Ice Ball", "Needle Arm", "Slack Off", "Hyper Voice", "Poison Fang", "Crush Claw", "Blast Burn", "Hydro Cannon", "Meteor Mash", "Astonish", "Weather Ball", "Aromatherapy", "Fake Tears", "Air Cutter", "Overheat", "Odor Sleuth", "Rock Tomb", "Silver Wind", "Metal Sound", "Grass Whistle", "Tickle", "Cosmic Power", "Water Spout", "Signal Beam", "Shadow Punch", "Extrasensory", "Sky Uppercut", "Sand Tomb", "Sheer Cold", "Muddy Water", "Bullet Seed", "Aerial Ace", "Icicle Spear", "Iron Defense", "Block", "Howl", "Dragon Claw", "Frenzy Plant", "Bulk Up", "Bounce", "Mud Shot", "Poison Tail", "Covet", "Volt Tackle", "Magical Leaf", "Water Sport", "Calm Mind", "Leaf Blade", "Dragon Dance", "Rock Blast", "Shock Wave", "Water Pulse", "Doom Desire", "Psycho Boost"]

const move_type_ = [0, 1, 2, 1, 1, 1, 1, 10, 15, 13, 1, 1, 1, 1, 1, 1, 3, 3, 1, 3, 1, 1, 12, 1, 2, 1, 2, 2, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 7, 7, 1, 17, 1, 1, 1, 1, 1, 1, 4, 10, 10, 15, 11, 11, 11, 15, 15, 14, 11, 15, 1, 3, 3, 2, 2, 2, 2, 1, 12, 12, 12, 1, 12, 12, 4, 12, 12, 12, 7, 16, 10, 13, 13, 13, 13, 6, 5, 5, 5, 4, 14, 14, 14, 14, 14, 1, 1, 14, 8, 1, 1, 1, 1, 1, 1, 1, 8, 11, 1, 14, 14, 15, 14, 1, 1, 1, 3, 1, 1, 8, 4, 4, 5, 10, 11, 11, 1, 1, 1, 1, 14, 14, 1, 2, 1, 14, 4, 1, 7, 1, 3, 1, 11, 1, 12, 1, 14, 1, 4, 11, 1, 1, 5, 14, 6, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 17, 7, 1, 8, 10, 1, 8, 1, 1, 3, 12, 2, 8, 15, 1, 2, 1, 17, 18, 1, 4, 5, 11, 5, 13, 1, 8, 1, 15, 2, 5, 1, 16, 6, 12, 1, 18, 6, 1, 1, 1, 13, 7, 9, 1, 1, 1, 1, 1, 1, 1, 1, 1, 10, 5, 2, 7, 16, 1, 1, 17, 1, 1, 9, 9, 2, 1, 12, 18, 1, 2, 16, 11, 10, 17, 14, 1, 1, 6, 8, 14, 2, 11, 17, 1, 1, 1, 1, 1, 10, 15, 17, 17, 10, 17, 1, 2, 1, 1, 1, 13, 17, 1, 14, 14, 1, 1, 12, 2, 14, 1, 2, 2, 1, 17, 1, 10, 14, 14, 1, 8, 17, 1, 11, 2, 1, 7, 14, 14, 3, 1, 10, 5, 15, 12, 1, 1, 4, 1, 10, 11, 9, 8, 1, 12, 17, 3, 10, 1, 6, 7, 9, 12, 1, 14, 11, 7, 8, 14, 2, 5, 15, 11, 12, 3, 15, 9, 1, 1, 16, 12, 2, 3, 5, 4, 1, 13, 12, 11, 14, 12, 16, 6, 13, 11, 9, 14]


//start of functions and variables related to the update function

//debug variables
var update_loop = 0;


//slot change ids stores the change update value so the code can compare it and make sure that it's not updating when it doesn't need to
const slot_change_ids = [-1, -1, -1, -1, -1, -1, -1];

//this will eventually be used to fix the swap glitch. currently does nothing
const pokemon_pids_minus_1 = [-1, -1, -1, -1, -1, -1, -1];
const pokemon_pids_minus_2 = [-1, -1, -1, -1, -1, -1, -1];

//this function actually looks every 1/10 a second to see if any changes are in the json file, and updates them as it goes
function update_(){

  var roster_loop;
  roster_loop = 0;

  //checks to see how many times the loop should run, i.e. how many new pieces of data are being sent.
  var data_count = Object.keys(poke_data).length;

  //runs the loop through all the new updates. slotId tells you which slot you're updating in the loop. slotId and roster_loop will not always be the same number.
  while (roster_loop < data_count) {

  //checks the current update number to the one stored in the updates variable, if they're the same, doesn't bother running the code.
    if (slot_change_ids[poke_data[roster_loop]["slotId"]] != poke_data[roster_loop]["changeId"]){
    
      //if the data updates to 'null', then this blanks out the slot
      if (poke_data[roster_loop]["pokemon"] == null){
        if(sprite_draw == true){document.getElementById("roster_".concat( poke_data[roster_loop]["slotId"], "_sprite")).style.backgroundImage = "url('')";}

        if(pokeball_draw == true){document.getElementById("ball_sprite_".concat( poke_data[roster_loop]["slotId"])).style.backgroundImage = "url('')";}

        if(held_item_draw == true){document.getElementById("held_item_sprite_".concat( poke_data[roster_loop]["slotId"])).style.backgroundImage = "url('')";}

        if(nickname_draw == true){document.getElementById("roster_".concat( poke_data[roster_loop]["slotId"], "_nickname")).innerHTML = "";}
        if(species_name_draw == true){document.getElementById("roster_".concat( poke_data[roster_loop]["slotId"], "_species")).innerHTML = "";}
        if(species_name_draw == true){document.getElementById("roster_".concat( poke_data[roster_loop]["slotId"], "_egg")).innerHTML = "";}
        if(level_draw == true){document.getElementById("roster_".concat( poke_data[roster_loop]["slotId"], "_level")).innerHTML = "";}
        if(hp_numeric_draw == true){document.getElementById("roster_".concat( poke_data[roster_loop]["slotId"], "_hp_numerical")).innerHTML = "";}

        if(types_draw){
          document.getElementById("roster_".concat(poke_data[roster_loop]["slotId"], "_type_1_bg")).style.backgroundColor = pokemon_type_colors[0];
          document.getElementById("roster_".concat(poke_data[roster_loop]["slotId"], "_type_1")).innerHTML = pokemon_type_names[0];
          document.getElementById("roster_".concat(poke_data[roster_loop]["slotId"], "_type_2_bg")).style.backgroundColor = pokemon_type_colors[0];
          document.getElementById("roster_".concat(poke_data[roster_loop]["slotId"], "_type_2")).innerHTML = pokemon_type_names[0];
        }

        if(status_draw == true){
          document.getElementById("status_bg_".concat(poke_data[roster_loop]["slotId"])).style.backgroundColor = pokemon_status_colors[0];
          document.getElementById("status_".concat(poke_data[roster_loop]["slotId"])).innerHTML = pokemon_status_names[0];
        }

        if(experience_draw==true){
          document.getElementById("roster_".concat( poke_data[roster_loop]["slotId"], "_exp_border")).style.borderWidth = 0;

          document.getElementById("roster_".concat( poke_data[roster_loop]["slotId"], "_exp")).style.width = 0;
          document.getElementById("roster_".concat( poke_data[roster_loop]["slotId"], "_exp")).style.backgroundColor = 'rgba(0,0,0,0)';
        }

        if(hp_draw == true){
          document.getElementById("roster_".concat( poke_data[roster_loop]["slotId"], "_border")).style.borderWidth = 0;
          document.getElementById("roster_".concat( poke_data[roster_loop]["slotId"], "_hp")).style.width = 0;
          document.getElementById("roster_".concat( poke_data[roster_loop]["slotId"], "_hp")).style.backgroundColor = 'rgba(0,0,0,0)';
        }

        if(gender_draw == true){
          document.getElementById("roster_gender_".concat(poke_data[roster_loop]["slotId"])).style.backgroundColor = pokemon_gender_colors[0];
          document.getElementById("roster_gender_".concat(poke_data[roster_loop]["slotId"])).innerHTML = pokemon_gender_symbols[0];
        }

        if (moves_draw == true){
          var moves_draw_loop = 1;
          while (moves_draw_loop<5){
            document.getElementById("roster_move_".concat(moves_draw_loop, "_", poke_data[roster_loop]["slotId"])).innerHTML = "";
            document.getElementById("roster_move_".concat(moves_draw_loop, "_bg_", poke_data[roster_loop]["slotId"])).style.backgroundColor = pokemon_type_colors[0];

            moves_draw_loop ++;
          }
        }

      }

      //this is a special case for if the pokemon is an egg. It clears out most values and types Egg in a special name holder
      else if (poke_data[roster_loop]["pokemon"]["isEgg"] == 1){
        if(sprite_draw == true){document.getElementById("roster_".concat( poke_data[roster_loop]["slotId"], "_sprite")).style.backgroundImage = "url('".concat(pokemon_normal_sprites_root, egg_filename, "')");
        }

        if(pokeball_draw == true){document.getElementById("ball_sprite_".concat( poke_data[roster_loop]["slotId"])).style.backgroundImage = "url('')";}

        if(held_item_draw == true){document.getElementById("held_item_sprite_".concat( poke_data[roster_loop]["slotId"])).style.backgroundImage = "url('')";}

        if(nickname_draw == true){document.getElementById("roster_".concat( poke_data[roster_loop]["slotId"], "_nickname")).innerHTML = "";}
        if(species_name_draw == true){document.getElementById("roster_".concat( poke_data[roster_loop]["slotId"], "_species")).innerHTML = "";}
        if(species_name_draw == true){document.getElementById("roster_".concat( poke_data[roster_loop]["slotId"], "_egg")).innerHTML = "Egg";}
        if(level_draw == true){document.getElementById("roster_".concat( poke_data[roster_loop]["slotId"], "_level")).innerHTML = "";}
        if(hp_numeric_draw == true){document.getElementById("roster_".concat( poke_data[roster_loop]["slotId"], "_hp_numerical")).innerHTML = "";}

        if(types_draw){
          document.getElementById("roster_".concat(poke_data[roster_loop]["slotId"], "_type_1_bg")).style.backgroundColor = pokemon_type_colors[0];
          document.getElementById("roster_".concat(poke_data[roster_loop]["slotId"], "_type_1")).innerHTML = pokemon_type_names[0];
          document.getElementById("roster_".concat(poke_data[roster_loop]["slotId"], "_type_2_bg")).style.backgroundColor = pokemon_type_colors[0];
          document.getElementById("roster_".concat(poke_data[roster_loop]["slotId"], "_type_2")).innerHTML = pokemon_type_names[0];
        }

        if(status_draw == true){
          document.getElementById("status_bg_".concat(poke_data[roster_loop]["slotId"])).style.backgroundColor = pokemon_status_colors[0];
          document.getElementById("status_".concat(poke_data[roster_loop]["slotId"])).innerHTML = pokemon_status_names[0];
        }

        if(experience_draw==true){
          document.getElementById("roster_".concat( poke_data[roster_loop]["slotId"], "_exp_border")).style.borderWidth = 0;

          document.getElementById("roster_".concat( poke_data[roster_loop]["slotId"], "_exp")).style.width = 0;
          document.getElementById("roster_".concat( poke_data[roster_loop]["slotId"], "_exp")).style.backgroundColor = 'rgba(0,0,0,0)';
        }

        if(hp_draw == true){
          document.getElementById("roster_".concat( poke_data[roster_loop]["slotId"], "_border")).style.borderWidth = 0;
          document.getElementById("roster_".concat( poke_data[roster_loop]["slotId"], "_hp")).style.width = 0;
          document.getElementById("roster_".concat( poke_data[roster_loop]["slotId"], "_hp")).style.backgroundColor = 'rgba(0,0,0,0)';
        }

        if(gender_draw == true){
          document.getElementById("roster_gender_".concat(poke_data[roster_loop]["slotId"])).style.backgroundColor = pokemon_gender_colors[0];
          document.getElementById("roster_gender_".concat(poke_data[roster_loop]["slotId"])).innerHTML = pokemon_gender_symbols[0];
        }


        if (moves_draw == true){
          var moves_draw_loop = 1;
          while (moves_draw_loop<5){
            document.getElementById("roster_move_".concat(moves_draw_loop, "_", poke_data[roster_loop]["slotId"])).innerHTML = "";
            document.getElementById("roster_move_".concat(moves_draw_loop, "_bg_", poke_data[roster_loop]["slotId"])).style.backgroundColor = pokemon_type_colors[0];

            moves_draw_loop ++;
          }
        }


      }

      //this updates actual pokemon if neither null nor egg. Updates all elements set to true in the configuration.js file.
      else{
        //zero's out the egg just for good measure
        if (species_name_draw == true){document.getElementById("roster_".concat( poke_data[roster_loop]["slotId"], "_egg")).innerHTML = "";}

        //draws the sprite of the current pokemon
        if (sprite_draw == true){

          //if the pokemon is unown, calculates the letter and draws the correct unown sprite
          if(poke_data[roster_loop]["pokemon"]["species"] == 201){

            var pid_binary = poke_data[roster_loop]["pokemon"]["pid"].toString(2);
            var unown_binary = pid_binary.slice(pid_binary.length-26, pid_binary.length-24) + pid_binary.slice(pid_binary.length-18, pid_binary.length-16) + pid_binary.slice(pid_binary.length-10, pid_binary.length-8) + pid_binary.slice(pid_binary.length-2, pid_binary.length);
            var unown_dec = parseInt(unown_binary, 2);
            var unown_mod = (unown_dec % 28);
            //console.log(unown_mod);

            if(poke_data[roster_loop]["pokemon"]["isShiny"] == false){
              document.getElementById("roster_".concat( poke_data[roster_loop]["slotId"], "_sprite")).style.backgroundImage = "url('".concat(pokemon_normal_sprites_root, unown_file_names[unown_mod].toLowerCase(), pokemon_sprites_extension, "')");
              document.getElementById("roster_shiny_".concat( poke_data[roster_loop]["slotId"])).innerHTML ="";
            }
            else{
              document.getElementById("roster_".concat( poke_data[roster_loop]["slotId"], "_sprite")).style.backgroundImage = "url('".concat(pokemon_shiny_sprites_root, unown_file_names[unown_mod].toLowerCase(), pokemon_sprites_extension, "')");
              document.getElementById("roster_shiny_".concat( poke_data[roster_loop]["slotId"])).innerHTML ="&#11088";
            }
          }

          else{
              //checks if pokemon is normal or shiny, and if shiny loads the shiny sprite.
            if(poke_data[roster_loop]["pokemon"]["isShiny"] == false){
              document.getElementById("roster_".concat( poke_data[roster_loop]["slotId"], "_sprite")).style.backgroundImage = "url('".concat(pokemon_normal_sprites_root, pokemon_file_names[poke_data[roster_loop]["pokemon"]["species"]].toLowerCase(), pokemon_sprites_extension, "')");
              document.getElementById("roster_shiny_".concat( poke_data[roster_loop]["slotId"])).innerHTML ="";
            }
            else{
              document.getElementById("roster_".concat( poke_data[roster_loop]["slotId"], "_sprite")).style.backgroundImage = "url('".concat(pokemon_shiny_sprites_root, pokemon_file_names[poke_data[roster_loop]["pokemon"]["species"]].toLowerCase(), pokemon_sprites_extension, "')");
              document.getElementById("roster_shiny_".concat( poke_data[roster_loop]["slotId"])).innerHTML ="&#11088";
            }
          }

        }

        //This code loads the pokeball the pokemon was caught in
        if (pokeball_draw == true){
          document.getElementById("ball_sprite_".concat( poke_data[roster_loop]["slotId"])).style.backgroundImage = "url('".concat(item_images_root, gen_3_items[poke_data[roster_loop]["pokemon"]["pokeball"]].toLowerCase(), item_extension, "')");
        }

        if (held_item_draw == true){
          document.getElementById("held_item_sprite_".concat( poke_data[roster_loop]["slotId"])).style.backgroundImage = "url('".concat(item_images_root, gen_3_items[poke_data[roster_loop]["pokemon"]["heldItem"]].toLowerCase(), item_extension, "')");
        }

        //Calculates the gender of the pokemon from the PID
        if (gender_draw == true){
          var pid_binary = poke_data[roster_loop]["pokemon"]["pid"].toString(2);
          var gender_binary = pid_binary.slice(pid_binary.length-8, pid_binary.length);
          var gender_bit_dec_10 = parseInt(gender_binary, 2);

          if (gender_threshold_values[poke_data[roster_loop]["pokemon"]["species"]] == 0){
            document.getElementById("roster_gender_".concat(poke_data[roster_loop]["slotId"])).style.backgroundColor = pokemon_gender_colors[2];
            document.getElementById("roster_gender_".concat(poke_data[roster_loop]["slotId"])).innerHTML = pokemon_gender_symbols[2];
          } //always Male

          else if (gender_threshold_values[poke_data[roster_loop]["pokemon"]["species"]] == 254){
            document.getElementById("roster_gender_".concat(poke_data[roster_loop]["slotId"])).style.backgroundColor = pokemon_gender_colors[1];
            document.getElementById("roster_gender_".concat(poke_data[roster_loop]["slotId"])).innerHTML = pokemon_gender_symbols[1];
          } //always Female

          else if (gender_threshold_values[poke_data[roster_loop]["pokemon"]["species"]] == 255){
            document.getElementById("roster_gender_".concat(poke_data[roster_loop]["slotId"])).style.backgroundColor = pokemon_gender_colors[0];
            document.getElementById("roster_gender_".concat(poke_data[roster_loop]["slotId"])).innerHTML = pokemon_gender_symbols[0];
          } //gender neutral

          else{

            if (gender_bit_dec_10 < gender_threshold_values[poke_data[roster_loop]["pokemon"]["species"]]){
              document.getElementById("roster_gender_".concat(poke_data[roster_loop]["slotId"])).style.backgroundColor = pokemon_gender_colors[1];
              document.getElementById("roster_gender_".concat(poke_data[roster_loop]["slotId"])).innerHTML = pokemon_gender_symbols[1];
            }

            else {
              document.getElementById("roster_gender_".concat(poke_data[roster_loop]["slotId"])).style.backgroundColor = pokemon_gender_colors[2];
              document.getElementById("roster_gender_".concat(poke_data[roster_loop]["slotId"])).innerHTML = pokemon_gender_symbols[2];
            }

          }

        }

        //reads the pokemon's nickname, turns it into a standard format of only first letter capital, and then prints that to the nickname field.
        if (nickname_draw == true){
          var nickname_std = poke_data[roster_loop]["pokemon"]["nickname"].charAt(0).toUpperCase() + poke_data[roster_loop]["pokemon"]["nickname"].slice(1).toLowerCase();
          document.getElementById("roster_".concat( poke_data[roster_loop]["slotId"], "_nickname")).innerHTML = nickname_std;
        }

        //prints the pokemon's species name into the species field
        if (species_name_draw == true) {
          document.getElementById("roster_".concat( poke_data[roster_loop]["slotId"], "_species")).innerHTML = poke_data[roster_loop]["pokemon"]["speciesName"];
        }

        //prints the pokemon's level into the Level field.
        if (level_draw == true){
          document.getElementById("roster_".concat( poke_data[roster_loop]["slotId"], "_level")).innerHTML = "Lv. ".concat(poke_data[roster_loop]["pokemon"]["level"]);
        }

        //this looks up the two types the pokemon may have, and then prints them into the type fields, while also changing the background colors of the types.
        if (types_draw == true){
          document.getElementById("roster_".concat(poke_data[roster_loop]["slotId"], "_type_1_bg")).style.backgroundColor = pokemon_type_colors[pokemon_type_1_lookup[poke_data[roster_loop]["pokemon"]["species"]]];
          document.getElementById("roster_".concat(poke_data[roster_loop]["slotId"], "_type_1")).innerHTML = pokemon_type_names[pokemon_type_1_lookup[poke_data[roster_loop]["pokemon"]["species"]]].toUpperCase();
          document.getElementById("roster_".concat(poke_data[roster_loop]["slotId"], "_type_2_bg")).style.backgroundColor = pokemon_type_colors[pokemon_type_2_lookup[poke_data[roster_loop]["pokemon"]["species"]]];
          document.getElementById("roster_".concat(poke_data[roster_loop]["slotId"], "_type_2")).innerHTML = pokemon_type_names[pokemon_type_2_lookup[poke_data[roster_loop]["pokemon"]["species"]]].toUpperCase();
        }

        //this code deals with drawing the HP bar and text
        if (hp_draw == true){
          document.getElementById("roster_".concat( poke_data[roster_loop]["slotId"], "_border")).style.borderWidth = 2;

          //this code calculates the health bar length
          var health_ = poke_data[roster_loop]["pokemon"]["hp"]["current"]/poke_data[roster_loop]["pokemon"]["hp"]["max"];
          var health_width = health_*health_bar_width;

          //this code adjusts the colour of the health bar based on the percentage full, identical behaviour to the vanilla game
          document.getElementById("roster_".concat( poke_data[roster_loop]["slotId"], "_hp")).style.width = health_width;
          if(health_ > 0.5) {document.getElementById("roster_".concat( poke_data[roster_loop]["slotId"], "_hp")).style.backgroundColor = 'rgba(122, 255, 170,255)';}
          if(health_ <= 0.5) {document.getElementById("roster_".concat( poke_data[roster_loop]["slotId"], "_hp")).style.backgroundColor = 'rgba(243, 231, 62, 255)';}
          if(health_ <= 0.2) {document.getElementById("roster_".concat( poke_data[roster_loop]["slotId"], "_hp")).style.backgroundColor = 'rgba(211, 78, 80, 255)';}
        }

        if (hp_numeric_draw == true){
          document.getElementById("roster_".concat( poke_data[roster_loop]["slotId"], "_hp_numerical")).innerHTML = "&nbsp".concat(poke_data[roster_loop]["pokemon"]["hp"]["current"], "/", poke_data[roster_loop]["pokemon"]["hp"]["max"]);
        }

        //pokemon status conditions.
        //if pokemon is fainted, render fainted
        if (status_draw == true){
          if(poke_data[roster_loop]["pokemon"]["hp"]["current"] == 0){
            document.getElementById("status_".concat(poke_data[roster_loop]["slotId"])).innerHTML = pokemon_status_names[7];
            document.getElementById("status_bg_".concat(poke_data[roster_loop]["slotId"])).style.backgroundColor = pokemon_status_colors[7];
          }

          else if (poke_data[roster_loop]["pokemon"]["status"]["psn"] == true){
            document.getElementById("status_".concat(poke_data[roster_loop]["slotId"])).innerHTML = pokemon_status_names[1];
            document.getElementById("status_bg_".concat(poke_data[roster_loop]["slotId"])).style.backgroundColor = pokemon_status_colors[1];
          }

          else if (poke_data[roster_loop]["pokemon"]["status"]["frz"] == true){
            document.getElementById("status_".concat(poke_data[roster_loop]["slotId"])).innerHTML = pokemon_status_names[2];
            document.getElementById("status_bg_".concat(poke_data[roster_loop]["slotId"])).style.backgroundColor = pokemon_status_colors[2];
          }

          else if (poke_data[roster_loop]["pokemon"]["status"]["slp"] == true){
            document.getElementById("status_".concat(poke_data[roster_loop]["slotId"])).innerHTML = pokemon_status_names[3];
            document.getElementById("status_bg_".concat(poke_data[roster_loop]["slotId"])).style.backgroundColor = pokemon_status_colors[3];
          }

          else if (poke_data[roster_loop]["pokemon"]["status"]["par"] == true){
            document.getElementById("status_".concat(poke_data[roster_loop]["slotId"])).innerHTML = pokemon_status_names[4];
            document.getElementById("status_bg_".concat(poke_data[roster_loop]["slotId"])).style.backgroundColor = pokemon_status_colors[4];
          }

          else if (poke_data[roster_loop]["pokemon"]["status"]["bps"] == true){
            document.getElementById("status_".concat(poke_data[roster_loop]["slotId"])).innerHTML = pokemon_status_names[5];
            document.getElementById("status_bg_".concat(poke_data[roster_loop]["slotId"])).style.backgroundColor = pokemon_status_colors[5];
          }

          else if (poke_data[roster_loop]["pokemon"]["status"]["brn"] == true){
            document.getElementById("status_".concat(poke_data[roster_loop]["slotId"])).innerHTML = pokemon_status_names[6];
            document.getElementById("status_bg_".concat(poke_data[roster_loop]["slotId"])).style.backgroundColor = pokemon_status_colors[6];
          }

          else if (poke_data[roster_loop]["pokemon"]["pokerus"] > 0){
            document.getElementById("status_".concat(poke_data[roster_loop]["slotId"])).innerHTML = pokemon_status_names[8];
            document.getElementById("status_bg_".concat(poke_data[roster_loop]["slotId"])).style.backgroundColor = pokemon_status_colors[8];
          }

          else {
            document.getElementById("status_".concat(poke_data[roster_loop]["slotId"])).innerHTML = pokemon_status_names[0];
            document.getElementById("status_bg_".concat(poke_data[roster_loop]["slotId"])).style.backgroundColor = pokemon_status_colors[0];
          }

        }


        // Erratic	0    Fast	1    Medium Fast	2    Medium Slow	3    Slow	4    Fluctuating	5
        //calculates the current exp in the current level, and translates that to the length of the experience bar. First it looks up the level curve the pokemon is going to draw values from, then uses that with the pokemon's current level to calculate the variance.
        if (experience_draw == true){
          document.getElementById("roster_".concat( poke_data[roster_loop]["slotId"], "_exp_border")).style.borderWidth = 2;
          document.getElementById("roster_".concat( poke_data[roster_loop]["slotId"], "_exp")).style.backgroundColor = 'rgba(75, 210, 244,255)';

          if (pokemon_level_curve[poke_data[roster_loop]["pokemon"]["species"]] == 0){
            var exp_ = poke_data[roster_loop]["pokemon"]["exp"] - level_curve_erratic[poke_data[roster_loop]["pokemon"]["level"]];
            var exp_width = ((poke_data[roster_loop]["pokemon"]["exp"] - level_curve_erratic[poke_data[roster_loop]["pokemon"]["level"]]) / (level_curve_erratic[poke_data[roster_loop]["pokemon"]["level"]+1] - level_curve_erratic[poke_data[roster_loop]["pokemon"]["level"]]))*exp_bar_width;
          }

          else if (pokemon_level_curve[poke_data[roster_loop]["pokemon"]["species"]] == 1){
            var exp_ = poke_data[roster_loop]["pokemon"]["exp"] - level_curve_fast[poke_data[roster_loop]["pokemon"]["level"]];
            var exp_width = ((poke_data[roster_loop]["pokemon"]["exp"] - level_curve_fast[poke_data[roster_loop]["pokemon"]["level"]]) / (level_curve_fast[poke_data[roster_loop]["pokemon"]["level"]+1] - level_curve_fast[poke_data[roster_loop]["pokemon"]["level"]]))*exp_bar_width;
          }

          else if (pokemon_level_curve[poke_data[roster_loop]["pokemon"]["species"]] == 2){
            var exp_ = poke_data[roster_loop]["pokemon"]["exp"] - level_curve_medium_fast[poke_data[roster_loop]["pokemon"]["level"]];
            var exp_width = ((poke_data[roster_loop]["pokemon"]["exp"] - level_curve_medium_fast[poke_data[roster_loop]["pokemon"]["level"]]) / (level_curve_medium_fast[poke_data[roster_loop]["pokemon"]["level"]+1] - level_curve_medium_fast[poke_data[roster_loop]["pokemon"]["level"]]))*exp_bar_width;
          }

          else if (pokemon_level_curve[poke_data[roster_loop]["pokemon"]["species"]] == 3){
            var exp_ = poke_data[roster_loop]["pokemon"]["exp"] - level_curve_medium_slow[poke_data[roster_loop]["pokemon"]["level"]];
            var exp_width = ((poke_data[roster_loop]["pokemon"]["exp"] - level_curve_medium_slow[poke_data[roster_loop]["pokemon"]["level"]]) / (level_curve_medium_slow[poke_data[roster_loop]["pokemon"]["level"]+1] - level_curve_medium_slow[poke_data[roster_loop]["pokemon"]["level"]]))*exp_bar_width;
          }

          else if (pokemon_level_curve[poke_data[roster_loop]["pokemon"]["species"]] == 4){
            var exp_ = poke_data[roster_loop]["pokemon"]["exp"] - level_curve_slow[poke_data[roster_loop]["pokemon"]["level"]];
            var exp_width = ((poke_data[roster_loop]["pokemon"]["exp"] - level_curve_slow[poke_data[roster_loop]["pokemon"]["level"]]) / (level_curve_slow[poke_data[roster_loop]["pokemon"]["level"]+1] - level_curve_slow[poke_data[roster_loop]["pokemon"]["level"]]))*exp_bar_width;
          }

          else if (pokemon_level_curve[poke_data[roster_loop]["pokemon"]["species"]] == 5){
            var exp_ = poke_data[roster_loop]["pokemon"]["exp"] - level_curve_fluctuating[poke_data[roster_loop]["pokemon"]["level"]];
            var exp_width = ((poke_data[roster_loop]["pokemon"]["exp"] - level_curve_fluctuating[poke_data[roster_loop]["pokemon"]["level"]]) / (level_curve_fluctuating[poke_data[roster_loop]["pokemon"]["level"]+1] - level_curve_fluctuating[poke_data[roster_loop]["pokemon"]["level"]]))*exp_bar_width;
          }

          document.getElementById("roster_".concat( poke_data[roster_loop]["slotId"], "_exp")).style.width = exp_width;
        }


        if (moves_draw == true){

          
          var moves_draw_loop = 1;

          while (moves_draw_loop<5){
            if(poke_data[roster_loop]["pokemon"]["move".concat(moves_draw_loop)]["name"] !== undefined){

              document.getElementById("roster_move_".concat(moves_draw_loop, "_", poke_data[roster_loop]["slotId"])).innerHTML = poke_data[roster_loop]["pokemon"]["move".concat(moves_draw_loop)]["name"];
              document.getElementById("roster_move_".concat(moves_draw_loop, "_bg_", poke_data[roster_loop]["slotId"])).style.backgroundColor = pokemon_type_colors[move_type_[move_names.indexOf(poke_data[roster_loop]["pokemon"]["move".concat(moves_draw_loop)]["name"])]];
            }

            else{
                document.getElementById("roster_move_".concat(moves_draw_loop, "_", poke_data[roster_loop]["slotId"])).innerHTML = "";
                document.getElementById("roster_move_".concat(moves_draw_loop, "_bg_", poke_data[roster_loop]["slotId"])).style.backgroundColor = pokemon_type_colors[0];
            }
          moves_draw_loop ++;
          }

        }

        
        
        
        //this curly bracket is the end of the else statement. if its supposed to be in the else statement for the pokemon update, put it *before* this curly boi
      }
      
      //this code will be eventually used to solve the pokemon flip glitch
      //pokemon_pids_minus_2[poke_data[roster_loop]["slotId"]] = pokemon_pids_minus_1[poke_data[roster_loop]["slotId"]];
      //pokemon_pids_minus_1[poke_data[roster_loop]["slotId"]] = poke_data[roster_loop]["pokemon"]["pid"];
      //console.log("Pokemon in ".concat(poke_data[roster_loop]["slotId"], ": ", poke_data[roster_loop]["pokemon"]["speciesName"]));
      //console.log(pokemon_pids_minus_1);
      //console.log(pokemon_pids_minus_2);
    }
    //end of function

    //updates the slot id update numbers for future reference
    slot_change_ids[poke_data[roster_loop]["slotId"]] = poke_data[roster_loop]["changeId"];
    roster_loop ++;
  } 
  console.log(update_loop);
  //update_loop ++;
}


//this bit of code fetches the json file every 100 milliseconds, and uses it to update the team
 setInterval(

  function get_new_data(){
    fetch("./json_generator/party.json")
    .then(response => {
      return response.json();
    })
    .then(function(data) {
      poke_data = data;
      //console.log(poke_data);
      update_();
    });
  }
  ,

 100);
