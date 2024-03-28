export const api = {
  homeurl: "https://ragul86100.git.io/MRB_test",

  baseurl: "http://192.168.1.156:8080/v1/api/",
  adminActivityHistory: "admin/meeting/history",
  adminActivityUpcoming: "admin/meeting/upcomingmeetings",
  adminHomeMeetings: "admin/meeting/upcomingmeetingsbyhost",
  loginurl: "auth/login",
  logouturl: "auth/logout",
  refreshToken: "auth/getAccessToken",

  userscheduler: "booking/meetingsbyyear/",
  userHomePageurl: "user/meeting/getuserdashboardmeeting/date/",

  userActivitycompleted: "user/meeting/get/completedmeeting",
  userActivitystatus: "user/meeting/get/upcomingmeeting/",
  userPendingwithdraw: "user/meeting/withdrawmeeting/",

  googleTokenurl: "https://oauth2.googleapis.com/token",

  bookingRoomdetailbyid: "rooms/displaybyId/",
  meetingCategoryurl: "user/categories",
  employeNameid: "user/attendees/internalattendees",
  postBookingroomForm: "user/meeting/bookmeeting",
  putBookingroomForm: "user/meeting/editmeeting/",
  blockRoomapi: "admin/meeting/block",
  getBlockedroomdetails: "booking/viewslots/",
  unBlockids: "admin/meeting/unblockbyid",
  adminScheduler: "booking/meetingsbyyear/",

  requestPageRejectedurl: "admin/meeting/reject/",
  requestPagedata: "admin/meeting/requests",
  requestAccepturl: "admin/meeting/accept/",

  adminHomefeedback: "feature/feedback/get/feedback/lastfouruser",

  userListroom: "rooms/display",
  adminFeedback: "feature/feedback/get/feedback/date?date=",
  userFeedback: "feature/feedback/savefeedback",
  adminMeetingCancel: "admin/meeting/reject/",
  getblockedroomdetails:"admin/meeting/unblock",

  googlecliendId:"849653522837-p0c28i6g670gtj97flvsp09ic972p3rh.apps.googleusercontent.com",
  googleclientsecret:"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"

};
