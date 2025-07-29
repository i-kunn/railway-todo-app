import { useCallback, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './index.css';
import { fetchLists, updateList, deleteList } from '~/store/list';
import { useId } from '~/hooks/useId';
import NormalButton from '~/components/common/NormalButton';
import FormField from '~/components/common/FormField';
import TextInput from '~/components/common/TextInput';
import Modal from '~/components/common/Modal';

const EditList = () => {
  const id = useId();

  const { listId } = useParams();
  console.log('現在の listId:', listId);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [title, setTitle] = useState('');

  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const list = useSelector((state) => state.list.lists?.find((list) => list.id === listId));

  const handleClose = () => {
    // モーダルを閉じる処理
    navigate(-1);
  };

  useEffect(() => {
    if (list) {
      setTitle(list.title);
    }
  }, [list]);

  useEffect(() => {
    void dispatch(fetchLists());
  }, [listId]);

  const onSubmit = useCallback(
    (event) => {
      event.preventDefault();
      console.log('✅ 更新実行 listId:', listId);
      console.log('✅ 更新実行 title:', title);

      setIsSubmitting(true);

      void dispatch(updateList({ id: listId, title }))
        .unwrap()
        .then(() => navigate(-1))
        .catch((err) => {
          console.error('❌ 更新失敗:', err);
          setErrorMessage(err.message);
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    },
    [title, listId]
  );

  const handleDelete = useCallback(() => {
    if (!window.confirm('Are you sure you want to delete this list?')) {
      return;
    }

    setIsSubmitting(true);

    void dispatch(deleteList({ id: listId }))
      .unwrap()
      .then(() => {
        navigate(`/`);
      })

      .catch((err) => {
        setErrorMessage(err.message);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }, [dispatch, navigate, listId]);

  return (
    <Modal onClose={handleClose}>
      <main className="edit_list">
        <h2 className="edit_list__title">Edit List</h2>
        <p className="edit_list__error">{errorMessage}</p>
        <form className="edit_list__form" onSubmit={onSubmit}>
          <FormField id={`${id}-title`} label="Name" className="edit_list__form_field">
            <TextInput
              id={`${id}-title`}
              value={title}
              placeholder="Family"
              onChange={(event) => setTitle(event.target.value)}
            />
          </FormField>
          <div className="edit_list__form_actions">
            <NormalButton type="button" onClick={handleClose} data-variant="secondary">
              Cancel
            </NormalButton>
            <div className="edit_list__form_actions_spacer"></div>

            <NormalButton
              type="button"
              disabled={isSubmitting}
              onClick={handleDelete}
              className="edit_list__form_actions_delete"
            >
              Delete
            </NormalButton>
            <NormalButton type="submit" disabled={isSubmitting}>
              Update
            </NormalButton>
            <></>
          </div>
        </form>
      </main>
    </Modal>
  );
};

export default EditList;
