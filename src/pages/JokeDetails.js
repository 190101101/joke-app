import {Fragment, useEffect} from 'react';
import {useParams, Route, Link, useRouteMatch} from 'react-router-dom';
import Comments from '../components/comments/Comments';
import HighlightedJoke from '../components/jokes/HighlightedJoke';
import Loader from '../components/UI/Loader';
import UseHttp from '../hooks/UseHttp';
import {getJoke} from '../utils/firebase-api';

const JokeDetails = () => {
    const routeMatch = useRouteMatch();
    const params = useParams();
    const {jokeId} = params;

    const {
        sendHttpRequest, 
        status, 
        data:loadedJoke, 
        error
    } = UseHttp(getJoke, true);

    useEffect(() => {
        sendHttpRequest(jokeId);
    }, [sendHttpRequest, jokeId])

    if(status === 'pending'){
        return <div className="centered">
            <Loader/>
        </div>
    }

    if(status === 'error'){
        return <p className="centered">{error}</p>
    }

    if(status === 'error'){
        return <p className="centered">{error}</p>
    }

    if(!loadedJoke.text){
        return <h1 className="centered">шуток не найдено</h1>
    }

    return (
        <Fragment>
            <HighlightedJoke text={loadedJoke.text} topic={loadedJoke.topic}/>
            <Route path={routeMatch.path} exact>
                <div className='centered'>
                    <Link to={`${routeMatch.url}/comments`} className='btn--empty'>Show Comments</Link>
                </div>
            </Route>
            <Route path={`${routeMatch.path}/comments`}>
                <Comments/>
            </Route>
        </Fragment>
    );
}

export default JokeDetails;