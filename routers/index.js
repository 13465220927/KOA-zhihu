const Router=require('koa-router');
let router=new Router();
router.get('',async ctx=>{
   let data=await ctx.db.execute(`SELECT * FROM question_table`);
   await ctx.render('list',{});
})
router.get('detail/:id',async ctx=>{
    await ctx.render('item',{});
})
module.exports=router.routes();