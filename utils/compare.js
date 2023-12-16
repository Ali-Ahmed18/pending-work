import bcrypt from "bcrypt"
const pswCompare = async(bodyPsw,dbPsw)=>{
        const password = await bcrypt.compare(bodyPsw,dbPsw)
        return password
}
export default pswCompare