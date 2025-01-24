import React from 'react';
import { Lightbulb } from 'lucide-react';

interface LightProps {
  isOn: boolean;
  name: string;
}

const Light: React.FC<LightProps> = ({ isOn, name }) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <Lightbulb
        size={32}
        className={`${isOn ? 'text-yellow-400' : 'text-gray-400'} transition-colors`}
      />
      <span className="text-sm font-medium">{name}</span>
    </div>
  );
};

export default Light;