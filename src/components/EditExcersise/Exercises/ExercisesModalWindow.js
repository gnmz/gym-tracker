import React, { Component } from "react";
import CloseIcon from "@material-ui/icons/Close";
import "./ExercisesModalWindow.css";

export class ExercisesModalWindow extends Component {
  render() {
    const {
      isOpenModal,
      currentTitle,
      closeModalWindow,
      activateEditTitle,
      activateDeleteExercises,
      isEditTitle,
      isDeleteExercises,
      newTitle,
      getNewTitle,
      saveNewTitle,
      stopEditTitle,
      currentCategory,
      removeExercises,
      stopDeleteExercises,
    } = this.props;
    return (
      <>
        {!isOpenModal ? null : (
          <div className="exercises-edit-modal">
            <div className="exercises-edit-modal__header">
              <div className="exercises-edit-modal__title">
                <h4>Редактировать упражнение:</h4>
                <h4> {currentTitle}</h4>
              </div>

              <button
                className="exercises-edit-modal__close"
                onClick={closeModalWindow}
              >
                <CloseIcon />
              </button>
            </div>
            <div className="exercises-edit-modal__actions">
              <button
                className="exercises-edit-modal__actions-rename"
                onClick={activateEditTitle}
              >
                Изменить название
              </button>
              <button
                className="exercises-edit-modal__actions-remove"
                onClick={activateDeleteExercises}
              >
                Удалить
              </button>
            </div>
            {isEditTitle ? (
              <div className="exercises-edit-modal__rename">
                <input
                  type="text"
                  className="exercises-edit-modal__rename-input"
                  value={newTitle}
                  onChange={getNewTitle}
                />
                {newTitle.length >= 4 ? (
                  <div className="exercises-edit-modal__rename-title">
                    <h5 className="exercises-edit-modal__rename-title-item">
                      Переименовать упраженение:
                    </h5>
                    <h5 className="exercises-edit-modal__rename-title-item">
                      {currentTitle} в {newTitle}
                    </h5>
                  </div>
                ) : null}
                <div className="exercises-edit-modal__rename-btns">
                  <button
                    className="exercises-edit-modal__rename-btn-yes"
                    disabled={newTitle.length < 4}
                    onClick={saveNewTitle}
                  >
                    Да
                  </button>
                  <button
                    className="exercises-edit-modal__rename-btn-no"
                    onClick={stopEditTitle}
                  >
                    Нет
                  </button>
                </div>
              </div>
            ) : null}
            {isDeleteExercises ? (
              <div className="exercises-edit-modal__remove">
                <div className="exercises-edit-modal__remove-title">
                  <h5 className="exercises-edit-modal__remove-title-item">
                    Вы собираетесь удалить упражнение:
                  </h5>
                  <h5 className="exercises-edit-modal__remove-title-item">
                    {currentTitle} из категории {currentCategory}
                  </h5>
                </div>

                <div className="exercises-edit-modal__remove-btns">
                  <button
                    className="exercises-edit-modal__remove-btn-yes"
                    onClick={removeExercises}
                  >
                    Да
                  </button>
                  <button
                    className="exercises-edit-modal__remove-btn-no"
                    onClick={stopDeleteExercises}
                  >
                    Нет
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        )}
      </>
    );
  }
}

export default ExercisesModalWindow;
