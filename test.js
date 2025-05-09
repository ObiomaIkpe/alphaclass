const bcrypt = require('bcrypt');

const password = "rtyuiop"

async function hashPassword(password){
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword)

}
hashPassword("123456")
