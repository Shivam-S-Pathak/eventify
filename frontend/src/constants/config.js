// API messages

export const API_URL = "https://major1-pearl.vercel.app";
// export const API_URL = "http://localhost:8005";
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
};
