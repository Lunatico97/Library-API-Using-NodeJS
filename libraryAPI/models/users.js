
//Model for an user object
module.exports = (seqObj, seq) => {
    const users = seqObj.define("users", 
    {
      id: {
        type: seq.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: seq.STRING
      },
      password: {
        type: seq.STRING
      },
    });
    
   return users;
};