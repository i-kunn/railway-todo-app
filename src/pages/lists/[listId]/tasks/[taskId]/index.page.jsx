import { useCallback, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './index.css';
import { setCurrentList } from '~/store/list';
import { fetchTasks, updateTask, deleteTask } from '~/store/task';
import { useId } from '~/hooks/useId';
import TextInput from '~/components/common/TextInput';
import NormalButton from '~/components/common/NormalButton';
import TextArea from '~/components/common/TextArea';
import FormField from '~/components/common/FormField';
import Modal from '~/components/common/Modal';

const EditTask = () => {
  const id = useId();

  const { listId, taskId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [title, setTitle] = useState('');
  const [detail, setDetail] = useState('');
  const [done, setDone] = useState(false);

  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [limit, setLimit] = useState('');

  const task = useSelector((state) => state.task.tasks?.find((task) => task.id === taskId));
  const handleClose = () => {
    // モーダルを閉じる処理
    navigate(-1);
  };
  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDetail(task.detail);
      setDone(task.done);
      setLimit(task.limit ? new Date(task.limit).toISOString().slice(0, 16) : '');
    }
  }, [task]);

  useEffect(() => {
    void dispatch(setCurrentList(listId));
    void dispatch(fetchTasks());
  }, [listId]);

  const onSubmit = useCallback(
    (event) => {
      event.preventDefault();
      setIsSubmitting(true);

      const isoLimit = limit ? new Date(limit).toISOString() : null;

      void dispatch(updateTask({ id: taskId, title, detail, done, limit: isoLimit }))
        .unwrap()
        .then(() => navigate(-1))
        .catch((err) => {
          setErrorMessage(err.message);
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    },
    [title, taskId, listId, detail, done, limit]
  );

  const handleDelete = useCallback(() => {
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return;
    }

    setIsSubmitting(true);

    void dispatch(deleteTask({ id: taskId }))
      .unwrap()

      .then(() => navigate(-1))
      .catch((err) => {
        setErrorMessage(err.message);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }, [taskId]);

  return (
    <Modal onClose={handleClose}>
      <main className="edit_list">
        <h2 className="edit_list__title">Edit List</h2>
        <p className="edit_list__error">{errorMessage}</p>
        <form className="edit_list__form" onSubmit={onSubmit}>
          <FormField id={`${id}-title`} label="Title" className="edit_list__form_field">
            <TextInput
              id={`${id}-title`}
              className="app_input"
              placeholder="Buy some milk"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </FormField>
          <FormField id={`${id}-detail`} label="Description" className="edit_list__form_field">
            <TextArea
              id={`${id}-detail`}
              className="app_input"
              placeholder="Blah blah blah"
              value={detail}
              onChange={(event) => setDetail(event.target.value)}
            />
          </FormField>
          <FormField id={`${id}-done`} label="Is Done" className="edit_list__form_field">
            <div>
              <TextInput
                id={`${id}-done`}
                type="checkbox"
                checked={done}
                onChange={(event) => setDone(event.target.checked)}
              />
            </div>
          </FormField>
          <div className="edit_list__form_actions">
            <NormalButton type="button" onClick={handleClose} data-variant="secondary">
              Cancel
            </NormalButton>

            <div className="edit_list__form_actions_spacer"></div>

            <NormalButton onClick={handleDelete} disabled={isSubmitting}>
              Delete
            </NormalButton>
            <NormalButton type="submit" disabled={isSubmitting}>
              Update
            </NormalButton>
            <FormField id={`${id}-limit`} label="Deadline" className="edit_list__form_field">
              <TextInput
                id={`${id}-limit`}
                className="app_input"
                type="datetime-local"
                value={limit}
                onChange={(event) => setLimit(event.target.value)}
              />
            </FormField>
          </div>
        </form>
      </main>
    </Modal>
  );
};

export default EditTask;
