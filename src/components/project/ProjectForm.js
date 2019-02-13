import React from 'react';
import classnames from 'classnames';
import { withRouter } from 'react-router-dom';
import moment from 'moment';

const ProjectForm = props => {
  return (
    <form onSubmit={props.handleOnSubmit}>
      <div className="form-group text-dark px-4">
        <label htmlFor="projectName">Project Name</label>
        <input
          type="text"
          autoComplete="Project name"
          className={classnames('form-control', {
            'is-invalid': props.errors.name,
          })}
          name="name"
          id="projectName"
          onChange={props.handleOnChange}
          placeholder="Enter project name..."
          defaultValue={props.valueName}
        />
        {props.errors.name && (
          <div className="invalid-feedback">{props.errors.name}</div>
        )}
      </div>
      <div className="form-group text-dark px-4">
        <label htmlFor="projectDescription">Project Description</label>
        <textarea
          type="text"
          autoComplete="projet description"
          className={classnames('form-control', {
            'is-invalid': props.errors.desc,
          })}
          name="desc"
          id="projectDescription"
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
          min={moment().format('YYYY-MM-DD')}
          onChange={props.handleOnChange}
          placeholder="Entrer la date de fin"
          defaultValue={props.valueDeadLine}
        />
        {props.errors.deadLine && (
          <div className="invalid-feedback">{props.errors.deadLine}</div>
        )}
      </div>

      <div className="form-group text-dark px-4">
        <label htmlFor="projectBudget">Budget alouer</label>
        <input
          type="text"
          autoComplete="projet budget"
          className={classnames('form-control', {
            'is-invalid': props.errors.budget,
          })}
          name="budget"
          id="projectBudget"
          onChange={props.handleOnChange}
          placeholder="Entrer le budget alouer..."
          defaultValue={props.valueBuget}
        />
        {props.errors.budget && (
          <div className="invalid-feedback">{props.errors.budget}</div>
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
export default withRouter(ProjectForm);
