fx_version 'cerulean'
game 'gta5'

author 'João Otávio Peccia'
description 'Sistema de garagem'
version '1.0.0'

ui_page 'web/index.html'

files {
  'web/index.html',
  'web/assets/*.*',
  'web/**/*.*',
}

server_scripts {
  '@oxmysql/lib/MySQL.lua',
  'dist/index.js',
  'events.lua',
}

client_scripts {
  'client/client.lua',
}
dependencies {
  'oxmysql',
}