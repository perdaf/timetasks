import React from 'react';
import classnames from 'classnames';
import { withRouter } from 'react-router-dom';

const TaskForm = props => {
  let adminAndCrea = false;
  if (props.isAdmin && props.crea) {
    adminAndCrea = true;
  }
  console.log('FORM props.idProj >>>', props.idProj);
  return (
    <form onSubmit={props.handleOnSubmit}>
      {props.crea && (
        <div className="form-group text-dark px-4">
          <label htmlFor="projet">Projet assigner à la tache :</label>
          <select
            type="text"
            autoComplete="dev assigné"
            className={classnames('form-control', {
              'is-invalid': props.errors.projet,
            })}
            name="projet"
            id="projet"
            onChange={props.handleOnChange}
            // value={props.idProj ? props.idProj : ''}
            defaultValue={props.idProj ? props.idProj : ''}
          >
            <option>---</option>
            {props.projects.map((item, index) => {
              return (
                <option key={index} value={item.id}>
                  {item.name}
                </option>
              );
            })}
          </select>
          {props.errors.projet && (
            <div className="invalid-feedback">{props.errors.projet}</div>
          )}
        </div>
      )}

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

      {adminAndCrea && (
        <div className="form-group text-dark px-4">
          <label htmlFor="dev">Developpeur assigner à la tache :</label>
          <select
            type="text"
            autoComplete="dev assigné"
            className={classnames('form-control', {
              'is-invalid': props.errors.dev,
            })}
            name="dev"
            id="dev"
            onChange={props.handleOnChange}
            // placeholder="Enter l'etat"
            // defaultValue={props.valueDev}
          >
            <option>---</option>
            {props.dev.map((item, index) => {
              return (
                <option key={index} value={item.id}>
                  {item.name + ' ' + item.prenom} -- {item.thj} &euro;
                </option>
              );
            })}
          </select>
          {props.errors.dev && (
            <div className="invalid-feedback">{props.errors.dev}</div>
          )}
        </div>
      )}

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
      {!props.crea && (
        <div className="form-group text-dark px-4">
          <label htmlFor="etat">Etat :</label>
          <select
            type="text"
            autoComplete="task etat"
            className={classnames('form-control', {
              'is-invalid': props.errors.etat,
            })}
            name="etat"
            id="etat"
            onChange={props.handleOnChange}
            placeholder="Enter l'etat"
            defaultValue={props.valueEtat}
          >
            <option>---</option>
            <option value="en cour">En cour</option>
            <option value="controle qualite">Controle qualité</option>
            <option value="fait">fait</option>
          </select>
          {props.errors.etat && (
            <div className="invalid-feedback">{props.errors.etat}</div>
          )}
        </div>
      )}

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
