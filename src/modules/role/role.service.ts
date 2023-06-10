import { Injectable, BadRequestException, InternalServerErrorException } from "@nestjs/common";
import {roleDto} from './dto/create.dto'
import {updateDto} from './dto/update.dto'
import { Model } from "mongoose";
import { Role, RoleDocument } from "./schemas/role.schema";
import { InjectModel } from "@nestjs/mongoose";


@Injectable()
export class RoleService{
  constructor(
    
    @InjectModel(Role.name, "Role")
    private readonly roleModel: Model<RoleDocument>
  ){}

  // ! CRAETE ROLE--
  async createRole (name:roleDto){
    // * to find out if this is similar
    const findRole = await this.roleModel.findOne({name:name.name})    

    if(findRole){
      throw new BadRequestException('This role already has created')
    }
    // * create role
    const newRole = await this.roleModel.create(name) 
    
    return newRole
  }

  // ! READ ROLE --
  async readRole (){

    // * to get all role
    const allRole = await this.roleModel.find()
   
    return allRole
    
  }

  // ! UPDATE ROLE --
  async updateRole( name:updateDto, id:string){
   
    
    const update = await this.roleModel.findByIdAndUpdate({_id:id}, name).catch((error:unknown)=> {throw new InternalServerErrorException('Internal server error')})

    return update
  }


  // ! DELETE ROLE --
  async deleteRole( id:string){
   
    const delRole = await this.roleModel.findByIdAndDelete({ _id: id }).catch((error:unknown)=> {throw new InternalServerErrorException('Internal server error')})
    
    return delRole
  }

}