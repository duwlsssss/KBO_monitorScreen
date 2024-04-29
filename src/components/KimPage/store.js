import {create} from 'zustand';

const useStore = create((set) => ({
  selectedMBTI: null,
  setSelectedMBTI: (mbti) => set({ selectedMBTI: mbti }),
  resetMBTI: () => set({ selectedMBTI: null }),
  selectedSchool: null,
  setSelectedSchool: (school) => set({ selectedSchool: school }),
  resetSchool: () => set({ selectedSchool: null }),
  selectedSession: null,
  customSession: '',
  setSelectedSession: (session) => set({ selectedSession: session }),
  setCustomSession: (custom) => set({ customSession: custom }),
  resetSession: () => set({ selectedSession: null, customSession: '' }),
}));

export default useStore;