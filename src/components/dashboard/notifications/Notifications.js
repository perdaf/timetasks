import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

import moment from 'moment';

function Notifications(props) {
  const { notifications, users } = props;
  let notifsListe = [];

  //   console.log('notifications >>>', notifications);
  //   console.log('users >>>', users);

  if (notifications && users) {
    let user;
    notifications.forEach(notif => {
      user = users.filter(user => user.id === notif.user);
      notifsListe.push({
        content: notif.content,
        projectName: notif.projectName,
        createdAt: notif.time,
        userNotif: `${user[0].lastName} ${user[0].firstName}`,
      });
    });
  }

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <h3 className="text-center">Notifications</h3>
        </div>
        <div className="card-body">
          <ul>
            {notifsListe &&
              notifsListe.map((notif, index) => (
                <li key={index} className="mb-2">
                  <h5>
                    <span role="img" aria-label="fire">
                      🔥
                    </span>{' '}
                    {notif.content}
                  </h5>
                  <span>{notif.projectName}</span>
                  <br />
                  <span>
                    by {notif.userNotif} le{' '}
                    {moment(notif.createdAt.toDate()).format('DD/MM/YYYY')}
                  </span>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  let notifications;
  let users;

  try {
    notifications = state.firestore.ordered.Notifications;
    users = state.firestore.ordered.users;
  } catch (err) {
    console.error(err);
  }

  return {
    notifications: notifications ? notifications : null,
    users: users ? users : null,
  };
};

export default compose(
  firestoreConnect([
    { collection: 'Notifications', orderBy: ['time', 'desc'], limit: 5 },
    { collection: 'users' },
  ]),
  connect(mapStateToProps)
)(Notifications);
