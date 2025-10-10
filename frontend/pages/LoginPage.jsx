const LoginPage = () => {
  return (
    // login starts
    <div className="w-1/3 border bg-primary border-secondary flex flex-col gap-6 p-4 items-center justify-center rounded">
      {/* logo starts */}
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-4xl bg-gradient-to-tr from-secondary via-info to-secondary text-transparent bg-clip-text">Login Here</h1>
        <img src="/small-logo.png" alt="Login logo" className="w-8 rounded" />
      </div>
      {/* logo ends */}
      {/* fields starts */}
      <div className="flex flex-col gap-3">
        {/* username starts */}
        <div className="flex flex-col">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" placeholder="e.g Suliman Khan" />
        </div>
        {/* username ends */}
        {/* password starts */}
        <div className="flex flex-col">
          <label htmlFor="passowrd">Password</label>
          <input type="text" id="password" placeholder="***********" />
        </div>
        {/* password ends */}
      </div>
      {/* fields ends */}
      {/* button starts */}
      <div className="">
        <button>Login</button>
      </div>
      {/* button ends */}
    </div>
    // login ends
  )
}

export default LoginPage