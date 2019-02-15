import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import moment from 'moment';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

class ProjectStat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      projetListe: '',
      taskListe: '',
    };
  }

  componentDidMount() {
    this.setState(
      {
        ...this.state,
        projetListe: this.props.projets,
        taskListe: this.props.tasks,
      },
      () => {
        // console.log('MOUNT DONE >>>', this.state);
      }
    );
  }
  componentDidUpdate(oldProps) {
    // console.log('UPDATE STATE >>>', this.state);
    const newProps = this.props;
    // console.log('old props >>>', oldProps);
    // console.log('new props >>>', newProps);
    if (newProps !== oldProps) {
      this.setState(
        {
          ...this.state,
          projetListe: newProps.projets,
          taskListe: newProps.tasks,
        },
        () => {
          // console.log('UPDATE DONE >>>', this.state);
        }
      );
    }
  }
  render() {
    // console.log('this state >>>', this.state);
    const { projetListe, taskListe } = this.state;

    let taches = [];
    let deadlines = [];
    let percentRea = [];

    if (projetListe && taskListe) {
      projetListe.forEach((el, index) => {
        taches.push(el.name);
        deadlines.push(el.deadLine);

        const { tasks } = el;

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

        if (taskInProject !== null && taskListe) {
          taskInProject.forEach(element => {
            // recherche des infos task(en selectionant la bonne tasks de la bdd)
            // pour les tasks du projet
            let task = null;
            taskListe.forEach(item => {
              if (item.id === element) {
                task = item;
              }
            });

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
          });
        }
        percentRea.push((nbTacheRea / nbTasks) * 100 || 0);
      });
    }

    let data = taches.map((element, index) => ({
      x: moment(deadlines[index]).valueOf(),
      y: percentRea[index],
      label: element,
    }));

    if (projetListe !== null && taskListe !== null) {
      return (
        <div>
          <div className="card text-center">
            <div className="card-header">
              <h3>Evolution par projet</h3>
            </div>
            <div className="card-body" />
            <Line
              data={{
                // labels: taches,
                datasets: [
                  {
                    label: 'projects',
                    data: data,
                    pointRadius: 5,
                    pointHoverRadius: 5,
                    pointBackgroundColor: '#b33414',
                    fill: false,
                    tension: 0.2,
                    showLine: false,
                    borderColor: '#282b34',
                  },
                ],
              }}
              options={{
                legend: {
                  display: false,
                },
                tooltips: {
                  callbacks: {
                    label: function(tooltipItem, data) {
                      var label =
                        data.datasets[tooltipItem.datasetIndex].data[
                          tooltipItem.index
                        ].label +
                          ' ' +
                          Math.round(tooltipItem.yLabel) +
                          '%' || '';
                      return label;
                    },
                  },
                },
                scales: {
                  xAxes: [
                    {
                      type: 'time',
                      // position: 'bottom',
                      distribution: 'linear',
                      scaleLabel: {
                        display: true,
                        labelString: 'Deadline',
                      },
                      ticks: {
                        beginAtZero: false,
                      },
                      time: {
                        reverse: true,
                        min: moment(),
                        // max: moment('2019-03-06'),
                        displayFormats: {
                          week: 'll',
                        },
                        // unit: 'month',
                      },
                    },
                  ],
                  yAxes: [
                    {
                      type: 'linear',
                      position: 'left',
                      scaleLabel: {
                        display: true,
                        labelString: '% of product',
                      },
                      ticks: {
                        // stepSize: 30 * 60,
                        beginAtZero: false,
                        min: 0,
                        max: 100,
                      },
                    },
                  ],
                },
              }}
              // width={100}
              // height={50}
            />
          </div>
        </div>
      );
    } else {
      return (
        <div className="text-center text-light">
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

const mapStateToProps = state => {
  // console.log('STATE >>>', state);
  let projs;
  let tsk;

  try {
    tsk = state.firestore.ordered.Tasks;
    projs = state.firestore.ordered.Project;
  } catch (err) {
    console.error(err);
  }

  return {
    auth: state.firebase.auth,
    projets: projs ? projs : null,
    tasks: tsk ? tsk : null,
  };
};

export default compose(
  firestoreConnect([
    { collection: 'Project', orderBy: ['createdAt', 'desc'] },
    { collection: 'Tasks', orderBy: ['createdAt', 'desc'] },
  ]),
  connect(mapStateToProps)
)(ProjectStat);
