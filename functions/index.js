const functions = require('firebase-functions');
const admin = require('firebase-admin');


const serviceAccountKey = '../../permissions'; // correct file path

const serviceAccount = require(serviceAccountKey);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://track-it-8b192.firebaseio.com'
});

const db = admin.firestore();

const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({ origin: true }));

app.get('/hello-world', (req, res) => {
  return res.status(200).send('Hello World!');
});


// create
app.post('/api/trips', (req, res) => {
  (async () => {
      try {
        console.log(req.body);

        let data = {
          startLocation: req.body.startLocation,
          endLocation: req.body.endLocation,
          time: req.body.time
        };

        await db.collection("trips").add(data);

        return res.status(200).send();
      } catch (error) {
        console.log(error);
        return res.status(500).send(error);
      }
    })();
});

// get all 
app.get('/api/trips',(req, res) => {
  (async () => {
      try {

          let query = db.collection('trips');

          let response = [];

          await query.get().then(querySnapshot => {
          
            let docs = querySnapshot.docs;

          for (let doc of docs) {
              const item = {
                id: doc.id,
                startLocation: doc.data().startLocation,
                endLocation: doc.data().endLocation
              };
              response.push(item);
          }
          });
          return res.status(200).send(response);
      } catch (error) {
          console.log(error);
          return res.status(500).send(error);
      }
      })();
  });



exports.app = functions.https.onRequest(app);