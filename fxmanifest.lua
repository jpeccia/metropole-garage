fx_version 'cerulean'
game 'gta5'

author 'João Otávio Peccia'
description 'Sistema de Garagem - Metrópole'
version '1.0.0'

server_scripts {
  '@oxmysql/lib/MySQL.lua',
  '@es_extended/imports.lua',
  'dist/server/**/*.js'
}

shared_script 'dist/shared/types.js'

files {
  'web/build/index.html',
  'web/build/**/*.*'
}

ui_page 'web/build/index.html'
