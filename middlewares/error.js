

class errorhandler extends Error{
constructor(message,statuscode){
    super(message);
    this.statuscode=statuscode;
}
}


export const errormiddleware= (err,req,res,next)=>{
    
    err.message = err.message || "Internal error";  //if we didnt specify error message then it will consider "internal error"
    err.statuscode = err.statuscode || "404";

    res.status(404).json({
        success:false,
        message:err.message,
    })
}


export default errorhandler;