// src/controllers/fileController.ts
import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';
import { query } from '../db';
import { File } from '../models/file';

export const getAllFiles = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const result = await query('SELECT * FROM files', []);
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
};

export const getFileMetadata = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const fileId = req.params.id;
  try {
    const result = await query('SELECT * FROM files WHERE id = $1', [fileId]);
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'File not found' });
    } else {
      res.json(result.rows[0]);
    }
  } catch (error) {
    next(error);
  }
};

export const downloadFile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const fileId = req.params.id;
  try {
    const result = await query('SELECT * FROM files WHERE id = $1', [fileId]);
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'File not found' });
      return;
    }

    const file: File = result.rows[0];
    const filePath = file.filepath;

    if (!fs.existsSync(filePath)) {
      res.status(404).json({ error: 'File not found on the server' });
      return;
    }

    const fileName = path.basename(filePath);
    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
    res.setHeader('Content-Type', 'application/octet-stream');

    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
  } catch (error) {
    next(error);
  }
};
