-- Based on the Pokemon gen 4 lua script by MKDasher
-- Modified by EverOddish for automatic image updates
-- Modified by dfoverdx for using a NodeJS server for automatic image updates and SoulLink
-----------

local gv = require("game_version")
local game = gv[3]
local subgame = gv[4]

-- FEATURE CURRENTLY DOESN'T WORK
-- Set this to true if you and a partner are doing a SoulLink run (this will additionally access information in Bill's
-- 	  PC).  If you are using a version other than HeartGold/SoulSilver, see the note below.
-- local run_soul_link = true

local print_debug_messages = false
-----------

local print_first_pokemon_bytes = false

local print_debug = require("print_debug")
print_debug = print_debug(print_debug_messages)
local debug_current_slot
local first_pokemon_bytes_by_level = {}
local num_loops = 0

local Pokemon = require("pokemon")
dofile "send_data_to_server.lua"
dofile "pokemon_name_to_pokedex_id.lua"

local gen

local pointer
local pidAddr
local pid = 0
local trainerID, secretID, lotteryID
local shiftvalue
local checksum = 0
local in_battle = false

local mode = 1
local modetext = "Party"
local submode = 1
local modemax = 5
local submodemax = 6
local tabl = {}
local prev = {}

local leftarrow1color, rightarrow1color, leftarrow2color, rightarrow2color

local delta_boxes = {}
local last_boxes = {}
for i = 1, 18 do
	last_boxes[i] = nil
end

local last_box_check_time = 0
local check_box_frequency = 1 -- in seconds
local box_id_to_check = 1
local boxes_to_check_per_run = 6

local last_party = {}
local first_run = true
local last_check = 0
local is_zero_hp = {}

local prng
local is_shiny

--BlockA
local pokemonID = 0
local heldItem = 0
local OTID, OTSID
local friendship_or_steps_to_hatch
local ability
local hpev, atkev, defev, speev, spaev, spdev
local evs = {}

--BlockB
local move = {}
local movepp = {}
local hpiv, atkiv, defiv, speiv, spaiv, spdiv
local ivspart = {}, ivs
local isegg
local byte0x40
local is_female
local alternate_form
local nat
local isnicknamed, nickname

local bnd,br,bxr=bit.band,bit.bor,bit.bxor
local rshift, lshift=bit.rshift, bit.lshift
local mdword=memory.readdwordunsigned
local mword=memory.readwordunsigned
local mbyte=memory.readbyteunsigned

--BlockD
local location_met
local pkrs
local level_met

--currentStats
local level, hpstat, maxhpstat, atkstat, defstat, spestat, spastat, spdstat
local currentFoeHP = 0

local hiddentype, hiddenpower

--offsets
local BlockAoff, BlockBoff, BlockCoff, BlockDoff

local first_pokemon_bytes

dofile "auto_layout_gen4_gen5_tables.lua"

local xfix = 10
local yfix = 10
function displaybox(a,b,c,d,e,f)
	gui.box(a+xfix,b+yfix,c+xfix,d+yfix,e,f)
end

function display(a,b,c,d)
	gui.text(xfix+a,yfix+b,c, d)
end

function drawarrowleft(a,b,c)
	gui.line(a+xfix,b+yfix+3,a+2+xfix,b+5+yfix,c)
	gui.line(a+xfix,b+yfix+3,a+2+xfix,b+1+yfix,c)
	gui.line(a+xfix,b+yfix+3,a+6+xfix,b+3+yfix,c)
end

function drawarrowright(a,b,c)
	gui.line(a+xfix,b+yfix+3,a-2+xfix,b+5+yfix,c)
	gui.line(a+xfix,b+yfix+3,a-2+xfix,b+1+yfix,c)
	gui.line(a+xfix,b+yfix+3,a-6+xfix,b+3+yfix,c)
end

function mult32(a,b)
	local c=rshift(a,16)
	local d=a%0x10000
	local e=rshift(b,16)
	local f=b%0x10000
	local g=(c*f+d*e)%0x10000
	local h=d*f
	local i=g*0x10000+h
	return i
end

function getbits(a,b,d)
	return rshift(a,b)%lshift(1,d)
end

function gettop(a)
	return(rshift(a,16))
end

function getGen()
	if game < 4 then
		return 4
	else
		return 5
	end
end

function getGameName()
	local gameNames = {
		{ "Diamond", "Pearl" },
		{ "HeartGold", "SoulSilver" },
		"Platinum",
		"Black",
		"White",
		"Black 2",
		"white 2"
	}

	if game < 3 then
		return gameNames[game][subgame]
	else
		return gameNames[game]
	end
end

function getPointer()
	if game == 1 then
		return memory.readdword(0x02106FAC)
	elseif game == 2 then
		return memory.readdword(0x0211186C)
	else -- game == 3
		return memory.readdword(0x02101D2C)
	end
	-- haven't found pointers for BW/B2W2, probably not needed anyway.
end

function getCurFoeHP()
	if game == 1 then -- Pearl
		if mode == 4 then -- Partner's hp
			return memory.readword(pointer + 0x5574C)
		elseif mode == 3 then -- Enemy 2
			return memory.readword(pointer + 0x5580C)
		else
			return memory.readword(pointer + 0x5568C)
		end
	elseif game == 2 then --Heartgold
		if mode == 4 then -- Partner's hp
			return memory.readword(pointer + 0x56FC0)
		elseif mode == 3 then -- Enemy 2
			return memory.readword(pointer + 0x57080)
		else
			return memory.readword(pointer + 0x56F00)
		end
	else--if game == 3 then --Platinum
		if mode == 4 then -- Partner's hp
			return memory.readword(pointer + 0x54764)
		elseif mode == 3 then -- Enemy 2
			return memory.readword(pointer + 0x54824)
		else
			return memory.readword(pointer + 0x546A4)
		end
	end
end

function getPidAddr()
	if game == 1 then --Pearl
		enemyAddr = pointer + 0x364C8
		if mode == 5 then
			return pointer + 0x36C6C
		elseif mode == 4 then
			return memory.readdword(enemyAddr) + 0x774 + 0x5B0 + 0xEC*(submode-1)
		elseif mode == 3 then
			return memory.readdword(enemyAddr) + 0x774 + 0xB60 + 0xEC*(submode-1)
		elseif mode == 2 then
			return memory.readdword(enemyAddr) + 0x774 + 0xEC*(submode-1)
		else
			return pointer + 0xD2AC + 0xEC*(submode-1)
		end
	elseif game == 2 then --HeartGold
		enemyAddr = pointer + 0x37970
		if mode == 5 then
			return pointer + 0x38540
		elseif mode == 4 then
			return memory.readdword(enemyAddr) + 0x1C70 + 0xA1C + 0xEC*(submode-1)
		elseif mode == 3 then
			return memory.readdword(enemyAddr) + 0x1C70 + 0x1438 + 0xEC*(submode-1)
		elseif mode == 2 then
			return memory.readdword(enemyAddr) + 0x1C70 + 0xEC*(submode-1)
		else
			return pointer + 0xD088 + 0xEC*(submode-1)
		end
	elseif game == 3 then --Platinum
		enemyAddr = pointer + 0x352F4
		if mode == 5 then
			return pointer + 0x35AC4
		elseif mode == 4 then
			return memory.readdword(enemyAddr) + 0x7A0 + 0x5B0 + 0xEC*(submode-1)
		elseif mode == 3 then
			return memory.readdword(enemyAddr) + 0x7A0 + 0xB60 + 0xEC*(submode-1)
		elseif mode == 2 then
			return memory.readdword(enemyAddr) + 0x7A0 + 0xEC*(submode-1)
		else
			return pointer + 0xD094 + 0xEC*(submode-1)
		end
	elseif game == 4 then --Black
		if mode == 5 then
			return 0x02259DD8
		elseif mode == 4 then
			return 0x0226B7B4 + 0xDC*(submode-1)
		elseif mode == 3 then
			return 0x0226C274 + 0xDC*(submode-1)
		elseif mode == 2 then
			return 0x0226ACF4 + 0xDC*(submode-1)
		else -- mode 1
			return 0x022349B4 + 0xDC*(submode-1)
		end
	elseif game == 5 then --White
		if mode == 5 then
			return 0x02259DF8
		elseif mode == 4 then
			return 0x0226B7D4 + 0xDC*(submode-1)
		elseif mode == 3 then
			return 0x0226C294 + 0xDC*(submode-1)
		elseif mode == 2 then
			return 0x0226AD14 + 0xDC*(submode-1)
		else -- mode 1
			return 0x022349D4 + 0xDC*(submode-1)
		end
	elseif game == 6 then --Black 2
		if mode == 5 then
			return 0x0224795C
		elseif mode == 4 then
			return 0x022592F4 + 0xDC*(submode-1)
		elseif mode == 3 then
			return 0x02259DB4 + 0xDC*(submode-1)
		elseif mode == 2 then
			return 0x02258834 + 0xDC*(submode-1)
		else -- mode 1
			return 0x0221E3EC + 0xDC*(submode-1)
		end
	else --White 2
		if mode == 5 then
			return 0x0224799C
		elseif mode == 4 then
			return 0x02259334 + 0xDC*(submode-1)
		elseif mode == 3 then
			return 0x02259DF4 + 0xDC*(submode-1)
		elseif mode == 2 then
			return 0x02258874 + 0xDC*(submode-1)
		else -- mode 1
			return 0x0221E42C + 0xDC*(submode-1)
		end
	end
end

function getNatClr(a)
	color = "yellow"
	if nat % 6 == 0 then
		color = "yellow"
	elseif a == "atk" then
		if nat < 5 then
			color = "#0080FFFF"
		elseif nat % 5 == 0 then
			color = "red"
		end
	elseif a == "def" then
		if nat > 4 and nat < 10 then
			color = "#0080FFFF"
		elseif nat % 5 == 1 then
			color = "red"
		end
	elseif a == "spe" then
		if nat > 9 and nat < 15 then
			color = "#0080FFFF"
		elseif nat % 5 == 2 then
			color = "red"
		end
	elseif a == "spa" then
		if nat > 14 and nat < 20 then
			color = "#0080FFFF"
		elseif nat % 5 == 3 then
			color = "red"
		end
	elseif a == "spd" then
		if nat > 19 then
			color = "#0080FFFF"
		elseif nat % 5 == 4 then
			color = "red"
		end
	end
	return color
end

function read_pokemon_words(addr, num_words)
	local pid = memory.readdword(addr)
	in_battle = check_is_in_battle(addr, pid)
	local num_bytes = num_words * 2
	local bytes

	-- check that num_words > 0x88 in case we're looking at a boxed pokemon...?  doesn't make sense that this would ever
	-- happen, but doesn't hurt to check either
	if in_battle and num_bytes > 0x88 then
		-- we can get live stats for the battle stat block -- don't trust it for other things like exp
		-- bytes = memory.readbyterange(addr, 0x88)
		local battle_addr = addr + 0x4E9F0
		bytes = memory.readbyterange(battle_addr, 0x88)
		local battle_bytes = memory.readbyterange(battle_addr + 0x88, num_bytes - 0x88)
		for _, b in ipairs(battle_bytes) do
			bytes[#bytes + 1] = b
		end
	else
		bytes = memory.readbyterange(addr, num_bytes)
	end

	local words = {}

	-- PID is taken as a whole, and memory is in little-endian, so reverse the words
	words[1] = getbits(pid, 16, 16)
	words[2] = getbits(pid, 0, 16)

	for i = 5, #bytes, 2 do
		words[#words + 1] = bytes[i] + lshift(bytes[i + 1], 8)
	end

	return words
end

function check_gen5_in_battle(baseBattleAddr)
	-- when in battle, the section we're looking at in memory says "btl_pokeparam.c" at the beginning
	btl_pokeparamAddr = baseBattleAddr - 0x26
	bytes = memory.readbyterange(btl_pokeparamAddr, 15)
	expected_bytes = {0x62, 0x74, 0x6c, 0x5f, 0x70, 0x6F, 0x6B, 0x65, 0x70, 0x61, 0x72, 0x61, 0x6D, 0x2E, 0x63} --btl_pokeparam.c
	for i = 1, 15 do
		if bytes[i] ~= expected_bytes[i] then
			return false
		end
	end
	return true
end

-- Gen5 seems to have a different location for where it's battle data is per game
function hp_for_gen5_battles(words, q)
    local baseBattleAddr
    if game <= 3 or (words[1] == 0 and words[2] == 0)  then --skip if we don't have a pokemon here or if its not gen 5
        return 0,0
    elseif game == 4 then --Black
        baseBattleAddr = 0x0226D6B2 -- B0 gives dex number of 'mon
    elseif game == 5 then --White
        baseBattleAddr = 0x0226D6D2
    elseif game == 6 then --Black2
        baseBattleAddr = 0x0225B1F2
    else                  --White2
        baseBattleAddr = 0x0225B232
    end
	in_battle = check_gen5_in_battle(baseBattleAddr)
	if not in_battle then
		return nil
	end
    local hpAddr = baseBattleAddr + (q-1)*0x224
    local bytes = memory.readbyterange(hpAddr, 4)
    local maxHp = bytes[1] + lshift(bytes[2], 8)
    local currentHp = bytes[3] + lshift(bytes[4], 8)
    if (maxHp == 0 and currentHp == 0) or maxHp > 714 or currentHp > 714 or currentHp > maxHp then
        return 0,0
    end
    in_battle = true
    return currentHp, maxHp
end

function do_print_first_pokemon_bytes(pidAddr)
	local byte_str = ""
	for i, b in ipairs(memory.readbyterange(pidAddr, 0x88)) do
		byte_str = byte_str .. string.format(" 0x%02x,", b)
	end

	-- first_pokemon_bytes = string.format("{ %s }", table.concat(memory.readbyterange(pidAddr, 0x27), ", "))

	print("---------------------------")
	print("{" .. byte_str .. " }")
	print("---------------------------")
end

-- function inspect_and_send_boxes()
-- 	local cur_boxes = {}
-- 	local box_offset = bills_pc_address[game][subgame]
-- 	local last_pkmn, cur_pkmn, should_update, words
-- 	local end_box_id

-- 	if first_run then
-- 		-- the first time the script is run, read all boxes
-- 		end_box_id = 18
-- 	else
-- 		end_box_id = box_id_to_check + boxes_to_check_per_run - 1
-- 		if end_box_id > 18 then
-- 			-- it's easier to just not check the max number of boxes if boxes_to_check_per_run doesn't divide 18
-- 			end_box_id = 18
-- 		end
-- 	end

-- 	for box = box_id_to_check, end_box_id do
-- 		cur_boxes[box] = {}
-- 		for box_slot = 1, 30 do
-- 			words = read_pokemon_words(box_offset + (box - 1) * box_size + (box_slot - 1) * box_slot_size, Pokemon.word_size_in_box)
-- 			if last_boxes[box] == nil or Pokemon.get_words_string(words) ~= last_boxes[box].data_str then
-- 				cur_pkmn = Pokemon.parse_gen4_gen5(words, true, gen)

-- 				if last_boxes[box] == nil then
-- 					cur_boxes[box][box_slot] = cur_pkmn or Pokemon()
-- 					if cur_pkmn ~= nil then
-- 						delta_boxes[#delta_boxes + 1] = {
-- 							box_id = box,
-- 							slot_id = box_slot,
-- 							pokemon = cur_pkmn
-- 						}
-- 					end
-- 				else
-- 					last_pkmn = last_boxes[box][box_slot]
-- 					if cur_pkmn ~= nil and cur_pkmn ~= last_pkmn then
-- 						cur_boxes[box][box_slot] = cur_pkmn
-- 						delta_boxes[#delta_boxes + 1] = {
-- 							box_id = box,
-- 							slot_id = box_slot,
-- 							pokemon = cur_pkmn
-- 						}
-- 					else
-- 						cur_boxes[box][box_slot] = last_pkmn
-- 					end
-- 				end
-- 			end
-- 		end

-- 		last_boxes[box] = cur_boxes[box]
-- 	end

-- 	if #delta_boxes > 0 then
-- 		if not send_slots(delta_boxes, gen, game, subgame) then
-- 			print("ERROR: Failed to connect to server.  Check that the server is running.  Skipping box data upload.")
-- 			return false
-- 		end
-- 		delta_boxes = {}
-- 	end

-- 	box_id_to_check = box_id_to_check + boxes_to_check_per_run
-- 	if box_id_to_check > 18 then
-- 		box_id_to_check = box_id_to_check - 18
-- 	end
-- 	return true
-- end

-- Uncalled function for the time being (and probably forever if I'm being honest)
function kill_pokemon(pidAddr)
	local pid = memory.readdword(pidAddr)
	local death_code, frozen_code = Pokemon.get_death_codes(pid)
	memory.writeword(pidAddr + 71 * 2, death_code)

	-- if in battle
	if memory.readdword(pidAddr + 0x4E9F0) == pid then
		pidAddr = pidAddr + 0x4E9F0
		for i = 0, 3 do
			-- memory.writebyte(pidAddr + 0x88 + (i * 0x400000), frozen_code)
			memory.writeword(pidAddr + 71 * 2 + (i * 0x400000), death_code)
		end
	end
end

-- attempt to check if in battle by comparing pid against all 4 places it seems to appear when in battle
-- far from foolproof, but slightly better than nothing
function check_is_in_battle(addr, pid)
	local battle_addr = addr + 0x4E9F0
	for i = 0, 3 do
		if memory.readdword(battle_addr + (i * 0x400000), death_code) ~= pid then
			return false
		end
	end

	return true
end

-- attempt to check if in battle by examining enemy memory
-- doesn't actually work... enemyAddr doesn't seem to be accurate... may debug this later
-- function get_is_in_battle()
-- 	submode = 1
-- 	getPidAddr() -- this sets enemyAddr
-- 	local enemyWords = read_pokemon_words(enemyAddr, Pokemon.word_size_in_party)
-- 	local enemy = Pokemon.parse_gen4_gen5(enemyWords, false, gen, true)
-- 	print(enemy ~= nil)
-- end

local printed_slot_1 = false
function fn()
	current_time = os.clock() -- use clock() rather than time() so we can check more than once per second

	-- This feature doesn't currently work as apparently Bill's PC's address moves around, game to game.
	-- Yay Nintendo.
	--
	-- if run_soul_link and current_time - last_box_check_time > check_box_frequency then
	-- 	gen = getGen()
	-- 	if not inspect_and_send_boxes() then
	-- 		-- prevent further execution to avoid killing the game
	-- 		last_box_check_time = current_time
	-- 		return
	-- 	end

	-- 	last_box_check_time = current_time
	-- end

	if current_time - last_check > .5 then
		gen = getGen()
		pointer = getPointer()
		party = {}

		for q = 1, 6 do
			submode = q
			pidAddr = getPidAddr()

			if first_run and print_first_pokemon_bytes and q == 1 then do_print_first_pokemon_bytes(pidAddr) end

			local words = read_pokemon_words(pidAddr, Pokemon.word_size_in_party)
			local currentHp, maxHp
            if game >= 4 then --Gen5
                currentHp, maxHp = hp_for_gen5_battles(words, q)
            end

			if last_party == nil or last_party[q] == nil or in_battle or Pokemon.get_words_string(words) ~= last_party[q].data_str then
				local pokemon = Pokemon.parse_gen4_gen5(words, false, gen)
					if game >= 4 and in_battle and pokemon ~= nil then
						pokemon:update_hp(currentHp, maxHp)
					end
					party[q] = pokemon
			else
				party[q] = last_party[q]
			end
		end

		local send_data = {}
		if first_run then
			reset_server()
			last_party = {}
			for k, pkmn in pairs(party) do
				last_party[k] = pkmn or Pokemon() -- invalid pokemon are returned as nil from parse_gen4_gen5
				--print("Slot " .. k .. ": " .. tostring(pkmn))
				send_data[#send_data + 1] = { slot_id = k, pokemon = pkmn }
			end

			print("================")
			print("DO NOT CLOSE THIS LUA SCRIPT WINDOW")
			print("You can minimize it, but do not close it, doing so will stop generating the json files the pokereader needs to work")
			print("================")

			first_run = false
		else
			for q = 1, 6 do
				p = party[q]
				lp = last_party[q]
				if p ~= nil then
					if lp == nil or p ~= lp then
						--print("Slot " .. q .. ": " .. tostring(lp) .. " -> " .. tostring(p))
						send_data[#send_data + 1] = { slot_id = q, pokemon = p }
					end
				else
					party[q] = lp
				end
			end

			last_party = party
			party = {}
		end

		if (#send_data > 0) then
			send_slots(send_data, gen, game, subgame)
		end

		last_check = current_time
	end
end

gui.register(fn)
