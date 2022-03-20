-- IMPORTANT: if you edit this value, you must also edit it in /node/config.advanced.json
local server_port = 8090
local server_host = '127.0.0.1'
-- local server_host = 'xlink.cybershade.org'

local print_debug_messages = true
local print_debug = require("print_debug")
print_debug = print_debug(print_debug_messages)

local json = require("dkjson")
local ltn12 = require "ltn12"

local change_ids = { 0, 0, 0, 0, 0, 0 }
local box_change_ids = {}

for box = 1, 18 do
    box_change_ids[box] = {}
    for box_slot = 1, 30 do
        box_change_ids[box][box_slot] = 0
    end
end

function reset_server()
	file = io.open("party.json", "w")
	file:write('{}')
	file:close()
end

function get_game_version(gen, game, subgame)
    if gen == 1 then
        return true
    end

    if gen == 2 then
        return true
    end

    if gen < 3 or gen > 5 then
        print("[ERROR] Invalid game generation:", gen)
        return nil
    end

    if gen == 3 then
        if game > 6 then
            print("[ERROR] Invalid game selected for gen 3:", game)
            return nil
        end

        game = game % 3
        return game == 0 and (subgame == 0 and "fr" or "lg")
            or game == 1 and (subgame == 0 and "r" or "s")
            or "e"
    elseif gen == 4 then
        if game > 3 then
            print("[ERROR] Invalid game selected for gen 4:", game)
            return nil
        end

        return game == 1 and (subgame == 1 and "d" or "p")
            or game == 2 and (subgame == 1 and "hg" or "ss")
            or "pt"
    else -- gen 5
        if game < 4 or game > 7 then
            print("[ERROR] Invalid game selected for gen 5:", game)
            return nil
        end

        return game == 4 and "b"
            or game == 5 and "w"
            or game == 6 and "b2"
            or game == 7 and "w2"
    end
end

function write_file(request_body, generation, game_version)
    local pretty_print = string.gsub(request_body, "\n", "\r\n");
    print_debug(pretty_print)

    file = io.open("party.json", "w")
	file:write(request_body)
    file:close()

    return true
end

function send_slots(slots_info, generation, game, subgame)
    local game_version = get_game_version(generation, game, subgame)
    if game_version == nil then
        return true
    end

    local tmp_info = {}
    for i, v in ipairs(slots_info) do
        tmp_info[#tmp_info + 1] = get_slot_data(v, generation)
    end

    if #tmp_info <= 20 then
        local request_body = json.encode(tmp_info, { indent = print_debug_messages })
        return write_file(request_body, generation, game_version)
    else
        local idx = 1
        while idx < #tmp_info do
            local batch = {}
            for i = 1, 20 do
                batch[i] = tmp_info[idx]
                idx = idx + 1
                if idx > #tmp_info then
                    break
                end
            end

            local request_body = json.encode(batch, { indent = print_debug_messages })
            if not write_file(request_body, generation, game_version) then
                return false
            end
        end
    end

    return true
end

function get_slot_data(info, generation)
    local box_id = info.box_id
    local slot = info.slot_id
    local pokemon = info.pokemon

    if info.box_id ~= nil then
        local change_id = box_change_ids[box_id][slot]
        box_change_ids[box_id][slot] = box_change_ids[box_id][slot] + 1
        return {
            box = box_id,
            slotId = slot,
            changeId = change_id,
            pokemon = pokemon:toJsonSerializableTable(generation)
        }
    else
        local change_id = change_ids[slot]
        change_ids[slot] = change_ids[slot] + 1
        return {
            slotId = slot,
            changeId = change_id,
            pokemon = pokemon:toJsonSerializableTable(generation)
        }
    end
end
