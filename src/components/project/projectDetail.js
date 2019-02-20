import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import '../../scss/index.scss';
import './project.scss';

import moment from 'moment';
import 'moment-duration-format';
import classnames from 'classnames';

import * as $ from 'jquery';

import Modal from '../layout/modal/Modal';

import { connect } from 'react-redux';
import { deleteProject } from '../../store/actions/projectAction';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

class ProjectDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      projet: '',
      tasksArr: '',
      taskInProj: '',
    };
  }

  componentDidMount() {
    this.setState(
      {
        ...this.state,
        projet: this.props.projet,
        tasksArr: this.props.tasksArr,
        taskInProj: this.props.taskInProj,
      },
      () => {
        // console.log('STATE MOUNT>>>', this.state);
      }
    );
  }

  componentDidUpdate(oldProps) {
    const newProps = this.props;
    if (oldProps !== newProps) {
      this.setState(
        {
          ...this.state,
          projet: newProps.projet,
          tasksArr: newProps.tasksArr,
          taskInProj: newProps.taskInProj,
        },
        () => {
          // console.log('STATE UPDATE >>>', this.state);
        }
      );
    }
  }

  toggleModalSuppTask = id => {
    $('#ConfirmDelete').modal('show');
    $('.ModalBtnConfirm')
      .off('click')
      .click(() => {
        this.props.onDeleteProject(id);
        $('#ConfirmDelete').modal('hide');
        this.props.history.push(`/projects-page`);
      });
  };

  render() {
    // redirect to signin in not connected
    const { auth, user, thisUser } = this.props;
    const { projet, tasksArr } = this.state;

    if (!auth.uid) return <Redirect to="/signin" />;

    // for styling tasks by etat
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
    //for styling progress bar by percent
    const colorBarByPercent = percent => {
      if (percent >= 0 && percent < 25) {
        return 1;
      } else if (percent >= 25 && percent < 50) {
        return 2;
      } else if (percent >= 50 && percent < 75) {
        return 3;
      } else if (percent >= 75 && percent <= 99) {
        return 4;
      } else if (percent === 100) {
        return 5;
      }
    };

    const userName = id => {
      const usercreator = user.filter(user => user.id === id);
      if (usercreator.length > 0) {
        return usercreator[0].lastName + ' ' + usercreator[0].firstName;
      } else {
        return '--';
      }
    };

    let isAdmin = false;
    if (thisUser.role === 'admin') {
      isAdmin = true;
    }

    let taskInProjet = [];
    let coutProj = 0;
    let timeProj = 0;

    if (projet) {
      const {
        id,
        name,
        desc,
        budget,
        createdBy,
        startAt,
        deadLine,
        createdAt,
        tasks,
      } = projet;

      // apres supression d'une tache le projet garde en Tasks un doublon
      // ici on elimine les doublons pour un affichage correct
      let tskInP;
      if (tasks.length > 0) {
        tskInP = Array.from(new Set(tasks.map(item => item.name)));
      } else {
        tskInP = [];
      }

      // variable pour le % d'avencement du projet
      const nbTasks = tskInP ? tskInP.length : 0;
      let nbTacheRea = 0;

      // detect si tskInP es vide si oui remplace par un tableau vide
      const taskInProject = tskInP.length > 0 ? tskInP : [];

      if (taskInProject !== null && tasksArr) {
        taskInProject.forEach(element => {
          // recherche des infos task(en selectionant la bonne tasks de la bdd)
          // pour les tasks du projet
          let task = null;
          tasksArr.forEach(item => {
            if (item.id === element) {
              task = item;
            }
          });
          // push des infos dans un array
          if (task !== null) {
            taskInProjet.push({
              id: task.id,
              name: task.name,
              desc: task.desc,
              etat: task.etat,
              createdBy: task.createdBy,
              dev: task.dev,
            });
            // add de chaque couts pour le cout total
            if (task.coutEstime) {
              coutProj += task.coutEstime;
            }
            // add des tps de chaque taches
            timeProj += task.elapsTime;

            // pour le calcule du % de tache realiser
            switch (task.etat) {
              case 'en cours':
                nbTacheRea += 0;
                return nbTacheRea;
              case 'controle qualite':
                nbTacheRea += 0.5;
                return nbTacheRea;
              case 'fait':
                nbTacheRea += 1;
                return nbTacheRea;
              default:
                nbTacheRea += 0;
                return nbTacheRea;
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
        });
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

      const perceOfProj = (nbTacheRea / nbTasks) * 100;
      // console.log('pourcentage : >>>', perceOfProj);
      return (
        <div>
          <Modal
            ModalName="ConfirmDelete"
            ModalTitle="confirme delete"
            ModalContent="Voulez vous vraiment supprimer ce projet ?"
            ModalBtnLabel="Confime"
          />

          <div className="card text-dark mt-2">
            <div className="card-header text-center">
              <h4 className="font-weight-bold" style={{ fontSize: '2rem' }}>
                {name}
              </h4>
              <small>
                Created by {userName(createdBy)} le{' '}
                {(createdAt &&
                  moment(createdAt.toDate()).format('DD/MM/YYYY')) ||
                  '--'}
              </small>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-sm-6">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                      <div className="row">
                        <div className="col-sm-5">
                          <h5 className="font-weight-bold">Desc:</h5>
                        </div>
                        <div className="col-sm">{desc}</div>
                      </div>
                    </li>

                    {/* <li className="list-group-item">
                      <div className="row">
                        <div className="col-sm-5">
                          <h5 className="font-weight-bold">Créer le:</h5>
                        </div>
                        <div className="col-sm">
                          {(createdAt &&
                            moment(createdAt.toDate()).format('DD/MM/YYYY')) ||
                            '--'}
                        </div>
                      </div>
                    </li> */}

                    <li className="list-group-item">
                      <div className="row">
                        <div className="col-sm-5">
                          <h5 className="font-weight-bold">Date de debut :</h5>
                        </div>
                        <div className="col-sm">
                          {(startAt && moment(startAt).format('DD/MM/YYYY')) ||
                            '--'}
                        </div>
                      </div>
                    </li>

                    <li className="list-group-item">
                      <div className="row">
                        <div className="col-sm-5">
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
                    {isAdmin && (
                      <li className="list-group-item">
                        <div className="row">
                          <div className="col-sm-5">
                            <h5 className="font-weight-bold">Budget:</h5>
                          </div>
                          <div className="col-sm">{budget} &euro;</div>
                        </div>
                      </li>
                    )}
                  </ul>
                </div>
                <div className="col-sm-6 text-center">
                  <h4 className="mb-3">Liste des taches :</h4>
                  {taskInProjet.map((tsk, index) => {
                    return (
                      <Link
                        to={`/task-detail/${tsk.id}`}
                        key={index}
                        className={classnames(
                          'list-group-item list-group-item-action mb-1',
                          {
                            done: colorByEtat(tsk.etat) === 1,
                            'en-cour': colorByEtat(tsk.etat) === 2,
                            'controle-qualite': colorByEtat(tsk.etat) === 3,
                            'disable-link': !isAdmin && auth.uid !== tsk.dev,
                          }
                        )}
                      >
                        <div className="row">
                          <div className="col-4 d-flex align-items-start text-truncate">
                            <b>name :</b>&nbsp;{tsk.name}
                          </div>
                          <div className="col-4 d-flex align-items-start text-truncate">
                            <b>desc :</b>&nbsp;{tsk.desc}
                          </div>
                          <div className="col-4 d-flex align-items-start text-truncate">
                            <b>etat :</b>&nbsp;{tsk.etat}
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                  <div className="row">
                    <div className="col">
                      <Link
                        to={`/add-task/${id}`}
                        className="btn btn-info mt-3"
                      >
                        Ajouter une tache
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <h2 className="mr-3 text-center">% d'avancement du projet :</h2>
              <div className="progress" style={{ height: '30px' }}>
                <div
                  className={classnames('progress-bar', {
                    red: colorBarByPercent(perceOfProj) === 1,
                    reddish: colorBarByPercent(perceOfProj) === 2,
                    orange: colorBarByPercent(perceOfProj) === 3,
                    yellow: colorBarByPercent(perceOfProj) === 4,
                    green: colorBarByPercent(perceOfProj) === 5,
                  })}
                  role="progressbar"
                  style={{ width: `${perceOfProj}%` }}
                  aria-valuenow={{ perceOfProj }}
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  <h5 style={{ paddingTop: '8px' }}>
                    {Math.round(perceOfProj) || 0} %
                  </h5>
                </div>
              </div>
              {isAdmin && (
                <div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item bg-light">
                      <div className="row">
                        <div className="col-6 text-center">
                          <h4>
                            Temp total passer sur le projet :{' '}
                            <b>
                              {moment
                                .duration(timeProj, 'milliseconds')
                                .format('hh:mm:ss', { trim: false })}
                            </b>
                          </h4>
                        </div>
                        <div className="col-6 text-center">
                          <h4>
                            Couts estimé du projet : <b>{coutProj} &euro;</b>
                          </h4>
                        </div>
                      </div>
                    </li>
                  </ul>

                  <div className="d-flex justify-content-center mt-3">
                    <Link
                      to={`/project-edit/${this.state.id}`}
                      className="btn btn-primary mx-3"
                    >
                      Edit
                    </Link>
                    <button
                      className="btn btn-danger"
                      onClick={() => this.toggleModalSuppTask(this.state.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      );
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
  let id;
  let tasksListe;
  let users;
  let projets;
  let projetSel;
  let thisUser;

  try {
    id = ownProps.match.params.id;
    tasksListe = state.firestore.ordered.Tasks;
    users = state.firestore.ordered.users;
    projets = state.firestore.ordered.Project;
    thisUser = state.firebase.profile;

    if (projets) {
      projetSel = projets.filter(proj => proj.id === id);
    } else {
      projetSel = null;
    }
  } catch (err) {
    console.error(err);
  }

  return {
    tasksArr: tasksListe ? tasksListe : null,
    auth: state.firebase.auth,
    user: users ? users : null,
    thisUser: thisUser ? thisUser : null,
    projet: projets ? projetSel[0] : null,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onDeleteProject: id => dispatch(deleteProject(id)),
  };
};

export default compose(
  firestoreConnect([
    { collection: 'Tasks', orderBy: ['createdAt', 'desc'] },
    { collection: 'users', orderBy: ['lastName', 'desc'] },
    { collection: 'Project', orderBy: ['createdAt', 'desc'] },
  ]),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(ProjectDetail);
