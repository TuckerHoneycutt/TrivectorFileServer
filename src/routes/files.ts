import express from 'express';
import * as fileController from '../controllers/fileController';

const router = express.Router();

router.get('/', fileController.getAllFiles);
router.get('/:id/metadata', fileController.getFileMetadata);
router.get('/:id/download', fileController.downloadFile);

export default router;
