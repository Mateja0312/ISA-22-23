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
    .then((res) => res.data); //ovde nije pisalo res => res.data i bez toga nije radilo
  //poenta je da ce res biti ceo response objekat koji ima status i razna druga sranja pored samih podataka koji nas zanimaju, pa kad uradimo res.data ekstraktujemo samo onaj deo odgovora koji nas interesuje, same podatke
}

export async function getAllUsers(): Promise<any> {
  return api()
    .get("users")
    .then((res) => res.data);
}

export async function getReservations(clientId: number): Promise<any> {
  return api()
    .get(`reservations/${clientId}`)
    .then((res) => res.data);
}

export async function makeAppointment(appointment: any): Promise<any> {
  return api().post("appointment", appointment).then();
}

export async function cancelAppointment(cancelRequest: any): Promise<any> {
  return api().put("cancelAppointment", cancelRequest).then();
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

export async function saveQuestionnaireInfo(newAnswers: any): Promise<any> {
  return api().post("questionnaire", newAnswers).then();
}

export async function submitFeedback(newFeedback: any): Promise<any> {
  return api().post("feedback", newFeedback).then();
}
export async function getCenter(id: number): Promise<any> {
  return api()
    .get(`center/${id}`)
    .then((res) => res.data);
}
