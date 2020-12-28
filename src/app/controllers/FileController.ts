import { Request, Response } from "express";
import { File, IFile } from "../models/File";

const gdrive = require('../../../gdrive');
import path from 'path';
const { promisify } = require('util');
const fs = require('fs');
const unlink = promisify(fs.unlink);

export default class FileController {
  async register(req: Request, res: Response) {
    const params: IFile = req.body;
    await File.create<File>(params)
      .then((file: File) => {
        return res.status(201).json(file)
      })
      .catch((err: Error) => {
        return res.status(500).json({ 
          message: "Falha ao cadastrar arquivo, tente novamente!",
          error: err.name,
        })
      });
  }

  async search(req: Request, res: Response) {
    const { id } = req.params;
    await File.findByPk<File>(id)
      .then((file: File | null) => {
        if(file){
          res.json(file);
        }else{
          res.status(404).json({ error: "Arquivo não encontrado." });
        }
      })
      .catch((err: Error) => res.status(500).json({
                message: "Falha ao localizar arquivo.",
                error: err.name
      }));
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const params: IFile = req.body;
    
    const file: File | null = await File.findByPk<File>(id);

    if(file){
      try{
        await file.update(params);
        res.status(200).json("Arquivo atualizado com sucesso!");
      }catch(err){
        res.status(500).json({ error: err });
      }
    }else{
      res.status(404).json({ error: "Arquivo não encontrado." });
    }
  }

  async delete(req: Request, res:Response) {
    const { id } = req.params;
    const file: File | null = await File.findByPk<File>(id);

    if(!file) res.status(404).json('Arquivo não encontrado');
    file?.destroy();
    res.status(200).json('Arquivo excluido com sucesso!');
  }

  async searchAll(req: Request, res: Response) {
    await File.findAll<File>()
      .then((files: Array<File>) => res.json(files))
      .catch((err: Error) => res.status(500).json({
                message: "Falha ao localizar arquivos.",
                error: err.name
      }));
  }

  async uploadCurriculo(req: Request, res: Response) {
      const { originalname: nome, filename } = req.file;
      await gdrive.pdfUpload(
        `Curriculo - Site`,
        path.join(__dirname, '..', '..', 'tmp', 'uploads', `${filename}`),
        async (id: string) => {
          await File.create<File>({
            path: filename,
            url: id,
            type: "Currículo",
          })
            .then((file: File) => {
              return res.status(201).json(file)
            })
            .catch((err: Error) => {
              return res.status(500).json({ 
                message: "Falha ao cadastrar arquivo, tente novamente!",
                error: err.name,
              })
            });
        }
      );
  }

  async downloadDrive(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const file = await File.findByPk<File>(id);

      if(file){
        await gdrive.download(file.url, file.describe);
        return res.status(200).json(file.url);
      }
    } catch (err) {
      return res
        .status(400)
        .json({ error: err });
    }
  }

  async downloadAuth(req: Request, res: Response) {
    const { url } = req.params;
    const { auth } = req.body;
    const arq = await File.findOne<File>({
      where: { url },
    });

    if(arq) arq.update({auth});

    res.status(200).json('Atualizado!');
  }

  async downloadOpen(req: Request, res: Response) {
    const { id } = req.params;
    const file = await File.findByPk<File>(id);

    return res
      .status(200)
      .download(
        path.join(`${__dirname}`, `..`, `..`, `tmp`, `down`, `${file?.describe}`)
      );
  }

  async deleteFile(req: Request, res:Response) {
    const { url } = req.params;
    const file = await File.findOne<File>({
      where: { url },
    });
    setTimeout(async function() {
      try {
        await Promise.all([
          unlink(
            path.join(`${__dirname}`, `..`, `..`, `tmp`, `down`, `${file?.describe}`)
          ),
        ]);
        res.end();
      } catch (e) {
        console.error(e);
        res.status(500).send('Ocorreu um erro interno.');
      }
    }, 900000);
  }
}