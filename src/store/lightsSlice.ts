import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LightState {
  light1: boolean;
  light2: boolean;
}

interface LightsState {
  bedroom: LightState;
  kitchen: LightState;
}

const initialState: LightsState = {
  bedroom: {
    light1: false,
    light2: false,
  },
  kitchen: {
    light1: false,
    light2: false,
  },
};

export const lightsSlice = createSlice({
  name: 'lights',
  initialState,
  reducers: {
    setFullState: (state, action: PayloadAction<LightsState>) => {
      return action.payload;
    },
    toggleLight: (state, action: PayloadAction<{ room: 'bedroom' | 'kitchen'; light: 'light1' | 'light2' }>) => {
      const { room, light } = action.payload;
      state[room][light] = !state[room][light];
    },
    setBothLights: (state, action: PayloadAction<'bedroom' | 'kitchen'>) => {
      const room = action.payload;
      state[room].light1 = true;
      state[room].light2 = true;
    },
  },
});

export const { setFullState, toggleLight, setBothLights } = lightsSlice.actions;
export default lightsSlice.reducer;