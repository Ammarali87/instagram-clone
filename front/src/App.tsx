
import './globals.css'
import { Routes, Route } from "react-router-dom";

function App() {

  return (
    <main className="flex h-screen  ">
     
      <h1>Vite + React</h1>
       <Routes>
        {/* public routes */}
        {/* <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<SigninForm />} />
          <Route path="/sign-up" element={<SignupForm />} />
        </Route> */}

        {/* private routes */}
        {/* <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/all-users" element={<AllUsers />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/update-post/:id" element={<EditPost />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route path="/profile/:id/*" element={<Profile />} />
          <Route path="/update-profile/:id" element={<UpdateProfile />} />
        </Route> */}
      </Routes>
 

    </main>    
  )
}

export default App
 