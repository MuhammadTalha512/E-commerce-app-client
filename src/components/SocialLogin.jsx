import React from 'react'
import { FaGoogle, FaGithub, FaFacebook } from "react-icons/fa";


const SocialLogin = () => {

    const backendURL=  import.meta.env.VITE_API_URL

    const handleGoogleLogin =() =>{
        window.open(`${backendURL}/api/auth/google`, "_self")
    }
    const handleGithubLogin =() =>{
        window.open(`${backendURL}/api/auth/github`, "_self")
    }
    const handleFacebookLogin =() =>{
        window.open(`${backendURL}/api/auth/facebook`, "_self")
    }

  return (
 <div className="social-login text-center mt-3">
      <p className="text-muted mb-2">Or sign up with</p>

      <div className="d-flex justify-content-center gap-3">
        <button
          onClick={handleGoogleLogin}
          className="btn btn-danger p-2 rounded-5  d-flex align-items-center gap-2"
        >
          <FaGoogle size={20} />
        </button>
        <button
          onClick={handleFacebookLogin}
          className="btn btn-primary p-2 rounded-5  d-flex align-items-center gap-2"
        >
          <FaFacebook size={20} />
        </button>

        <button
          onClick={handleGithubLogin}
          className="btn btn-dark p-2 rounded-5 d-flex align-items-center gap-2"
        >
          <FaGithub size={20} />
        </button>
      </div>
    </div>
  )
}

export default SocialLogin