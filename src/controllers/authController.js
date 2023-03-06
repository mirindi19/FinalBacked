import Models from "../db/models"
const {users,organisations} = Models;
import bcrypt from "bcrypt";
import {v4 as uuidv4 } from 'uuid';
import {encode, decode} from "../helper/jwtTokenize"
import generateRegistrationCode from "../helper/generateRegistrationCode";
import sgMail from "@sendgrid/mail";
import nodemailer from "nodemailer";
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
class authController{


    static async addNewUserAndOrganization(req, res){
        try {
            const {Fullname, email,name,status,provinceName,districtName}=req.body;
            const Myuuid =uuidv4();
            const OrgId=uuidv4()
           // const hash = await bcrypt.hashSync(password, 10);
           const registrationCode =generateRegistrationCode()
            const checkUser = await users.findOne({
                where:{email:email}
            });
            if(checkUser){
                return res.status(400).json({
                    status:400,
                    message:"Email already exist"
                    
                })
            }
            else{
                const createDate = await users.create({
                    id:  Myuuid,
                    Fullname, 
                    email,
                    role:"OrganizationUser",
                    password:null,
                    registrationCode:registrationCode,
                    status:false,
                    organizationId:OrgId
                });
                const organizationData = await organisations.create({
                    id:  OrgId,
                    name:name,
                    status:status,
                    provinceName:provinceName,
                    districtName:districtName,
                   
                });

                const mail = nodemailer.createTransport({
                    host: "smtp.outlook.com",
                    port: 587,
                    secure: false,
                    auth: {
                      user: "mirindisaidi19@outlook.com", // Your email id
                      pass: "kylexy97", // Your password
                    },
                  });
                  const data = await mail.sendMail({
                    from: "mirindisaidi19@outlook.com",
                    to: email,
                    subject: "Gender Promotion.",
                    text: `
                      Gender Promotion and women empowerm
                  
                      `,
                    html: `
                      <h1>Hello ${Fullname},</h1>
                      <p>Thanks for registering on our site.</p>
                      <p>This is your Registration code ${registrationCode}</p>
                    
                 
                      `,
                  });
                  try {
                    data.sendMail(data, function (error, body) {
                      console.log(body);
                      if (error) {
                        console.log(error);
                      } else {
                        console.log("Email sent successful");
                      }
                    });
                  } catch (error) {
                    console.log("something want wrong ");
                  }



                res.status(200).json({
                    status: 200,
                    message: "Account created",
                    data:{createDate,organizationData}
                })

            }
        } catch (error) {
            res.status(500).json({
                status:500,
                message:"server problem:" + error.message
            })
            
        }
    }

    static async getUsers(req, res) {
        try {
          const Provinces =await users.findAll();
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
      static async deleteUser(req, res){
        try {
            const modelId = req.params.id
            const findUser = await users.findOne({
                where: { id: modelId}
            });
            if(findUser){
                const deleteDate = await users.destroy({
                    where: {id:modelId}
                });
                res.status(200).json({
                    status: 200,
                    message:"User Account Deleted",
                });
            }
            else{
                res.status(404).json({
                    status:404,
                    message:"User Account not found"
                })
            }            
        } catch (error) {
            res.status(500).json({
                status:500,
                message:"server proble :" + error.message
            });
        }
    }

    static async Login(req, res){
        try {
            const {email,password}=req.body
            const findUser = await users.findOne({
                where: {email:email}
            })
            if(!req.user){
                res.status(404).json({
                    status: 404,
                    message:"Account don't exit"
                })
            }
            else{
                const dbEmail = req.user.email
                const dbPassword = req.user.password
                const dbRole= req.user.role
                const dborganisationId=req.user.organizationId
                const decreptedPassword = await bcrypt.compare(password, dbPassword)
                console.log(dbEmail,decreptedPassword);

                if(dbEmail == email){
                    if(decreptedPassword){
                        const token=await encode({
                            email,
                            dbRole,
                            dborganisationId
                            
                        });

                        const decodeToken = await decode(token);
                        const role = decodeToken.dbRole
                        const emailfromtoken =decodeToken.email
                        console.log(role,emailfromtoken);
                       return res.status(200).json({
                            stastus: 200,
                            message: "Login succefull",
                            data:{
                                role,
                                emailfromtoken,
                                token
                            }
                        })
                    }else{
                        res.status(400).json({
                            stastus: 400,
                            message:"Wrong Password"
                        })
                    }
                }else{
                    res.status(400).json({
                        stastus: 400,
                        message:"Wrong Email"
                    })
                }
            }
            
        } catch (error) {
            res.status(500).json({
                stastus: 500,
                message:"server problem" +error.message
            })
        }
    }

    static async UpdateUser(req, res){
        try {
            const modelid = req.params.id
            const {Fullname,email,username,password}= req.body    
            const findData = await users.findOne({
                where: {id:modelid}
            });
            if(findData){
                const updatedata = await users.update({
                    Fullname,
                    email,
                    username,
                    password
                    
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

    static async sinup(req, res){
        try {
            const {password,username,registrationCode}=req.body;
            const Myuuid =uuidv4();
            const hash = await bcrypt.hashSync(password, 10);
          
            const CheckCode = await users.findOne({
                where:{registrationCode}

            })
            if(CheckCode){
                    const createDate = await users.update({

                        password: hash,
                        status:true,
                        username,
                        
                        
                    },{where:{registrationCode},returning:true});
                    res.status(200).json({
                        status: 200,
                        message: "Account created",
                        data:createDate
                    })
    
                }
            
            else{
                return res.status(400).json({
                     status: 400,
                     message: "you are not authorized to create account ",
                 })
             }
           
        } catch (error) {
            res.status(500).json({
                status:500,
                message:"server problem:" + error.message
            })
            
        }
    }
























    ///////////////////////////////////////////////////////////////////////
    
    static async addNewUser(req, res){
        try {
            const {Fullname, email,password,status,organizationId}=req.body;
            const Myuuid =uuidv4();
            const hash = await bcrypt.hashSync(password, 10);
            const checkUser = await users.findOne({
                where:{email:email}
            });
            if(checkUser){
                return res.status(400).json({
                    status:400,
                    message:"Email already exist"
                    
                })
            }
            else{
                const createDate = await users.create({
                    id:  Myuuid,
                    Fullname,
                    email,
                    role:"user",
                    password: hash,
                    status:false,
                    organizationId
                });
                res.status(200).json({
                    status: 200,
                    message: "Account created",
                    data:createDate
                })

            }
            
        } catch (error) {
            res.status(500).json({
                status:500,
                message:"server problem:" + error.message
            })
            
        }
    }
    static async creatAccount(req, res){
        try {
            const {Fullname, email,password}=req.body;
            const Myuuid =uuidv4();
            const hash = await bcrypt.hashSync(password, 10);
            const checkUser = await users.findOne({
                where:{email:email}
            });
            if(checkUser){
                return res.status(400).json({
                    status:400,
                    message:"Email already exist"
                    
                })
            }
            else{
                const createDate = await users.create({
                    id:  Myuuid,
                    Fullname,
                    email,
                    role:"user",
                    password: hash,
                    status:false,
                    
                });
                res.status(200).json({
                    status: 200,
                    message: "Account created",
                    data:createDate
                })

            }
        } catch (error) {
            res.status(500).json({
                status:500,
                message:"server problem:" + error.message
            })
            
        }
    }
       
}

export default authController