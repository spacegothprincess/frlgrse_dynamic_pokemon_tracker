function noop(...)
end

function get_print_debug(print_debug_messages)
    return print_debug_messages and print or noop
end

return get_print_debug