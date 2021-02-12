import React, {useState, useEffect} from 'react';
import {Meteor} from 'meteor/meteor'

function ComponentWrapper({Component}) {
    if (Component === null) {
        return (<div>loading...</div>)
    }
    return <Component />
}

let IsomorphicComponent = null
if (Meteor.isServer) {
    IsomorphicComponent = props => <ComponentWrapper Component={import('./ImportPage.jsx')}/>
} else {
    IsomorphicComponent = props => {
        const [Component, setComponent] = useState(null)
        useEffect(() => {
            import('./ImportPage.jsx').then((c) => setComponent(c))
        }, [])
        return <ComponentWrapper Component={Component}/>
    }
}

export default IsomorphicComponent
