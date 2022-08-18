
//Model for a publication object
module.exports = (seqObj, seq) => {
    const pubs = seqObj.define("pubs", 
    {
      id: {
        type: seq.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: seq.STRING
      },
      address: {
        type: seq.STRING
      },
      PAN: {
        type: seq.STRING
      }
    });
    return pubs;
};