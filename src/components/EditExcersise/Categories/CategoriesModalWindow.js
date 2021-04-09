import React, { Component } from "react";
import CloseIcon from "@material-ui/icons/Close";

import "./CategoriesModalWindow.css";

export class CategoriesModalWindow extends Component {
  state = {};
  render() {
    const {
      activateEditTitleCategory,
      activateDeleteCategory,
      isEditTitle,
      newCategoryName,
      getNewCategoryName,
      renameCategoryName,
      stopDeleteCategory,
      stopEditTitleCategory,
      deleteCategory,
      isDeleteCategory,
      chooseCategoryName,
      isOpenModal,
      closeModalWindow,
    } = this.props;

    return (
      <>
        {!isOpenModal ? null : (
          <div className="categories-modal">
            <div className="categories-modal-header">
              <div className="categories-modal-header__title">
                <h4>Редактировать категорию:</h4>
                <h4>{chooseCategoryName}</h4>
              </div>
              <button
                className="categories-modal__close"
                onClick={closeModalWindow}
              >
                <CloseIcon />
              </button>
            </div>
            <div className="categories-modal__actions">
              <button
                className="categories-modal__actions-rename"
                onClick={activateEditTitleCategory}
              >
                Изменить название
              </button>
              <button
                className="categories-modal__actions-remove"
                onClick={activateDeleteCategory}
              >
                Удалить
              </button>
            </div>
            {isEditTitle ? (
              <div className="categories-modal__rename">
                <input
                  className="categories-modal__rename-input"
                  type="text"
                  value={newCategoryName}
                  onChange={getNewCategoryName}
                />
                {newCategoryName.length > 4 ? (
                  <div className="categories-modal__rename-title">
                    <h5 className="categories-modal__rename-title-item">
                      Переименовать категорию:
                    </h5>
                    <h5 className="categories-modal__rename-title-item">
                      {chooseCategoryName} в {newCategoryName} ?
                    </h5>
                  </div>
                ) : null}
                <div className="categories-modal__rename-btns">
                  <button
                    className="categories-modal__rename-btn-yes"
                    onClick={renameCategoryName}
                    disabled={newCategoryName.length <= 0}
                  >
                    Да
                  </button>
                  <button
                    className="categories-modal__rename-btn-no"
                    onClick={stopEditTitleCategory}
                  >
                    Нет
                  </button>
                </div>
              </div>
            ) : null}
            {isDeleteCategory ? (
              <div className="categories-modal__remove">
                <div className="categories-modal__remove-title">
                  <h5 className="categories-modal__remove-title-item">
                    Удалить категорию {chooseCategoryName}?
                  </h5>
                  <h5 className="categories-modal__remove-title-item">
                    Если Вы удалите категорию все упраженения связанные с
                    выбранной категорией так же удалятся
                  </h5>
                </div>
                <div className="categories-modal_remove-btns">
                  <button
                    className="categories-modal_remove-btn-yes"
                    onClick={deleteCategory}
                  >
                    Да
                  </button>
                  <button
                    className="categories-modal_remove-btn-no"
                    onClick={stopDeleteCategory}
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

export default CategoriesModalWindow;
