TODO:

Привести все выводы ошибок к виду  throw {desc: 'Function failed: ' + caller_name, detail: error};



 *restart server*
 
 heroku restart --app imaginarium-vue
 
 --
 
 *print logs*
 
 heroku logs --tail --app imaginarium-vue 
 
 --
 
 *server status*
 
 heroku ps --app imaginarium-vue 
 
 --
 
 *push changes*
 
 git push heroku-staging master  
