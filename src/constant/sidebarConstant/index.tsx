import  { ReactElement } from "react";
import { AiFillHome } from "react-icons/ai";
import { MdMeetingRoom } from "react-icons/md";
import { GrSchedules } from "react-icons/gr";
import { FaHistory } from "react-icons/fa";
import { MdFeedback } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";
import { GiNotebook } from "react-icons/gi";

interface NavItem {
  title: string;
  icon: ReactElement;
  link: string;
  key: string;
  path: string;
}

export const adminData: NavItem[] = [
  {
    key: "A1",
    title: "Home",
    path: "",
    icon: <AiFillHome />,
    link: "/admin",
  },
  {
    key: "A2",
    title: "Rooms",
    path: "rooms",
    icon: <MdMeetingRoom />,
    link: "/admin/roomdetails",
  },
  {
    key: "A3",
    title: "Schedule",
    path: "schedule",
    icon: <GrSchedules />,
    link: "/admin/schedules",
  },
  {
    key: "A4",
    title: "Activities",
    path: "activities",
    icon: <FaHistory />,
    link: "/admin/activity",
  },
  {
    key: "A5",
    title: "Requests",
    path: "requests",
    icon: <GiNotebook />,
    link: "/admin/request",
  },
  {
    key: "A6",
    title: "FeedBack",
    path: "feedback",
    icon: <MdFeedback />,

    link: "/admin/feedback",
  },
  {
    key: "A7",
    title: "LogOut",
    path: "logout",
    icon: <IoIosLogOut />,
    link: "/",
  },
];

export const userData: NavItem[] = [
  {
    key: "U1",
    title: "Home",
    path: "",
    icon: <AiFillHome />,

    link: "/user",
  },
  {
    key: "U2",
    title: "Booking",
    path: "booking",
    icon: <MdMeetingRoom />,

    link: "/user/booking",
  },
  {
    key: "U3",
    title: "Schedule",
    path: "schedule",
    icon: <GrSchedules />,

    link: "/user/schedule",
  },
  {
    key: "U4",
    title: "Activities",
    path: "activities",
    icon: <FaHistory />,

    link: "/user/activity",
  },
  {
    key: "U5",
    title: "LogOut",
    path: "logout",
    icon: <IoIosLogOut />,

    link: "/",
  },
];
