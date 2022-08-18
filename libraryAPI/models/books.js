
//Model for a book object
module.exports = (seqObj, seq) => {
    const books = seqObj.define("books", 
    {
      id: {
        type: seq.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      title: {
        type: seq.STRING
      },
      author: {
        type: seq.STRING
      },
      publisher: {
        type: seq.STRING
      },
      genre: {
        type: seq.STRING
      },
      ISBN: {
        type: seq.STRING
      },
      availability: {
        type: seq.BOOLEAN,
        default: true 
      }
    });
    return books;
};