import api from "./api";
export async function register(newUser: any): Promise<any> {
  return api().post("register", newUser).then();
}

export async function login(credentials: any): Promise<any> {
  return api().post("login", credentials).then();
}

export async function getCenters(query: any): Promise<any> {
  return api()
    .get("centers", { params: query })
    .then((res) => res.data);
}

export async function getMyInteractions(token: any): Promise<any> {
  return api()
    .get("interactions", { params: token })
    .then((res) => res.data);
}

export async function getAnswers(token: any): Promise<any> {
  return api()
    .get("questionnaire", { params: token })
    .then((res) => res.data);
}

export async function getProductById(productId: number): Promise<any> {
  return api()
    .get(`products/${productId}`)
    .then((res) => res.data);
}

export async function questions(): Promise<any> {
  return api()
    .get("questionnaireQuestions")
    .then((res) => res.data);
}

export async function getAllProviders(): Promise<any> {
  return api()
    .get("providers")
    .then((res) => res.data);
}

export async function getAllUsers(): Promise<any> {
  return api()
    .get("users")
    .then((res) => res.data);
}

export async function getPendingFeedbacks(): Promise<any> {
  return api()
    .get("feedbacksToRespond")
    .then((res) => res.data);
}

export async function getFeedbackById(id: number): Promise<any> {
  return api()
    .get(`feedbackById/${id}`)
    .then((res) => res.data);
}

export async function getReservations(clientId: number): Promise<any> {
  return api()
    .get(`reservations/${clientId}`)
    .then((res) => res.data);
}

export async function myResponseHistory(id: number): Promise<any> {
  return api()
    .get(`myResponseHistory/${id}`)
    .then((res) => res.data);
}

export async function getMyResponses(id: number): Promise<any> {
  return api()
    .get(`getMyResponses/${id}`)
    .then((res) => res.data);
}

export async function myFeedbackHistory(id: number): Promise<any> {
  return api()
    .get(`myFeedbackHistory/${id}`)
    .then((res) => res.data);
}

export async function makeAppointment(appointment: any): Promise<any> {
  return api().post("appointment", appointment).then();
}

export async function submitResponse(feedbackResponse: any): Promise<any> {
  return api().post("feedbackResponse", feedbackResponse).then();
}

export async function acceptAppointment(
  appointment: any,
  token: any
): Promise<any> {
  return api()
    .post(`appointment/${appointment.id}`, appointment, { params: token })
    .then();
}

export async function cancelAppointment(
  appointment: any,
  token: any
): Promise<any> {
  return api()
    .delete(`appointment/${appointment.id}`, { params: token })
    .then();
}

export async function updateClientInfo(clientInfo: any): Promise<any> {
  return api().put("profile", clientInfo).then();
}

export async function updateUserActivity(userInfo: any): Promise<any> {
  return api().post("updateUserActivity", userInfo).then();
}

export async function approve(newUser: any): Promise<any> {
  return api().post("register", newUser).then();
}

export async function saveQuestionnaireInfo(
  newAnswers: any,
  token: any
): Promise<any> {
  return api().post("questionnaire", newAnswers, { params: token }).then();
}

export async function submitFeedback(newFeedback: any): Promise<any> {
  return api().post("feedback", newFeedback).then();
}

export async function getCenter(id: number, token: any): Promise<any> {
  return api()
    .get(`center/${id}`, { params: { token } })
    .then((res) => res.data);
}

export async function getCompletedAppointments(id: number): Promise<any> {
  return api()
    .get(`myVisits/${id}`)
    .then((res) => res.data);
}