import api from "./api";
export async function register(newUser: any): Promise<any> {
  return api()
    .post("register", newUser)
    .then((res) => {
      console.log(res);
    });
}

export async function login(credentials: any): Promise<any> {
  return api().post("login", credentials).then();
}

export async function getCenters(): Promise<any> {
  return api()
    .get("centers")
    .then((res) => res.data);
}

export async function getProductById(productId: number): Promise<any> {
  return api()
    .get(`products/${productId}`)
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

export async function makeReservation(reservation: any): Promise<any> {
  return api()
    .post("makeReservation", reservation)
    .then((res) => {
      console.log(res);
    });
}

export async function cancelReservation(cancelRequest: any): Promise<any> {
  return api()
    .put("cancelReservation", cancelRequest)
    .then((res) => {
      console.log(res);
    });
}

export async function updateClientInfo(clientInfo: any): Promise<any> {
  return api().post("updateClientInfo", clientInfo).then();
}

export async function updateUserActivity(userInfo: any): Promise<any> {
  return api().post("updateUserActivity", userInfo).then();
}

export async function approve(newUser: any): Promise<any> {
  return api()
    .post("register", newUser)
    .then((res) => {
      console.log(res);
    });
}
