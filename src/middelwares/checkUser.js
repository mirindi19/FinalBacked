import Models from '../db/models';
const checkUser = async (req,res,next) =>{
    const{email}=req.body
    const {users}=Models
    const findUser= await users.findOne({
        where:{email:email}
    });
    if(findUser){
        req.user = findUser
        return next();
    }
    req.user = null;
    next();
}

export default checkUser