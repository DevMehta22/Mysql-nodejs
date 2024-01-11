const {pool} = require('./database');
const Pool = pool.promise();
const getNotes = async(req,res)=>{
    const query = 'select * from notes';
    try{
        const response = await Pool.query(query);
        res.status(200).json(response[0]);
        }catch(err){
            console.log(err);
            res.status(400).send("Error getting the data");
            }
}

const getNoteById = async(req,res)=>{
    const id= req.params.id;

    const query = `SELECT * FROM notes WHERE id=?`;
    try{
        const result =await Pool.query(query,[id])
        console.log(result)
        if (result.length > 0 )
            return res.status(200).json(result[0]);
        else
            return res.status(404).send("The note with the given ID does not exist.");
        } catch(err){
            console.log(err);
            res.status(500).send("Server error")
            }
}

const createNote = async(req,res)=>{
    const {title,contents}=req.body;
    if(!title || !contents){
        return res.status(400).send({message:"Missing fields"})
        }else{
            const query=`INSERT INTO notes (title, contents) VALUES (?,?)`;
            await Pool.query(query,[title,contents]);
            return res.status(201).send("successfully added!");
            }
}

const updateNote = async (req, res) => {
    const id = req.params.id;
    const { title, contents } = req.body;
    let query = `UPDATE notes SET`;
    let values = [];
    let i = 0;

    for (const key in req.body) {
        i++;
        if (i === 1)
            query = `${query} title=? `;
        else
            query = `${query}, contents=?`;
        
        values.push(req.body[key]);
    }

    query = `${query} WHERE id=?`;
    values.push(id);

    await Pool.query(query, values);

    res.status(200).send('Updated');
};


//delete a specific note by its id
const deleteNote =async (req,res)=>{
    const id=req.params.id;
    try{
        const result=await Pool.query("DELETE FROM notes WHERE id=?",[id]);
        console.log(result);
        if(result.length>0)
            return  res.status(200).send("Deleted");
        else
            return res.status(404).send("Not Found")
    }catch(err){
        console.log(err);
        return res.status(500).send("Server Error");
    }
};

module.exports = {getNotes,getNoteById,createNote,updateNote,deleteNote};

    
    