import { useSelector } from "react-redux"

const ProfilePage = () => {
  const { user } = useSelector(state => state.user);
  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-fit border border-warning rounded-2xl p-2 shadow-2xl shadow-warning flex flex-col gap-2">
        <h1 className="text-2xl capitalize text-accent text-center font-bold">{user?.role || "--"}</h1>
        <hr className="text-warning" />
        <div className="flex gap-1">
          <img src={user?.image || "/avatar.png"} alt="product.png" className="w-110 border border-warning rounded-full" />
          <div className="flex flex-col justify-evenly border-l-2 border-warning pl-3">
            <h1 className="text-xl text-accent font-bold"> <h2 className="bg-success/20 px-2 inline-block rounded-full -rotate-45">Name</h2> {user?.name || "--"} <span className="bg-warning/20 text-warning px-1 font-normal rounded-full">@{user?.username || "--"}</span> </h1>
            <hr className="text-warning" />
            <p className="text-lg text-error font-bold"> <h2 className="bg-success/20 px-2 inline-block rounded-full text-accent -rotate-45">E-mail</h2> {user?.email || "--"}</p>
            <hr className="text-warning" />
            <p className="text-lg tracking-widest font-bold text-accent"> <h2 className="bg-success/20 px-2 inline-block rounded-full tracking-normal -rotate-45">Phone</h2> {user?.phone || "--"}</p>
            <hr className="text-warning" />
            <p className="text-lg text-accent font-bold">
              <h2 className="bg-success/20 px-2 inline-block rounded-full -rotate-45">Address</h2>
              {
                user?.address &&
                ((user?.address?.country || "--") + " / ") + ((user?.address?.city || "--") + " / ") + ((user?.address?.street || "--") + " / ") + (user?.address?.postalCode || "--")
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage