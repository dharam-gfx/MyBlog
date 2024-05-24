import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Layout, Home, About, Login, Signup, PageNotFound, CreatePost, EditPost, AuthContainer, Post, VerifyEmail, ForgetPassword } from './pages/index';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import { EditPostAPI } from './Components/Posts/EditPost';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />} >
      <Route index element={<Home />}></Route>
      <Route path='/about' element={<About />}></Route>
      <Route path='/login' element={<Login />}></Route>
      <Route path='/signup' element={<Signup />}></Route>
      <Route path='/verify-email' element={<VerifyEmail />}></Route>
      <Route path='/forget-password' element={<ForgetPassword />}></Route>
      <Route path='/post/:postID' loader={EditPostAPI} element={<Post />}></Route>
      <Route path='/create-post' element={<AuthContainer><CreatePost /></AuthContainer>}></Route>
      <Route path='/edit-post/:postID' loader={EditPostAPI} element={<AuthContainer><EditPost /></AuthContainer>}></Route>
      <Route path="*" element={<PageNotFound />} />
    </Route>

  )
)

ReactDOM.createRoot( document.getElementById( 'root' ) ).render(
  // <React.StrictMode>
  <Provider store={store}>
    <RouterProvider router={router}>
      <Layout></Layout>
    </RouterProvider>
  </Provider>
  // </React.StrictMode>,
)
