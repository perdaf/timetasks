import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import '../../scss/index.scss';

import classnames from 'classnames';

import moment from 'moment';
import 'moment-duration-format';

import * as $ from 'jquery';

import Modal from '../layout/modal/Modal';
import Timer from '../timer/Timer';

import { connect } from 'react-redux';
import { deleteTask } from '../../store/actions/taskAction';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

class TaskDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
    };
  }

  toggleModalSuppTask = (id, projet) => {
    $('#ConfirmDelete').modal('show');
    $('.ModalBtnConfirm')
      .off('click')
      .click(() => {
        this.props.onDeleteTask(id);
        $('#ConfirmDelete').modal('hide');
        this.props.history.push(`/project-detail/${projet}`);
      });
  };

  render() {
    // redirect to signin in not connected
    const { auth, user, projets, thisUser } = this.props;

    let isAdmin = false;
    if (thisUser.role === 'admin') {
      isAdmin = true;
    }

    const userName = id => {
      const usercreator = user.filter(user => user.id === id);
      // console.log('USERCREATOR >>>', usercreator);
      if (usercreator.length > 0) {
        return usercreator[0].lastName + ' ' + usercreator[0].firstName;
      } else {
        return '--';
      }
    };
    const projetName = id => {
      const projet = projets.filter(projet => projet.id === id);
      if (projet.length > 0) {
        return projet[0].name;
      } else {
        return '--';
      }
    };

    if (!auth.uid) return <Redirect to="/signin" />;
    if (this.props.task) {
      const {
        projet,
        name,
        desc,
        etat,
        thj,
        coutEstime,
        dev,
        elapsTime,
        createdAt,
        deadLine,
        createdBy,
      } = this.props.task;

      // for styling etat
      const colorByEtat = etat => {
        switch (etat) {
          case 'fait':
            return 1;
          case 'en cours':
            return 2;
          case 'controle qualite':
            return 3;
          default:
            return null;
        }
      };
      // console.log('auth.uid >>>', auth.uid !== createdBy);
      // console.log('thisUser role >>>', thisUser.role !== 'admin');

      if (auth.uid !== dev && thisUser.role !== 'admin') {
        return (
          <div className="card card text-dark mt-2 text-center">
            <div className="card-header">
              <h4 className="font-weight-bold">Erreur</h4>
            </div>
            <div className="card-body">
              Vous devez etre ADMIN ou createur de la tache pour visualiser
              cette page
            </div>
          </div>
        );
      } else {
        return (
          <div>
            <Modal
              ModalName="ConfirmDelete"
              ModalTitle="confirme delete"
              ModalContent="Voulez vous vraiment supprimer cette tache ?"
              ModalBtnLabel="Confime"
            />

            <div className="card text-dark mt-2">
              <div className="card-header text-center">
                <h4 className="font-weight-bold" style={{ fontSize: '2rem' }}>
                  Tache : {name}
                </h4>
                <small>Created by {userName(createdBy)}</small>
                <div className="row mt-2">
                  <div className="col">
                    <h5 className="text-center">
                      <u>Développeur assigné a la tache:</u>
                    </h5>
                  </div>
                </div>
                <div className="row">
                  <div className="col text-center font-weight-bold">
                    <div className="col-sm">{userName(dev)}</div>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-sm-6">
                    <ul className="list-group list-group-flush">
                      <Link
                        to={`/project-detail/${projet}`}
                        className="list-group-item list-group-item-action"
                      >
                        <div className="row">
                          <div className="col-sm-4">
                            <h5 className="font-weight-bold">projet:</h5>
                          </div>
                          <div
                            className="col-sm font-weight-bold"
                            style={{ textDecoration: 'underline' }}
                          >
                            {projetName(projet)}
                          </div>
                        </div>
                      </Link>
                      <li className="list-group-item">
                        <div className="row">
                          <div className="col-sm-4">
                            <h5 className="font-weight-bold">Desc:</h5>
                          </div>
                          <div className="col-sm">{desc}</div>
                        </div>
                      </li>
                      <li className="list-group-item">
                        <div className="row">
                          <div className="col-sm-4">
                            <h5 className="font-weight-bold">Créer le:</h5>
                          </div>
                          <div className="col-sm">
                            {(createdAt &&
                              moment(createdAt.toDate()).format(
                                'DD/MM/YYYY'
                              )) ||
                              '--'}
                          </div>
                        </div>
                      </li>
                      <li className="list-group-item">
                        <div className="row">
                          <div className="col-sm-4">
                            <h5 className="font-weight-bold">Date de fin :</h5>
                          </div>
                          <div className="col-sm">
                            Dans{' '}
                            <b>
                              {(deadLine &&
                                moment
                                  .duration(moment(deadLine).diff(moment()))
                                  .format('d [jour(s)]')) ||
                                '--'}{' '}
                            </b>
                          </div>
                        </div>
                      </li>
                      <li className="list-group-item">
                        <div className="row">
                          <div className="col-sm-4">
                            <h5 className="font-weight-bold">Temp de Dev :</h5>
                          </div>
                          <div className="col-sm">
                            {moment(deadLine).diff(
                              moment(createdAt.toDate()),
                              'days'
                            )}{' '}
                            jour(s)
                          </div>
                        </div>
                      </li>
                      <li className="list-group-item">
                        <div className="row">
                          <div className="col-sm-4">
                            <h5 className="font-weight-bold">
                              Cout journalié :
                            </h5>
                          </div>
                          <div className="col-sm">{thj} &euro;</div>
                        </div>
                      </li>
                      <li className="list-group-item">
                        <div className="row">
                          <div className="col-sm-4">
                            <h5 className="font-weight-bold">Cout estimé :</h5>
                          </div>
                          <div className="col-sm">
                            {coutEstime ? coutEstime : '--'} &euro;
                          </div>
                        </div>
                      </li>
                      <li
                        className={classnames('list-group-item', {
                          done: colorByEtat(etat) === 1,
                          'en-cour': colorByEtat(etat) === 2,
                          'controle-qualite': colorByEtat(etat) === 3,
                        })}
                      >
                        <div className="row">
                          <div className="col-sm-4">
                            <h5 className="font-weight-bold">Etat:</h5>
                          </div>
                          <div
                            className="col-sm font-weight-bold"
                            style={{ fontSize: '1.2rem' }}
                          >
                            {etat ? etat : 'non renseigner'}
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div className="col-sm-6 text-center">
                    <div>
                      <h4 className="font-weight-bold">
                        Temp passé sur la tache :{' '}
                        {moment
                          .duration(elapsTime, 'milliseconds')
                          .format('hh:mm:ss', { trim: false })}
                      </h4>
                    </div>
                    <div>
                      <Timer taskId={this.state.id} taskElapsTime={elapsTime} />
                    </div>
                  </div>
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item bg-light">
                    <div>
                      <h4 className="font-weight-bold text-center py-3">
                        Cout en temp de dev :{' '}
                        {Math.round((thj / 7) * (elapsTime / 1000 / 60 / 60))}{' '}
                        &euro;
                      </h4>
                    </div>
                  </li>
                </ul>

                <div className="d-flex justify-content-center mt-3">
                  <Link
                    to={`/task-edit/${this.state.id}`}
                    className="btn btn-primary mx-3"
                  >
                    Edit
                  </Link>
                  {isAdmin && (
                    <button
                      className="btn btn-danger"
                      onClick={() =>
                        this.toggleModalSuppTask(this.state.id, projet)
                      }
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      }
    } else {
      return (
        <div className="text-center">
          <strong>Loading...</strong>
          <br />
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  const tasks = state.firestore.data.Tasks;
  const task = tasks ? tasks[id] : null;
  const users = state.firestore.ordered.users;
  const projets = state.firestore.ordered.Project;
  const thisUser = state.firebase.profile;
  return {
    task: task,
    auth: state.firebase.auth,
    user: users ? users : [],
    projets: projets ? projets : [],
    thisUser: thisUser ? thisUser : null,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onDeleteTask: id => dispatch(deleteTask(id)),
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect([
    { collection: 'Tasks', orderBy: ['createdAt', 'desc'] },
    { collection: 'users', orderBy: ['lastName', 'desc'] },
    { collection: 'Project', orderBy: ['createdAt', 'desc'] },
  ])
)(TaskDetail);
