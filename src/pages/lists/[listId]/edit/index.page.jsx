import { useCallback, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { BackButton } from '~/components/BackButton';
import './index.css';
import { fetchLists, updateList, deleteList } from '~/store/list';
import { useId } from '~/hooks/useId';
import LinkButton from '~/components/common/LinkButton';
import NormalButton from '~/components/common/NormalButton';
import FormField from '~/components/common/FormField';
import TextInput from '~/components/common/TextInput';

const EditList = () => {
  const id = useId();

  const { listId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [title, setTitle] = useState('');

  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const list = useSelector((state) => state.list.lists?.find((list) => list.id === listId));

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

      setIsSubmitting(true);

      void dispatch(updateList({ id: listId, title }))
        .unwrap()
        .then(() => {
          navigate(`/lists/${listId}`);
        })
        .catch((err) => {
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
  }, []);

  return (
    <main className="edit_list">
      <BackButton />
      <h2 className="edit_list__title">Edit List</h2>
      <p className="edit_list__error">{errorMessage}</p>
      <form className="edit_list__form" onSubmit={onSubmit}>
        <FormField id={`${id}-title`} label="Name" className="edit_list__form_field">
          <TextInput
            value={title}
            placeholder="Family"
            onChange={(event) => setTitle(event.target.value)}
          />
        </FormField>
        <div className="edit_list__form_actions">
          <LinkButton to="/" data-variant="secondary">
            Cancel
          </LinkButton>
          <div className="edit_list__form_actions_spacer"></div>

          <NormalButton
            type="button"
            disabled={isSubmitting}
            onClick={handleDelete}
            className="edit_list__form_actions_delete"
          >
            Delete
          </NormalButton>
          <NormalButton  type="submit" disabled={isSubmitting}>Update</NormalButton>
        </div>
      </form>
    </main>
  );
};

export default EditList;
