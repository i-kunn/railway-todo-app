import { useState, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { PencilIcon } from '~/icons/PencilIcon';
import { CheckIcon } from '~/icons/CheckIcon';
import { updateTask } from '~/store/task';
import './TaskItem.css';
import PropTypes from 'prop-types';
import NormalButton from '~/components/common/NormalButton';
import { useNavigate, useLocation } from 'react-router-dom';

const TaskItem = ({ task }) => {
  const dispatch = useDispatch();
  const { listId } = useParams();
  const { id, title, detail, done } = task;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const handleEdit = () => {
    navigate(`/lists/${listId}/tasks/${id}`, {
      state: { backgroundLocation: location },
    });
  };

  const handleToggle = useCallback(() => {
    setIsSubmitting(true);
    void dispatch(updateTask({ id, done: !done })).finally(() => {
      setIsSubmitting(false);
    });
  }, [id, done]);
  // ヘッダー付近に追加
  const getTimeLeft = (limit) => {
    if (!limit) return null;

    const now = new Date();
    const deadline = new Date(limit);
    const diff = deadline.getTime() - now.getTime();

    if (diff <= 0) return '期限切れ';

    const minutes = Math.floor(diff / 1000 / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `残り ${days}日`;
    if (hours > 0) return `残り ${hours}時間`;
    return `残り ${minutes}分`;
  };

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
        <NormalButton onClick={handleEdit} className="task_item__title_action">
          <PencilIcon aria-label="Edit" />
        </NormalButton>
        {/* <Link to={`/lists/${listId}/tasks/${id}`} className="task_item__title_action"> */}
        {/* <PencilIcon aria-label="Edit" />
        </Link> */}
      </div>
      <div className="task_item__detail">{detail}</div>
      {/* <div className="task_item__due">期限: {new Date(task.limit).toLocaleDateString()}</div> */}
      <div className="task_item__due">
        期限:{' '}
        {task.limit
          ? new Date(task.limit).toLocaleString('ja-JP', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
            })
          : '未設定'}
        <br />
        {getTimeLeft(task.limit)}
      </div>
    </div>
  );
};

TaskItem.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    detail: PropTypes.string,
    done: PropTypes.bool.isRequired,
    limit: PropTypes.string,
  }).isRequired,
};

export default TaskItem;
