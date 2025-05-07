fx_version 'cerulean'
game 'gta5'

name 'metropole_garage'
author 'João Otávio Peccia'
description 'Sistema de garagem'
version '1.0.0'

ui_page 'web/index.html'

files {
    'web/index.html',
    'web/assets/*.*',
    'web/**/*.*'
}

server_scripts {
    '@oxmysql/lib/MySQL.lua',
    'events.lua',
    'dist/server/index.js'
}

client_scripts {
    'client/client.lua'
}
