import React from 'react';
import Light from './Light';
import MyButton from './MyButton';

interface RoomProps {
  name: 'bedroom' | 'kitchen';
  lights: {
    light1: boolean;
    light2: boolean;
  };
  onToggleLight: (light: 'light1' | 'light2') => void;
  onBothOn: () => void;
}

const Room: React.FC<RoomProps> = ({ name, lights, onToggleLight, onBothOn }) => {
  console.log( name, lights)
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 capitalize">{name}</h2>
      <div className="grid grid-cols-2 gap-6 mb-4">
        <div className="flex flex-col items-center gap-2">
          <Light isOn={lights.light1} name="Light 1" />
          <MyButton onClick={() => onToggleLight('light1')}>
            {lights.light1 ? 'Turn Off' : 'Turn On'}
          </MyButton>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Light isOn={lights.light2} name="Light 2" />
          <MyButton onClick={() => onToggleLight('light2')}>
            {lights.light2 ? 'Turn Off' : 'Turn On'}
          </MyButton>
        </div>
      </div>
      <div className="flex justify-center">
        <MyButton onClick={onBothOn}>Both On</MyButton>
      </div>
    </div>
  );
};

export default Room;