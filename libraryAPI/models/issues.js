
//Got to hold issues, don't we ?
module.exports = (seqObj, seq) => {
    const issues = seqObj.define("issues", 
    {  
        id: {
            type: seq.INTEGER,
            autoIncrement: true,
            primaryKey: true
        }
    });

    return issues ;
}