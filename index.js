import express from 'express'; // server library
import bodyParser from 'body-parser'; // process req body
import mongoose from 'mongoose'; // mongodb access
import cors from 'cors'; // cross origin requests
import dotenv from 'dotenv'; // env variables
import multer from 'multer'; // uploading files locally
import helmet from 'helmet'; // req safety
import morgan from 'morgan'; // logins
import path from 'path'; // comes with node so dont need to install
import { fileURLToPath } from 'url'; // tgt with path, we can properly set the path when configuring directories
import { register } from './controllers/auth.js' 

// CONFIGURATION
dotenv.config();
const __filename = fileURLToPath(import.meta.url); // grab file url 
const __dirname = path.dirname(__filename); // only when use type modules
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin'}));
app.use(morgan('common'));
app.use(bodyParser.json({limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({limit: '30mb', extended: true }))
app.use(cors()); //invoke cross origin resource sharing policies
app.use('/assets', express.static(path.join(__dirname, 'public/assets'))); // sets the dir of where we keep the assests, which is locally.

// MIDDLEWARE TO LOG REQUESTS COMING IN
app.use((req, res, next) => {
  console.log(req.path, req.method)
  next();
})

// FILE STORAGE
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/assets')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

const upload = multer({ storage })

// ROUTES
app.get('/', (req, res) => {
  res.json({mssg: "The healthy server life chose YOU."})
})

// ROUTES WITH FILES
app.post("/auth/register", upload.single("picture"), register); // uploading picture locally using middleware function


// MONGOOSE SET UP
const PORT = process.env.PORT || 6001;
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
}).catch((error) => console.log(`${error} did not connect`))