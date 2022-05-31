import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url';
import contentful from 'contentful'
import nodemailer from 'nodemailer'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)


// Init App
const app = express();
const port = process.env.PORT || 3000
 

// Load View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug')


// Set Public Folder

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json())

var client = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_KEY,
});

const projectEntries = await client.getEntries({ content_type: 'project'})
const projects = projectEntries.items
console.log( projects );



// Home Route
app.get('/', (req, res) => {
    res.render('index', { projects });
})

// Work Route
app.get('/about', (req, res) => {
    res.render('about', {
        message: 'How Are you'
    });
})

// Contact Route
app.get('/contact', (req, res) => {
    res.render('contact', {
        message: 'How Are you'
    });
})

app.post('/contact', (req, res) => {
  console.log(req.body)

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'alsalvadorg@gmail.com',
      // App Password
      pass: process.env.GOOGLE_APP_PASSWORD
    }
  })

  const mailOptions = {
    from: req.body.email,
    to: 'alsalvadorg@gmail.com',
    subject: `${req.body.name} from ${req.body.email}: \ ${req.body.subject}`,
    text: req.body.message
  }

  transporter.sendMail(mailOptions, (error, info) => {
    if(error){
      console.log(error)
      res.send('error')
    } else {
      console.log('Email Sent: ' + info.response)
      res.send('success')
    }
  })
  
})

async function getEntry(title){
  const { items } = await client.getEntries({
    content_type: 'project',
    'fields.title': title
  })
  return items[0]
}

app.get('/projects/:id', (req, res) => {

  getEntry(req.params.id)
    .then(function(result){
      let { fields } = result
      res.render(
        'project', fields
      
      );
  })
})

//Start Server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});