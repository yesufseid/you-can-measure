
import { createSlice} from "@reduxjs/toolkit";

type activityProps={
  id:string
  name:string,
  mass:number,
  image:string ,
  created_at:string
}
type countProps={
   [id: string]: number;
}
interface PlayerState {
  category:activityProps[];
  loading: boolean;
  error: boolean;
  filterd:activityProps[];
  count:countProps
}

const initialState: PlayerState = {
  category:[],
  filterd:[],
  loading: false,
  error: false,
  count:{}
};
const  youSlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.category= action.payload;
    },
    addCategory: (state, action) => {
      state.category.push(action.payload)
    },
    addFilterd:(state, action) => {
      const index = state.filterd.findIndex((item) => item.id === action.payload.id);
      if (index !== -1) {
        // If it exists, remove it
        state.filterd.splice(index, 1);
      } else {
        // If it doesn't exist, add it
        state.filterd.push(action.payload);
      }
    },
    addCount:(state,action) => {
      const { id, value } = action.payload;
      state.count[id]=value;
    },  
    setLoading: (state, action) => {
      state.loading= state.loading=action.payload
    },
    setError: (state, action) => {
      state.error= state.error=action.payload
    },
  },
});

export const { addCategory,setCategory,setError,setLoading,addFilterd,addCount} =youSlice.actions;
export default youSlice.reducer;
