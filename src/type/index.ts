import { Dayjs } from 'dayjs';
export interface Apitype {
  url: string;
  method: string;
  payload?: any;
  headers?: any;
  auth: boolean;
}

export interface Response {
  data?: commonResponse;
  status: number;
  statusText?: string;
  config?: any;
  request?: any;
  header?: any;
}
export interface ErrorResponse {
  status: number;
  statusText?: string;
  data?: any;
}

export interface Authresponse {
  authuser: string;
  code: string;
  hd: string;
  prompt: string;
  scope: string;
}

export interface Googletoken {
  access_token: string;
  expires_in: number;
  id_token: string;
  refresh_token: string;
  scope: string;
  token_type: string;
}

export interface loginData {
  email: string;
  name: string;
  accessToken: string;
  refreshToken: string;
  admin: boolean;
}
export interface loginResponse {
  httpStatus: string;
  message: string;
  data: loginData;
}

export interface Userslicedata {
  email: string;
  name: string;
  admin: boolean;
  accessToken: string;
  refreshToken: string;
  meeting?: any;
}

export interface Userslice {
  httpStatus: string;
  message: string;
  status: string;
  isLogin: boolean;
  data: Userslicedata;
}

export interface Meetingentity {
  meeting: any;
}

export interface MeetingData {
  id: number;
  meetingCategory: string;
  hostName: string;
  startTime: string;
  endTime: string;
  roomName: string;
  meetingName: string;
}
export interface Userslicedata {
  email: string;
  name: string;
  admin: boolean;
  accessToken: string;
  refreshToken: string;
  meeting?: any;
}

export interface Userslice {
  httpStatus: string;
  message: string;
  status: string;
  isLogin: boolean;
  data: Userslicedata;
}

export interface Meetingentity {
  meeting: any;
}

export interface profileType {
  name: string;
  profileEmail: string;
}
export interface MeetingType {
  meetingCategory: string;
  startTime: string;
  endTime: string;
  roomName: string;
  startDate: string;
}
export interface FeedbackType {
  feedback: string;
  hostName: string;
}
export interface commonResponse {
  httpStatus: string;
  message: string;
  data: any;
}

export interface Userslicedata {
  email: string;
  name: string;
  admin: boolean;
  accessToken: string;
  refreshToken: string;
  meeting?: any;
}

export interface Userslice {
  httpStatus: string;
  message: string;
  status: string;
  isLogin: boolean;
  data: Userslicedata;
}

export interface Meetingentity {
  meeting: any;
}

export interface Tokenentity {
  accessToken: string;
  refreshToken: string;
}

export interface Schdulerentity {
  end: any;
  hostName: string;
  start: any;
  title: string;
  roomName:string;
}

export interface AttendeeList{
  name?:string
  email:string
  }
 export interface ActivityCardentity{
    id?:number,
    roomEntityId?:number,
    meetingName:string,
    meetingCategory:string,
    description:string,
    startDate:string,
    endDate:string,
    startTime:string,
    endTime:string,
    hostEmail?:string,
    status:string,
    roomName:string,
    hostName:string,
    guestList:AttendeeList[],
    reason?:any,
    feedback:boolean
  }
  export interface Activityslice {
    isLoading: boolean;
    data: ActivityCardentity[];
  }
 export interface RoomNavigation{
  roomId?:number,
  date?:string,
  data?:ActivityCardentity
 }

 export interface FeedbackInfoCard {
  hostName: string;
  feedback: string;
  rating: number;
  timestamp: string;
  roomName: string;
}



export interface Facility{
  facilityName: string;
  iconUrl: string;
};

export interface MeetCategoryType{
  httpStatus: string;
  message: string;
  data: string[];
}
export interface EmploeenameidType{
 name:string;
 email:string;
}
export interface EmpnameidModel{
  empnameid?:EmploeenameidType;
  isOpenModel:Boolean;
  setOpenModel:React.Dispatch<React.SetStateAction<Boolean>>;
  callback:any ;
 
}

export interface cofirmbooking{
  icon:React.ReactNode;
  shortdes: string;
  longdes: string;
}
export interface roomData{
  id?: number;
  name?: string;
  minCapacity?: number;
  maxCapacity?: number;
  facilitiesEntityList?: Facility[];
  imageUrl?: string; 
  category?:MeetCategoryType;
  empnameid?:EmploeenameidType[];
  description?:string;
}
export interface RoomData {
  id?: number;
  name?: string;
  minCapacity?: number;
  maxCapacity?: number;
  facilitiesEntityList?: Facility[];
  imageUrl?: string; 
  category?:MeetCategoryType;
  empnameid?:EmploeenameidType[];
  roomDetail?:roomData;
  callbackbody?:any;
  cofirmbooking?:cofirmbooking,
  editdata?:any;
  dateincard?:any;
};

export interface RoomoutputModel{
  cofirmbooking:cofirmbooking;
  callback:any;
}
export interface BlockformProps {
  IsModalOpen: boolean;
  time:{starttime:string,endtime:string};
  settime: React.Dispatch<React.SetStateAction<{starttime:string,endtime:string}>>;
  meetingblock:any;
  timedayjs:{startdayjs: Dayjs | null;enddayjs: Dayjs | null;}
  settimedayjs:React.Dispatch<React.SetStateAction<{ startdayjs: Dayjs | null; enddayjs: Dayjs | null }>>;
  setmeetingblock:React.Dispatch<React.SetStateAction<{ meetingName: string; description: string; startTime: string; endTime: string; roomEntityId:number; }>>;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  roomname:string;
  date:Dayjs;
  onblock:()=>void;  
  book:boolean;
}

export  interface Blockroomdata{
  id: number;
  meetingName: string;
  meetingCategory: string;
  description: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  hostEmail: string;
  status: string;
  roomName: string;
  hostName: string;
  guestList: any; 
}
export interface blockedactiontype{
  setIsblocked: React.Dispatch<React.SetStateAction<any>>;
  Isblocked :{ open:boolean
    message:string
    content:string};
}
export interface blockedtype{
  setunblockornot:React.Dispatch<React.SetStateAction<boolean>>;
  setUnIsblocked: React.Dispatch<React.SetStateAction<any>>;
  IsUnblocked :boolean;
  setunblockdata:React.Dispatch<React.SetStateAction<unblockdatatype[]>>;
  setSelectedIds:React.Dispatch<React.SetStateAction<number[]>>;
  SelectedIds:number[];
  setunblocklength:React.Dispatch<React.SetStateAction<number>>;
  roomname:string;
  availableblockdata:Blockroomdata[];
}
export interface unblockdatatype{
  meetingName:string,
  hostName:string,
  startTime:string,
  endTime:string,
  id:number,
}
export interface unblockornottype{
  setunblockcard: React.Dispatch<React.SetStateAction<any>>;
  unblockcard:boolean;
  unblockdata:unblockdatatype[];
  selectedIds:number[]
  UnblockSlot:(data:number[])=>void;
}

export interface AvailableSlotCardtype {

  loading:boolean;
  OpenSlot: boolean;
  setOpenSlot: React.Dispatch<React.SetStateAction<boolean>>;
  name: string;
  availableSlotdata:Blockroomdata[];
}

export interface freeSlot{
  startTime: string;
  endTime: string;
  status: string;
};

export interface dataRoomcardtype{
  id:number,
  name: string,
  imageUrl:any,
  minCapacity:number,
  maxCapacity: number,
  facilitiesEntityList:Facility[];
}
export interface PropsRoomcardtype{
  setspinLoading:React.Dispatch<React.SetStateAction<boolean>>;
  data:dataRoomcardtype;
  datePicker: Dayjs;
  Blockingroom:any;
  dateinString:string;
  setIsblocked: React.Dispatch<React.SetStateAction<any>>;

  }
    
  export interface attendeModeltype{
    editdata?:any;
    guestList?:any;    
    empnameid?:EmploeenameidType[];
    isattendeesModal:boolean;
    setattendeesModal:React.Dispatch<React.SetStateAction<boolean>>;
    setemaildata:React.Dispatch<React.SetStateAction<string[]>>;
    emaildata:string[];
}