import { useState, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { PencilIcon } from '~/icons/PencilIcon';
import { CheckIcon } from '~/icons/CheckIcon';
import { updateTask } from '~/store/task';
import './TaskItem.css';
import PropTypes from 'prop-types';
import NormalButton from '~/components/common/NormalButton';

const TaskItem = ({ task }) => {
  const dispatch = useDispatch();
  const { listId } = useParams();
  const { id, title, detail, done } = task;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleToggle = useCallback(() => {
    setIsSubmitting(true);
    void dispatch(updateTask({ id, done: !done })).finally(() => {
      setIsSubmitting(false);
    });
  }, [id, done]);

  return (
    <div className="task_item">
      <div className="task_item__title_container">
        <NormalButton
          onClick={handleToggle}
          disabled={isSubmitting}
          className="task__item__mark_button"
        >
          {done ? (
            <div className="task_item__mark____complete" aria-label="Completed">
              <CheckIcon className="task_item__mark____complete_check" />
            </div>
          ) : (
            <div className="task_item__mark____incomplete" aria-label="Incomplete"></div>
          )}
        </NormalButton>
        <div className="task_item__title" data-done={done}>
          {title}
        </div>
        <div aria-hidden className="task_item__title_spacer"></div>
        <Link to={`/lists/${listId}/tasks/${id}`} className="task_item__title_action">
          <PencilIcon aria-label="Edit" />
        </Link>
      </div>
      <div className="task_item__detail">{detail}</div>
    </div>
  );
};

TaskItem.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    detail: PropTypes.string,
    done: PropTypes.bool.isRequired,
  }).isRequired,
};

export default TaskItem;
