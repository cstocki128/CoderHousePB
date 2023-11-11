import multer from 'multer';
import __dirname from '../utils.js';
import fs from 'fs';
import { logger } from '../utils/logger.js';

function uploadFilter (req, file, cb) {
  try {
    if (file.fieldname == 'document') {
      const {documentType} = req.body
      if (!documentType) return cb(new Error('documentType must be send if you upload a document. This field must be the first in body order. '),false);
      if (!(req.body.documentType == 'ide' || req.body.documentType == 'cdd' || req.body.documentType == 'cdc' || req.body.documentType == 'oth')) return cb(new Error(`documentType must be 'ide' for identification, 'cdd' for address receipt, 'cde' for Account status receipt, 'oth' for others`),false); 
      
    }
    cb(null, true)
  } catch (error) {
    cb(new Error((error.message)), false);
  }
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      try {
        let path;
        switch (file.fieldname) {
          case 'document':
            path =  __dirname + '/public/files/documents'
            break;
          case 'profile':
            path =  __dirname + '/public/files/profile'
            break;
          case 'product':
            path =  __dirname + '/public/files/products'
            break;
          // default:
          //   cb(null,new Error('Invalid file type'));
        }
        if (!fs.existsSync(path)) fs.mkdirSync(path)
        cb(null,path)
      } catch (error) {
        logger.error(error.message)
        // cb(new Error(error.message)) ;
      }
    },
    
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      if (file.fieldname == 'document') {
        cb(null, file.fieldname +'-'+req.body.documentType+ '-' + uniqueSuffix+'-' + file.originalname)
      }else {
        cb(null, file.fieldname + '-' + uniqueSuffix+'-' + file.originalname)
      }
      
    }
  })
  
export const uploader = multer({ storage: storage, fileFilter: (req, file, cb) => { uploadFilter(req, file, cb) }})