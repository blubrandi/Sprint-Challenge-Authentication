import React from 'react'
import axios from 'axios'

import requiresAuth from './requiresAuth'

class Jokes extends React.Component {
    state = {
        jokes: []
    }

    render() {

        return (
            <>
                <h2>Jokes</h2>
                <ul>
                    {this.state.jokes.map(joke => (
                        <li key={joke.id}>{joke.joke}
                        </li>
                    ))}
                </ul>
            </>
        )

    }

    componentDidMount() {
        const endpoint = '/jokes'

        axios
            .get(endpoint)
            .then(res => {
                this.setState({ jokes: res.data })
            })
            .catch(err => console.log(err))
    }
}

export default requiresAuth(Jokes)
// export default Jokes