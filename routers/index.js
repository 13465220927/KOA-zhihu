const Router=require('koa-router');
let router=new Router();
router.get('',async ctx=>{
   await ctx.render('list',{a:12});
})
router.get('detail/:id',async ctx=>{
    await ctx.render('item',{});
})
module.exports=router.routes();