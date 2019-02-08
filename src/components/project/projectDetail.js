import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

// import classnames from 'classnames';

import moment from 'moment';
import 'moment-duration-format';

import * as $ from 'jquery';

import Modal from '../layout/modal/Modal';

import { connect } from 'react-redux';
import { deleteTask } from '../../store/actions/taskAction';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

class ProjectDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
    };
  }

  toggleModalSuppTask = id => {
    $('#ConfirmDelete').modal('show');
    $('.ModalBtnConfirm')
      .off('click')
      .click(() => {
        // this.props.onDeleteTask(id);
        $('#ConfirmDelete').modal('hide');
        // this.props.history.push(`/`);
      });
  };

  render() {
    // redirect to signin in not connected
    const { auth, user, projet } = this.props;
    if (!auth.uid) return <Redirect to="/signin" />;

    const userName = id => {
      const usercreator = user.filter(user => user.id === id);
      // console.log('USERCREATOR >>>', usercreator);
      if (usercreator.length > 0) {
        return usercreator[0].lastName + ' ' + usercreator[0].firstName;
      } else {
        return '--';
      }
    };
    // const projetName = id => {
    //   const projet = projets.filter(projet => projet.id === id);
    //   if (projet.length > 0) {
    //     return projet[0].name;
    //   } else {
    //     return '--';
    //   }
    // };

    if (projet) {
      const {
        name,
        desc,
        // etat,
        budget,
        createdBy,
        deadLine,
        createdAt,
      } = projet;

      // for styling etat
      //   const colorByEtat = etat => {
      //     switch (etat) {
      //       case 'fait':
      //         return 1;
      //       case 'en cour':
      //         return 2;
      //       case 'controle qualite':
      //         return 3;
      //       default:
      //         return null;
      //     }
      //   };

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
              <small>Created by {userName(createdBy)}</small>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-sm-6">
                  <ul className="list-group list-group-flush">
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
                            moment(createdAt.toDate()).format('DD/MM/YYYY')) ||
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

                    {/* <li
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
                    </li> */}

                    <li className="list-group-item">
                      <div className="row">
                        <div className="col-sm-4">
                          <h5 className="font-weight-bold">Budget:</h5>
                        </div>
                        <div className="col-sm">{budget} &euro;</div>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="col-sm-6 text-center">
                  <h2>Temp total passer sur le projet</h2>
                </div>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item bg-light">
                  <div>
                    <h4 className="font-weight-bold text-center py-3">
                      Sommes investies :
                      {/* {' '}
                      {Math.round((thj / 7) * (elapsTime / 1000 / 60 / 60))}{' '}
                      &euro; */}
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
                <button
                  className="btn btn-danger"
                  onClick={() => this.toggleModalSuppTask(this.state.id)}
                >
                  Delete
                </button>
              </div>
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
  const id = ownProps.match.params.id;

  const tasks = state.firestore.data.Tasks;
  const users = state.firestore.ordered.users;
  const projets = state.firestore.ordered.Project;

  let projetSel;
  if (projets) {
    projetSel = projets.filter(proj => proj.id === id);
  } else {
    projetSel = [];
  }

  return {
    tasks: tasks ? tasks : [],
    auth: state.firebase.auth,
    user: users ? users : [],
    projet: projetSel[0],
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
)(ProjectDetail);
