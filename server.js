const Koa=require('koa');

const staticCache=require('koa-static-cache');
const body=require('koa-better-body');
const convert=require('koa-convert');
const Mysql=require('mysql-pro');
const session=require('koa-session');
const config=require('./config');
const Router=require('koa-router');
const ejs=require('koa-ejs');
const pathLib=require('path');

let server=new Koa();
server.listen(config.port)
//连接数据库
const db=new Mysql({
    mysql:{
      host:config.db_host,
      port:config.db_port,
      user: config.db_user,
      password:config.db_password,
      database:config.db_database
    }
  })
db.execute=async (sql)=>{
    await db.startTransaction();   
    let res;
    if(typeof sql=='string'){
        res=await db.executeTransaction(sql);  
    }else{
        sql.forEach(async item => {
            res=await db.executeTransaction(item);  
        });
    }
     
    await db.stopTransaction();  
    return res; 
}
server.use(async (ctx,next)=>{
    ctx.db=db;
    await next();
})

//POST
server.use(convert(body({
    uploadDir:config.uploadDir
})));

//session
server.keys=config.secret_key;
server.use(session({

},server))

//ejs
ejs(server,{
    root:pathLib.resolve('./template'),
    layout:false,
    viewExt:".ejs.html",
    cache:false,
    debug:false
})
//router
let mainRouter=new Router();
mainRouter.use('/',require('./routers/index'));

server.use(mainRouter.routes());
server.use(staticCache(config.wwwDir));
