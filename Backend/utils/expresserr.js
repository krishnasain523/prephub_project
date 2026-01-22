class expresserr extends Error
{
    constructor(statuscode,massege)
    {
        super(massege);
        this.statuscode=statuscode;
        this.massege=massege;
         if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
    }
}
module.exports=expresserr