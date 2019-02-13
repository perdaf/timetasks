const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const createNotification = notif => {
  return admin
    .firestore()
    .collection('Notifications')
    .add(notif)
    .then(doc => console.log('notification added', doc));
};

exports.projectCreated = functions.firestore
  .document('Project/{projectId}')
  .onCreate(doc => {
    const projet = doc.data();
    const notification = {
      content: 'New project added',
      projectName: `${projet.name}`,
      user: `${projet.createdBy}`,
      time: admin.firestore.FieldValue.serverTimestamp(),
    };

    return createNotification(notification);
  });

exports.taskCreated = functions.firestore
  .document('Tasks/{TasksId}')
  .onCreate(doc => {
    const task = doc.data();
    const notification = {
      content: 'New task added',
      projectName: `${task.name}`,
      user: `${task.createdBy}`,
      time: admin.firestore.FieldValue.serverTimestamp(),
    };

    return createNotification(notification);
  });
