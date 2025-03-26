import bcrypt from "bcryptjs";
const pass="43525256"
const salt=10
bcrypt.hash(pass,salt,(err,hash)=>{
    if (err) {
       console.log(err.message);
        
    } else {
        console.log('Hashed pass:',hash)
    }
})