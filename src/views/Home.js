import React from 'react';
import Auth from '../components/Auth';
import Loader from '../components/Loader';
import { getAllPins } from '../helpers/data/pinData';
import getUid from '../helpers/data/authData';
import PinsCard from '../components/Cards/PinsCard';

export default class Home extends React.Component {
  state = {
    pins: [],
    loading: true,
  };

  componentDidMount() {
    this.getPins();
  }

  getPins = () => {
    const userId = getUid();
    getAllPins(userId).then((pins) => {
      this.setState({
        pins,
        loading: false,
      });
    });
  };

  loadComponent = () => {
    const { user } = this.props;
    let component = '';
    if (user === null) {
      component = <Loader />;
    } else if (user) {
      component = this.state.pins.length && this.state.pins.map((pin) => (
          <PinsCard key={pin.firebaseKey} pin={pin} />
      ));
    } else {
      component = <Auth />;
    }
    return component;
  };

  render() {
    return (
      <div>
        <h1 className='mt-5'>Welcome to React Pinterest</h1>
        <div className='d-flex flex-wrap container justify-content-center'>
          {!this.state.loading && this.loadComponent()}
        </div>
      </div>
    );
  }
}
