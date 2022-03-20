local lshift, rshift, xor, band, bor = bit.lshift, bit.rshift, bit.bxor, bit.band, bit.bor
local function lsw(word) return lshift(word, 16) end
local function gettop(a) return rshift(a, 16) end

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

if not BlockA then -- quick and dirty check to see if we need to load tables
    dofile "auto_layout_gen4_gen5_tables.lua"
end

local function decrypt(words)
    -- unencrypted bytes
    local pid = bor(lsw(words[1]), words[2])

    if pid == 0 then
        return true, nil
    end

    local checksum, cur_checksum = words[4], 0
    local shift_value = rshift(band(pid, 0x3E000), 0xD) % 24 + 1

    local prng = checksum
    local decrypted_words = {
        words[1], words[2], words[3], words[4]
    }

    -- offsets are 0-indexed
    local header_byte_len = 4
    local words_per_block = 16
    local block_offsets = {
        (BlockA[shift_value] - 1) * words_per_block,
        (BlockB[shift_value] - 1) * words_per_block,
        (BlockC[shift_value] - 1) * words_per_block,
        (BlockD[shift_value] - 1) * words_per_block
    }
    local battle_stats_offset = header_byte_len + words_per_block * 4

    -- ph(2, unpack(block_offsets))
    -- print("------------------------")
    -- ph(4, unpack(words))
    
    local dsw = {} -- decrypted shuffled words
    for i = 1, words_per_block * 4 do
        prng = mult32(prng, 0x41C64E6D) + 0x6073
        dsw[#dsw + 1] = xor(words[i + 4], gettop(prng))
        cur_checksum = cur_checksum + dsw[#dsw]
    end

    -- print("Block B decrypted")
    -- print(#dsw)
    -- print("------------------------")
    -- ph(4, unpack(slice(dsw, 1, words_per_block)))
    -- print("------------------------")

    for _, offset in ipairs(block_offsets) do
        -- print(offset)
        -- print(#decrypted_words)
        for i = 1, words_per_block do
            -- print(i + 1, " -> ", #decrypted_words + 1)
            decrypted_words[#decrypted_words + 1] = dsw[offset + i]
        end
    end
    -- print(#decrypted_words)

    -- print("All ordered")
    -- print("------------------------")
    -- ph(4, unpack(decrypted_words))
    -- print("------------------------")
    -- print(#decrypted_words)

    local valid = checksum == cur_checksum % 0x10000
    prng = pid
    
    -- if #words is only 72 long (such as when the pokemon is stored in a box), this next loop will automatically be 
    -- skipped by virtuate of #words
    for i = battle_stats_offset + 1, #words do
        prng = mult32(prng,0x41C64E6D) + 0x6073
        decrypted_words[#decrypted_words + 1] = xor(words[i], gettop(prng))
    end

    -- get current_hp xor-mask
    prng = pid
    prng = mult32(prng,0x41C64E6D) + 0x6073
    prng = mult32(prng,0x41C64E6D) + 0x6073
    prng = mult32(prng,0x41C64E6D) + 0x6073
    
    -- third return value is current_hp xor-mask...
    -- set word 72 in memory to this value, and the pokemon faints
    return valid, decrypted_words, gettop(prng)
end

return decrypt