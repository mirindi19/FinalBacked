import Models from"../db/models";
const {districts}=Models;
class DistrictController{
    static async getDistrictByprovinceId(req,res){
        try {
            const modelId=req.params.id
            const findDistrict=await districts.findOne({
                where:{ProvinceId:modelId}
            })
            if(findDistrict){
                return res.status(200).json({
                    responseCode:200,
                    status:"success",
                    data:findDistrict
                })
                
            }
            return res.status(400).json({
                responseCode:400,
                status:"failed",
                message:"District not found"
            })
            
           
        } catch (error) {
            return res.status(500).json({
                responseCode:500,
                status:"failed",
                error: error.message
            })  
        }
    }

}

export default DistrictController