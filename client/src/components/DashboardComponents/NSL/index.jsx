import { Link } from 'react-router-dom';
import '../dashboardTasks.css';

export default function NeedsSkillLevel() {
  return (
    <div className="containerBorder">
      <div className="messageContainer">
        <h1 className="messageTitle">
          You have not set your <strong className="messageTitle">skill level</strong> yet.
        </h1>
        <p className="messageContent">
          Please go to <Link className="messageContent">User Profile</Link> and fill your <strong className="messageContent">skill level</strong> field.
        </p>
      </div>
    </div>
  )
}
