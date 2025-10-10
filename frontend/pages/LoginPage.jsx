import { Lock, LogIn, LucideUserX2, User, User2, UserX2 } from "lucide-react"

const LoginPage = () => {
  return (
    // login starts
    <div className="w-1/3 border bg-primary shadow-2xl shadow-warning border-warning flex flex-col gap-6 p-4 items-center rounded">
      {/* logo starts */}
      <div className="flex flex-col justify-center items-center w-full">
        <h1 className="text-4xl text-warning">Login Here</h1>
        <img src="/small-logo.png" alt="Login logo" className="w-8 rounded" />
      </div>
      {/* logo ends */}
      {/* fields starts */}
      <div className="flex flex-col gap-5 w-full justify-center">
        {/* username starts */}
        <div className="flex flex-col gap-2">
          <label htmlFor="username" className="text-blue-500">Username</label>
          <div className="flex items-center">
            <User className="size-8 ml-2" />
            <input className="textField" type="text" id="username" placeholder="@ sulimankhan" />
          </div>
        </div>
        {/* username ends */}
        {/* password starts */}
        <div className="flex flex-col gap-2">
          <label className="text-blue-500" htmlFor="passowrd">Password</label>
          <div className="flex items-center">
            <Lock className="size-8 ml-2" />
            <input className="textField" type="text" id="password" placeholder="@ strong password" />
          </div>
        </div>
        {/* password ends */}
      </div>
      {/* fields ends */}
      {/* button starts */}
      <div className="">
        <button className="myBtn flex gap-2">Login <LogIn /></button>
      </div>
      {/* button ends */}
    </div>
    // login ends
  )
}

export default LoginPage