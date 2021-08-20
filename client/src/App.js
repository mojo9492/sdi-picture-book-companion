import {React} from 'react';
import { Route } from 'react-router-dom';
import Home from './components/Home.js';
import Search from './components/Search.js';
import Item from './components/Item.js';
import AddItem from './components/AddItem.js';


function App(props) {
 
    return (
        <div>
            <Route exact path="/">
                <Home />
            </Route>
            <Route path="/add">
                <AddItem/>
            </Route>
            <Route path="/search">
                <Search/>
            </Route>
            <Route path="/item">
                <Item />
            </Route>
        </div>
    );
}

export default App;
