const isAdmin = (req,res,next)=>{
    try{
        if(req.user && req.user.role === 'admin'){
            next();
        }
        else{
            res.status(403).json({
                success:false,
                message:"Access deniend..!!Admin Onllly",
            });
        }
    }
    catch(error){
        res.status(500).json({
            success:false,
            message:'Server error..!!'
        })
    }
}

export default isAdmin;