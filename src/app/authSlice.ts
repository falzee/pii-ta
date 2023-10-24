import axios from 'axios'
import { createSlice, createAsyncThunk,PayloadAction } from '@reduxjs/toolkit'
import { error } from 'console'

// json-server db.json -m ./node_modules/json-server-auth --port 5000
type User = {
    id?: number
    email: string
    password: string
}

type InitialState = {
    loading: boolean
    users: User[]
    token: string
    error: boolean
    isLogin: boolean
    isReg: boolean
}
const initialState: InitialState = {
    loading: false,
    users: [],
    token: '',
    error: false,
    isLogin: false,
    isReg: false
}


// export const postLogIn = createAsyncThunk(
//     "auth/postLogIn",
//     async (users: User) => {
//         try{
//             const response = await axios.post("https://reqres.in/api/login", {
//                 email: users.email,
//                 password: users.password
//             })
//             return response.data;
//         }catch(err:any){
//             if (err.response.status === 400) {
//                 return (err);
//           } 
//         }
//     }
// );
export const postLogIn = createAsyncThunk(
  "auth/postLogIn",
  async (users: User, {rejectWithValue}) => {
            try{
                const response = await axios.post("https://reqres.in/api/login", {
                    email: users.email,
                    password: users.password
                })
                const token = response.data.token
                localStorage.setItem('jwtToken', token);
                return response.data;
            }catch (err:any) {
              if (err.response) {
                // If there is a response in the error, it's an HTTP error
                // You can use `rejectWithValue` to return the error payload
                return rejectWithValue(err.response.data);
              } else {
                // If there is no response, it's a network or other error
                throw err;
              }
        }
      }
);
// async (users: User) => {
//   return axios
//     .post(" http://localhost:8000/auth/login", {
//       email: users.email,
//       password: users.password
//     })
    
//     .then((response) => {return response.data})
//     .then((response) => {
//       const token = response.token
//       localStorage.setItem('jwtToken', token);
//     })
//     .catch((err) => {
//       if (err.response.status === 400) {
//         return Promise.reject(err);
//       } 
//     });
// }
// // https://reqres.in/api/login
// // http://localhost:8000/auth/login

export const postReg = createAsyncThunk(
    "auth/postReg",
    async (users: User) => {
        return axios
            .post("https://reqres.in/api/register", {
            email: users.email,
            password: users.password
        })
        
        .then((response)=> response.data)
        
        .catch((err) => {
            return Promise.reject(err);
        });
    }
);
// http://localhost:8000/auth/register

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {   
      reset: () => initialState,
      removeToken: () => localStorage.removeItem('jwtToken'),
    }, 
    extraReducers: (builder) => {
      builder.addCase(postLogIn.pending, (state) => {
        state.loading = true;
        state.error = false;
      });
      builder.addCase(postLogIn.fulfilled, (state ,action: PayloadAction<any>) => {
        state.loading = false;
        state.error = false;
        state.isLogin = true;
        state.users = action.payload.data;
        state.token = action.payload.token;
      });
      builder.addCase(postLogIn.rejected, (state) => {
        state.loading = false;
        state.error = true;
        state.isLogin = false;
        state.users = [];
        state.token = '';
      });
      builder.addCase(postReg.pending, (state) => {
        state.loading = true;
        state.error = false;
      });
      builder.addCase(postReg.fulfilled, (state,action: PayloadAction<any>) => {
        state.loading = false;
        state.error = false;
        state.isReg = true;
        state.users = action.payload
      });
      builder.addCase(postReg.rejected, (state) => {
        state.loading = false;
        state.error = true;
        state.isReg = false;
      });
    }
  }
)
export const {reset,removeToken} = authSlice.actions
export default authSlice.reducer