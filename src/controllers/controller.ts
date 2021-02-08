import { Request, Response } from "express";

export function get(req : Request, res:Response): Response{
    //recibe params and read data.json file
    const newReq = req.params;
    const fs = require('fs');
    let content2 = JSON.parse(fs.readFileSync( 'data.json', 'utf8'));
    let vari :string=newReq.id;
    //decide wich message return
    if(vari == '-1')
        return  res.json(content2);
    if(content2[vari] == undefined)
       return  res.json('HOLA MUNDO!! No encontramos tu nombre :(');
    return  res.json('Hola '+content2[newReq.id]+'!!');
}

export function add(req : Request, res:Response): Response{
    //reciebe json from request
    const newReq = req.body;
    //manage data.json
    const fs = require('fs');
    let content = JSON.parse(fs.readFileSync('data.json', 'utf8'));
    //add new data to json
    content.cont++;
    content[content.cont]=newReq.nombre;
    fs.writeFileSync('data.json', JSON.stringify(content));
    return  res.json('Nombre agregado! Hola '+ content[content.cont]+'!! Tu id es: '+ content.cont);
}

export function edit(req : Request, res:Response): Response{
    //reciebe json from request
    const reqParam = req.params;
    let vari :string=reqParam.id
    const newReq = req.body;
    //manage data.json
    const fs = require('fs');
    let content = JSON.parse(fs.readFileSync('data.json', 'utf8'));
    //edit new data
    content[vari]=newReq.nombre;
    fs.writeFileSync('data.json', JSON.stringify(content));
    return  res.json('Nombre editado! Hola de nuevo '+ content[vari]+'!!');
}

export function del(req : Request, res:Response): Response {
    //reciebe json from request
    const newReq:string = req.params.id;
    const fs = require('fs');
    //manage data.json
    let content = JSON.parse(fs.readFileSync( 'data.json', 'utf8'));
    //delete data from json
    delete content[newReq];
    fs.writeFileSync('data.json', JSON.stringify(content));
    return  res.json('Nombre eliminado, adios :(');
}