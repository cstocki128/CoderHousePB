import multer from 'multer';
import __dirname from '../utils.js';
import fs from 'fs';
import { logger } from '../utils/logger.js';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      try {
        let path;
        switch (file.fieldname) {
          case 'documents':
            path =  __dirname + '/public/files/documents'
            break;
          case 'profile':
            path =  __dirname + '/public/files/profile'
            break;
          case 'products':
            path =  __dirname + '/public/files/products'
            break;
          // default:
          //   cb(null,new Error('Invalid file type'));
        }
        // if (!fs.existsSync(path)) fs.mkdir(path)
        cb(null,path)
      } catch (error) {
        logger.error(error.message)
        // cb(new Error(error.message)) ;
      }
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix+'-' + file.originalname)
    }
  })
  
export const uploader = multer({ storage: storage })