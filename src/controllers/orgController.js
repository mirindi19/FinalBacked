import Models from "../db/models"
import {v4 as uuidv4} from 'uuid'
import { decode } from "jsonwebtoken";
import { Sequelize } from "sequelize";
const {organisations,educationCollections,collections,users} = Models;


class orgController{
    static async getOrganization(req,res){
        try {
            const org =await organisations.findAll();
           return res.status(200).json({
              responseCode:200,
              status: 'Success',
              data: org,
            });
          } catch (error) {
           return res.status(500).json({
              responseCode:500,
              status: 'Failed',
              message: error.message 
              });
          }
          
    }
    static async findOrgCollectionByCUserId(req,res){
        try {
            const token=req.headers['token']
            const Token=await decode(token)
            const orgId=Token.dborganisationId
          const organizationData=await organisations.findOne({
            where:{id:orgId},
            include:[{model:collections}],
          })
          if(organizationData){
      return res.status(200).json({
        responseCode:200,
        status:"successs",
        data:organizationData
      })
          }
          return res.status(400).json({
            responseCode:400,
            status:"failed",
            message:"organization not found"
          })
            
        } catch (error) {
            return res.status(500).json({
                responseCode:500,
                status: 'Failed',
                message: error.message 
                });  
        }
    }

    static async findOrgEducationCollectionByCUserId(req,res){
        try {
            const token=req.headers['token']
            const Token=await decode(token)
            const orgId=Token.dborganisationId
          const organizationData=await organisations.findOne({
            where:{id:orgId},
            include:[{model:educationCollections}],
          })
          if(organizationData){
      return res.status(200).json({
        responseCode:200,
        status:"successs",
        data:organizationData
      })
          }
          return res.status(400).json({
            responseCode:400,
            status:"failed",
            message:"organization not found"
          })
            
        } catch (error) {
            return res.status(500).json({
                responseCode:500,
                status: 'Failed',
                message: error.message 
                });  
        }
    }


    static async getTotalNumberOfFemeleInOrganisationByEducationCollection(req,res){
        try {
                // const schoolId = req.params.id;

                const results=await organisations.findAll({
                    attributes: [
                        'name'
                    ],
                    include:[
                        {model:educationCollections,
                        attributes:[
                            'gender',
                            // [Sequelize.fn("COUNT", Sequelize.col("organisationId")), "total"]
                        ]}
                    ]
                })
                // const Results = await educationCollections.findAll({
                //   attributes: [
                //     "organisationId",
                //     'gender',
                //     // [Sequelize.fn("sum", Sequelize.col("marks")), "total"],
                //     [Sequelize.fn("COUNT", Sequelize.col("organisationId")), "numberoffemale"],
                //   ],
                //   group: ["organisationId", "organisation.id",'educationCollections.gender'],
                //   raw: true,
                //     //  where:{gender:"Female"},
                // //   order: Sequelize.literal("DESC"),
                //   include: [
                //     { model: organisations, attributes: ["name"],

                //      json: true },
                                
                //         ],
                //         // }]
                //       });

                       if (results) {
                        let response=[]
                        let male=0
                        let female=0
                       results.forEach(p=>{
                        
                        p.educationCollections.forEach(d=>{
                             
                         if(d.gender==='Male'){
                            male +=1;
                         }
                         else if(d.gender==='Female'){
                        female +=1
                         }
                        })

                       let data={
                        'organizationName':p.name,
                        'total':p.educationCollections.length,
                        'female':female,
                        'male':male,
                        'femalePercenatege':(female*100)/p.educationCollections.length
                    }
                    male=0
                    female=0
                    response.push(data)
                       })
                        return res.status(200).json({
                          status: 200,
                          message: "female with total",
                          data: response,
                        });
                      }
                      return res.status(404).json({
                        status: 404,
                        message: "No Data Found",
                      });
          } catch (error) {
           return res.status(500).json({
              responseCode:500,
              status: 'Failed',
              message: error.message 
              });
          }
          
    }

// compare private and public organization
static async comparePrivateandPublicOrganization(req,res){
    try {
        const Results = await organisations.findAll({
            attributes: [
                'status',
             // [Sequelize.fn("sum", Sequelize.col("marks")), "total"],
              [Sequelize.fn("COUNT", Sequelize.col("organisationId")), "studentCount"],
             // [Sequelize.fn("COUNT", Sequelize.col("marks")), "AssessmentCount"],
            ],
            group: ["status",'educationCollections.gender'],
            raw: true,
            // order: Sequelize.literal("total ASC"),
            include: [
              {
                model: educationCollections,
                where: { gender:'Female'},
                attributes: ["gender"],
              },
            ],
          });

                  if (Results) {
                    console.log(Results);
                    return res.status(200).json({
                      status: 200,
                      message: "female based on private sector or public",
                      data: Results,
                    });
                  }
                  return res.status(404).json({
                    status: 404,
                    message: "No Data Found",
                  });
      } catch (error) {
       return res.status(500).json({
          responseCode:500,
          status: 'Failed',
          message: error.message 
          });
      }
      
}

// compare private and public organization
static async compareOrganizationByProvince(req,res){
    try {
        const Results = await organisations.findAll({
            attributes: [
                'provinceName',
             // [Sequelize.fn("sum", Sequelize.col("marks")), "total"],
              [Sequelize.fn("COUNT", Sequelize.col("organisationId")), "numberofFemale"],
             // [Sequelize.fn("COUNT", Sequelize.col("marks")), "AssessmentCount"],
            ],
            group: ["provinceName",'educationCollections.gender'],
            raw: true,
            // order: Sequelize.literal("total ASC"),
            include: [
              {
                model: educationCollections,
                where: { gender:'Female'},
                attributes: ["gender"],
              },
            ],
          });
                  if (Results) {
                    console.log(Results);
                    return res.status(200).json({
                      status: 200,
                      message: "female based on province",
                      data: Results,
                    });
                  }
                  return res.status(404).json({
                    status: 404,
                    message: "No Data Found",
                  });
      } catch (error) {
       return res.status(500).json({
          responseCode:500,
          status: 'Failed',
          message: error.message 
          });
      }
      
}






    
    //////////////////////////////////////////////////////////////////
    static async addOrganisation(req, res){
        try {
            const {provinceId,name,status,Fullname, email,password}= req.body
            
            const UserCheck = await users.findOne({
                where:{email:email}
            });
            const CheckOrganisation = await organisations.findOne({
                where:{name: name}
            })
            if(!CheckOrganisation){
                if(!UserCheck){
                const organizationId = uuidv4();
                const createOrganisation = await organisations.create({
                    id:organizationId,
                    provinceId,
                    name,
                    status
                })
                res.status(200).json({
                    status:200,
                    message:"Organisation created",
                    data:createOrganisation
                })
                const createDate = await users.create({
                    id:uuidv4(),
                    Fullname,
                    email,
                    role:"organisationuser",
                    password,
                    status:false,
                    organizationId
                });
                res.status(200).json({
                    status: 200,
                    message: "Account created",
                    data:createDate
                })

            }else{
                return res.status(400).json({
                    status:400,
                    message:"Email is exit"
                })
            }
            }
            else{
              return  res.status(400).json({
                    status:400,
                    message:"Email exit"
                })
            }

            console.log('mirinnfi ');
        } catch (error) {
          return  res.status(500).json({
                status:500,
                message:"server problem" + error.message
            })
        }
    }

    static async deleteOrg(req, res){
        try {
            const modelId = req.params.id
            const findUser = await organisations.findOne({
                where: { id: modelId}
            });
            if(findUser){
                const deleteDate = await organisations.destroy({
                    where: {id:modelId}
                });
                res.status(200).json({
                    status: 200,
                    message:"Organisation  Deleted",
                });
            }
            else{
                res.status(404).json({
                    status:404,
                    message:"Organisation not found"
                })
            }            
        } catch (error) {
            res.status(500).json({
                status:500,
                message:"server proble :" + error.message
            });
        }
    }

    static async UpdateOrg(req, res){
        try {
            const modelid = req.params.id
            const {name,status,provinceName,districtName}= req.body    
            const findData = await organisations.findOne({
                where: {id:modelid}
            });
            if(findData){
                const updatedata = await organisations.update({
                    name,
                    status,
                    provinceName,
                    districtName
                    
                }, {where: {id:modelid}, returning: true })
                res.status(200).json({
                    status: 200,
                    message:"Organisation account update",
                    data:updatedata
                });
            }else{
                res.status(404).json({
                    stastus:404,
                    message:"Organisation account not Find"
                });
            }
        } catch (error) {
            res.status(500).json({
                status: 500,
                message:"Server problem"+ error.message
            })
        }
    }

   
}

export default orgController


