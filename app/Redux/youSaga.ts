
import { call, put, takeEvery } from "redux-saga/effects";
import {setCategory,setLoading,setError,addCategory,addFilterd,addCount} from "./youSlice"
import { getCategory,createCategory} from "../api/index";


function* fetchCategory(): Generator<any, void, any>{
  try {
    yield put(setError(false));
    yield put(setLoading(true));
     // Pass arguments to GetGraduates
     const response =yield call(getCategory);
    yield put(setLoading(false));
    if(response.error){
      yield put(setError(true))
    }else{
      yield put(setCategory(response))
    }
  } catch (error) {
    console.error("Failed to fetch stats:", error);
  }
}
function* create(action:any): Generator<any, void, any>{
  try {
    yield put(setError(false));
    yield put(setLoading(true));
     // Pass arguments to GetGraduates
     const response =yield call(createCategory,action.payload.name,action.payload.mass,action.payload.image);
    yield put(setLoading(false));
    if(response.error){
      yield put(setError(true))
    }else{
      yield put(addCategory(response))
    }
  } catch (error) {
    console.error("Failed to fetch category:", error);
  }
}
function* filter(action:any): Generator<any, void, any>{
  try {
      yield put(addFilterd(action.payload))
  } catch (error) {
    console.error("Failed to fetch category:", error);
  }
}
function* AddCount(action:any): Generator<any, void, any>{
  try {
      yield put(addCount(action.payload))
  } catch (error) {
    console.error("Failed to fetch category:", error);
  }
}


export default function* youSaga() {
  yield takeEvery("category/fetchCategory",fetchCategory);
  yield takeEvery("category/create",create);
  yield takeEvery("category/filter",filter);
  yield takeEvery("category/AddCount",AddCount);
}