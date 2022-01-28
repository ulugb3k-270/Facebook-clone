import Moment from "react-moment";

export default function Comments({
  userName,
  userImg,
  userComment,
  timestamp,
}) {
  return (
    <div className="">
      <div className="flex gap-3 items-end">
        <img
          src={userImg}
          alt={userName}
          className="h-[32px] w-[32px] object-cover rounded-full"
        />
          <div className="p-2 bg-gray-100 rounded-lg">
            <h2 className="text-md font-semibold">{userName} <span className={userName === "Ulugb3k270" ? "verified" : ""}></span></h2>
            <p className="text-sm font-normal">{userComment}</p>
          </div>
        
          <Moment fromNow interval={1000} className="text-gray-400 text-[10px]">
            {timestamp?.toDate()}
          </Moment>
      </div>
    </div>
  );
}
