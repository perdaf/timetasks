import React from 'react';
import classnames from 'classnames';
import { withRouter } from 'react-router-dom';

const TaskForm = props => {
  return (
    <form onSubmit={props.handleOnSubmit}>
      <div className="form-group text-dark px-4">
        <label htmlFor="taskName">Task Name</label>
        <input
          type="text"
          autoComplete="Task name"
          className={classnames('form-control', {
            'is-invalid': props.errors.name,
          })}
          name="name"
          id="taskName"
          onChange={props.handleOnChange}
          placeholder="Enter task name..."
          defaultValue={props.valueName}
        />
        {props.errors.name && (
          <div className="invalid-feedback">{props.errors.name}</div>
        )}
      </div>
      <div className="form-group text-dark px-4">
        <label htmlFor="taskDescription">task Description</label>
        <textarea
          type="text"
          autoComplete="task description"
          className={classnames('form-control', {
            'is-invalid': props.errors.desc,
          })}
          name="desc"
          id="taskDescription"
          onChange={props.handleOnChange}
          placeholder="Enter description..."
          defaultValue={props.valueDesc}
        />
        {props.errors.desc && (
          <div className="invalid-feedback">{props.errors.desc}</div>
        )}
      </div>
      <div className="form-group text-dark px-4">
        <label htmlFor="deadLine">Date de fin</label>
        <input
          type="date"
          autoComplete="date de fin"
          className={classnames('form-control', {
            'is-invalid': props.errors.deadLine,
          })}
          name="deadLine"
          id="deadLine"
          onChange={props.handleOnChange}
          placeholder="Entrer la date de fin"
          defaultValue={props.valueDeadLine}
        />
        {props.errors.deadLine && (
          <div className="invalid-feedback">{props.errors.deadLine}</div>
        )}
      </div>
      <div className="form-group text-dark px-4">
        <label htmlFor="taskDescription">Taux Horaire Journalier</label>
        <input
          type="text"
          autoComplete="Taux Horaire journalier"
          className="form-control"
          name="thj"
          id="tauxHoraireJournalier"
          onChange={props.handleOnChange}
          placeholder="Entrer votre taux horaire journalier..."
          defaultValue={props.valueThj}
        />
        {props.errors.desc && (
          <div className="invalid-feedback">{props.errors.desc}</div>
        )}
      </div>
      <div className="form-group d-flex justify-content-center">
        <input
          type="submit"
          value="Enregistrer"
          className="btn btn-primary mb-3"
        />
        <input
          type="button"
          className="btn btn-info mb-3 mx-3"
          value="Annuler"
          onClick={() => props.history.goBack()}
        />
      </div>
    </form>
  );
};
export default withRouter(TaskForm);
