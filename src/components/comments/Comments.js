import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import UseHttp from '../../hooks/UseHttp';
import {getComments} from '../../utils/firebase-api';
import styles from './Comments.module.css';
import NewCommentForm from './NewCommentForm';
import Loader from '../UI/Loader';
import CommentsList from './CommentsList';

const Comments = () => {

  const [isAddingComment, setIsAddingComment] = useState(false);
  const params = useParams();

  const {jokeId} = params;

  const {
    sendHttpRequest, 
    status, 
    data: loadedComments
  } = UseHttp(getComments);

  useEffect(() => {
    sendHttpRequest(jokeId);
  }, [jokeId, sendHttpRequest]);



  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };

  let comments;

  const commentAddedHandler = useCallback(() => {
    sendHttpRequest(jokeId);
  }, [jokeId, sendHttpRequest]);
  
  if(status === 'pending'){
    comments = (
      <div className="centered">
        <Loader/>
      </div>
    );
  }
  
  if(status === 'completed' && (loadedComments && loadedComments.length > 0)){
    comments = <CommentsList comments={loadedComments}/>;
  }
  
  if(status === 'completed' && (!loadedComments || loadedComments.length === 0)){
    comments = <p className="centered">this joke doesn't have comment</p>
  }

  return (
    <section className={styles.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className='btn' onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && <NewCommentForm jokeId={params.jokeId} onCommentAdded={commentAddedHandler} />}
      {comments}
    </section>
  );
};

export default Comments;
