import {create} from 'zustand';

const useStore = create((set) => ({
  selectedMBTI: null,
  setSelectedMBTI: (mbti) => set({ selectedMBTI: mbti }),
  resetMBTI: () => set({ selectedMBTI: null }),
  selectedSchool: null,
  customSchool: '',
  setSelectedSchool: (school) => set({ selectedSchool: school }),
  setCustomSchool: (custom) => set({ customSchool: custom }),
  resetSchool: () => set({ selectedSchool: null, customSchool:'' }),
  selectedSession: null,
  customSession: '',
  setSelectedSession: (session) => set({ selectedSession: session }),
  setCustomSession: (custom) => set({ customSession: custom }),
  resetSession: () => set({ selectedSession: null, customSession: '' }),
}));

export default useStore;