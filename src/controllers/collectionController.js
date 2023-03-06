import Models from "../db/models"
import {decode} from "../helper/jwtTokenize"
import {v4 as uuidv4 } from 'uuid';
const {collections,organisations} = Models;

class collectionController{
    static async addCollectionController(req,res){
        const token = req.headers["token"];
        const Token=decode(token)
        console.log(token,Token)
        const orgId= Token.dborganisationId
        try {
            const {Fullname,position,age,salary,gender} = req.body;
            const FindOrganisation= await organisations.findOne({
                where:{id:orgId}
            })
            if(FindOrganisation){
                const createCollection = await collections.create({
                    id:uuidv4(),
                    Fullname,
                    position,
                    age,
                    salary,
                    gender,
                    organisationId:orgId


                })
                return res.status(200).json({
                    status:200,
                    message:"collection success",
                    data:createCollection
                })
            }
            else{
                return res.status(400).json({
                    status:400,
                    message:"organization not found",
                })
            }

        } catch (error) {
            res.status(500).json({
                status:500,
                message:"server problem:" + error.message
            })
        }
    }

    static async getCollectionEmp(req,res){
        const Provinces =await collections.findAll();
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
       static async UpdateCollection(req, res){
        try {
            const modelid = req.params.id
            const {Fullname,position,age,salary,gender}= req.body    
            const findData = await collections.findOne({
                where: {id:modelid}
            });
            if(findData){
                const updatedata = await collections.update({
                    Fullname,
                    position,
                    age,
                    salary,
                    gender
                    
                }, {where: {id:modelid}, returning: true })
                res.status(200).json({
                    status: 200,
                    message:"User account update",
                    data:updatedata
                });
            }else{
                res.status(404).json({
                    stastus:404,
                    message:"User account not Find"
                });
            }
        } catch (error) {
            res.status(500).json({
                status: 500,
                message:"Server problem"+ error.message
            })
        }
    }

    static async deleteCollection(req, res) {
        try {
          const modelId = req.params.id;
          const found = await collections.findOne({
            where: { id: modelId },
          });
          if (found) {
            await collections.destroy({
              where: { id: modelId },
            });
            return res.status(200).json({
              status: 200,
              message: "Employee was deleted successfull!",
            });
          }
          res.status(404).json({
            status: 404,
            message: "Employee not found",
          });
        } catch (error) {
            res.status(500).json({ status: 500, message: error.message });
          }
        }
    }

export default collectionController