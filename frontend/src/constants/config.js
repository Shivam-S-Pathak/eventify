// API messages

// export const API_URL = "https://major1-pearl.vercel.app";
export const API_URL = "http://localhost:8005";
export const API_MESSAGES = {
  loading: {
    title: "loading...",
    message: "Data is being loaded , please wait....",
  },
  success: {
    title: "Success",
    message: "Data loaded successfully",
  },
  responseFailure: {
    title: "Error",
    message: "An error occures while fetching from the server",
  },
  requestFailure: {
    title: "Error",
    message: "An error occured while ",
  },
  networkError: {
    title: "Error",
    message: "Unable to connect, please try again later",
  },
};

// API service call

export const SERVICE_URLS = {
  getStudentLogin: { url: "/student/signin", method: "POST" },
  getStudentSignup: { url: "/student/signup", method: "POST" },
  getOrganiserSignup: { url: "/organiser/signup", method: "POST" },
  getOrganiserLogin: { url: "/organiser/singin", method: "POST" },
  setData: { url: "/event/create", method: "POST" },
  getData: { url: "/event/show", method: "GET" },
  getPendingRequest: { url: "/enroll_pending", method: "GET" },
  acceptRequest: {
    url: (id) => `/accept_enroll_status/${id}`,
    method: "PATCH",
  },
  declineRequest: {
    url: (id) => `/decline_enroll_status/${id}`,
    method: "PATCH",
  },
  getNoti: { url: "/enroll_notificationcount", method: "GET" },
  getEvents: { url: "/my-events", method: "GET" },
  generateIdCard: { url: "/student/generateIdCard", method: "POST" },
  getAlert: { url: "/student/sendsosmail", method: "POST" },
  closeregistration: { url: (id) => `/event/close/${id}`, method: "PATCH" },
  getEnrollments: { url: "/event/participent-data", method: "GET" },
};
