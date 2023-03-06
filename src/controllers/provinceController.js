import Models from "../db/models"
const {privinces} =Models;

class ProvinceController{
    static async getProvinces(req, res) {
        try {
          const Provinces =await privinces.findAll();
         return res.status(200).json({
            responseCode:200,
            status: 'Success',
            data: Provinces,
          });
        } catch (error) {
         return res.status(500).json({
            responseCode:500,
            status: 'Failed',
            message: error.message 
            });
        }
      }
}

export default ProvinceController