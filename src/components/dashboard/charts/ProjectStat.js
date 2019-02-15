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
    this.setState({
      projetListe: this.props.projets,
      taskListe: this.props.tasks,
    });
  }
  componentWillUpdate(oldProps) {
    const newProps = this.props;
    if (newProps !== oldProps) {
      this.setState({
        projetListe: newProps.projets,
        taskListe: newProps.tasks,
      });
    }
  }
  render() {
    console.log('this state >>>', this.state);
    const { projetListe, taskListe } = this.state;

    let taches = [];
    let deadlines = [];
    let percentRea = [];

    if (projetListe !== null && taskListe !== null) {
    }

    taches = ['tache 001', 'tache 002', 'tache 003'];
    deadlines = ['2019-02-22', '2019-03-01', '2019-03-06'];
    percentRea = [45, 25, 87];

    let data = taches.map((element, index) => ({
      x: moment(deadlines[index]).valueOf(),
      y: percentRea[index],
      label: element,
    }));

    return (
      <div>
        <div className="card text-center">
          <div className="card-header">
            <h3>stat of proj</h3>
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
                  showLine: true,
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
                        tooltipItem.datasetIndex
                      ].label +
                        ' ' +
                        tooltipItem.yLabel +
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
