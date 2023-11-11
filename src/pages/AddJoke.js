import {useHistory} from 'react-router-dom';
import JokeForm from '../components/jokes/JokeForm'; 
import UseHttp from '../hooks/UseHttp';
import {addJoke} from '../utils/firebase-api';
import {useEffect} from 'react';

const AddJoke = () => {
    const history = useHistory();
    const {sendHttpRequest, status} = UseHttp(addJoke);

    useEffect(() => {
        if(status === 'completed'){
            history.push('/jokes');
        }
    }, [status, history]);
    
    const addJokeHandler = (jokeData) => {
        sendHttpRequest(jokeData);
        console.log(jokeData);
    }

    return (
        <JokeForm isLoading={status === 'pending'} onAddJoke={addJokeHandler}/>
    );
}

export default AddJoke;