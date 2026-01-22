const errorhandler=(err,req,res,next)=>
{
  console.error(err.stack);
  const status=err.statuscode||404;
  const massege=err.massege||"backend err";
  res.status(status).json({massege:massege});
}
module.exports=errorhandler;