
//Associates publishers with its books
module.exports = (seqObj, seq) => {
    const publish = seqObj.define("publish", 
    {  
        id: {
            type: seq.INTEGER,
            autoIncrement: true,
            primaryKey: true
        }
    });

    return publish ;
}