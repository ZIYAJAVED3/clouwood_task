import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { setFullState } from '../store/lightsSlice';
import Room from '../components/Room';
import { socket } from '../socket';

const User: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const lights = useSelector((state: RootState) => state.lights);

  useEffect(() => {
    function onInitialState(state: any) {
      console.log('Received initial state:', state);
      dispatch(setFullState(state));
    }

    function onStateUpdate(state: any) {
      console.log('Received state update:', state);
      dispatch(setFullState(state));
    }

    socket.on('initialState', onInitialState);
    socket.on('stateUpdate', onStateUpdate);
    socket.emit('requestInitialState');

    return () => {
      socket.off('initialState', onInitialState);
      socket.off('stateUpdate', onStateUpdate);
    };
  }, [dispatch]);

  const handleToggleLight = (room: 'bedroom' | 'kitchen', light: 'light1' | 'light2') => {
    console.log('Toggling light:', room, light);
    socket.emit('toggleLight', { room, light });
  };

  const handleBothOn = (room: 'bedroom' | 'kitchen') => {
    console.log('Both lights on for:', room);
    socket.emit('bothLights', room);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center mb-8">User {id}</h1>
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <Room
          name="bedroom"
          lights={lights.bedroom}
          onToggleLight={(light) => handleToggleLight('bedroom', light)}
          onBothOn={() => handleBothOn('bedroom')}
        />
        <Room
          name="kitchen"
          lights={lights.kitchen}
          onToggleLight={(light) => handleToggleLight('kitchen', light)}
          onBothOn={() => handleBothOn('kitchen')}
        />
      </div>
    </div>
  );
}

export default User;