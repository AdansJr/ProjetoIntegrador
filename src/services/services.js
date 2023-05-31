export const signUp = async (email, password, name) => {
  const url = "http://localhost:8000/criacliente";

  const details = {
    "login": `${email}`,
    "senha": `${password}`,
    "nome": `${name}`
  }

  let formBody = [];
  for (let property in details) {
    let encodedKey = encodeURIComponent(property);
    let encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");

  const resp = await fetch(url, {
    method: "POST",
    headers: {
      "Content-type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
    body: formBody,
  });
  const response = await resp.json();

  return response;
};

export const loginWithEmailAndPassword = async (email, password) => {
  const url = "http://localhost:8000/login";

  const details = {
    "login": `${email}`,
    "senha": `${password}`,
  }

  let formBody = [];
  for (let property in details) {
    let encodedKey = encodeURIComponent(property);
    let encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");

  const resp = await fetch(url, {
    method: "POST",
    headers: {
      "Content-type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
    body: formBody,
  });
  const response = await resp.json();
  return response;
};

export const getServices = async () => {
  const url = "http://localhost:8000/servicossalao";

  const resp = await fetch(url, {
    method: "GET",
  });
  const response = await resp.json();
  return response;
}


export const loadMySchedules = async (userID) => {
  const url = `http://localhost:8000/agendamentos/${userID}`;

  const resp = await fetch(url, {
    method: "GET",
    
  });

  const response = await resp.json();
  return response;
}

export const setAppointment = async (service, userID, hours, day) => {
  const url = "http://localhost:8000/agendamentos3";
  
  const details = {
    "ClienteIDA": `${userID}`,
    "Servico": `${service}`,
    "AgendamentoDataHora": `${day} ${hours.hora}`
  }

  let formBody = [];
  for (let property in details) {
    let encodedKey = encodeURIComponent(property);
    let encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");

  const resp = await fetch(url, {
    method: "POST",
    headers: {
      "Content-type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
    body: formBody,
  });
  const response = await resp.json();
  return response;
}


// export const deleteSchedule = async (agendamentoID) => {
//   const url = `http://localhost:8000/deleteagendamento/${agendamentoID}`;
//   console.log(agendamentoID)
//   const resp = await fetch(url, {
//     method: "DELETE",

//   });

//   const response = await resp.json();
//   console.log(response)
//   return response;
// }

export const deleteSchedule = async (agendamento) => {
  const url = `http://localhost:8000/deleta/`;
  const resp = await fetch(url, {
    method: "DELETE",
    body: JSON.stringify({
      agendamentoID: agendamento,
    }),
  });

  const response = await resp.json();
  return response;
}

// export const deleteSchedule = async () => {
//   const url = "https://lab-api-bq.herokuapp.com/orders";
//   const resp = await fetch(url, {
//     method: "PUT",
//     headers: {
//       accept: "application/json",
//       Authorization: `${token}`,
//     },
//   });
//   const response = await resp.json();
//   return response;
// };




export const getAvailableDate = async () => {
  const listaDiasDisponiveis = [
    {
      "date": "2023-04-23",
      "hours": [
        "09:00",
        "10:00",
        "11:00",
        "14:00",
        "15:00",
        "16:00",
        "17:00"
      ],
    },

    {
      "date": "2023-04-24",
      "hours": [
        "09:00",
        "10:00",
        "11:00",
        "14:00",
        "15:00",
        "16:00",
        "17:00"
      ],
    },
    {
      "date": "2023-04-25",
      "hours": [
        "09:00",
        "10:00",
        "11:00",
        "14:00",
        "15:00",
        "16:00",
        "17:00"
      ],
    },
    {
      "date": "2023-04-26",
      "hours": [
        "09:00",
        "10:00",
        "11:00",
        "14:00",
        "15:00",
        "16:00",
        "17:00"
      ],
    },
    {
      "date": "2023-04-27",
      "hours": [
        "09:00",
        "10:00",
        "11:00",
        "14:00",
        "15:00",
        "16:00",
        "17:00"
      ],
    },
    {
      "date": "2023-04-30",
      "hours": [
        "09:00",
        "10:00",
        "11:00",
        "14:00",
        "15:00",
        "16:00",
        "17:00"
      ],
    },
    {
      "date": "2023-04-31",
      "hours": [
        "09:00",
        "10:00",
        "11:00",
        "14:00",
        "15:00",
        "16:00",
        "17:00"
      ],
    },
    {
      "date": "2023-05-01",
      "hours": [
        "09:00",
        "10:00",
        "11:00",
        "14:00",
        "15:00",
        "16:00",
        "17:00"
      ],
    },
    {
      "date": "2023-05-02",
      "hours": [
        "09:00",
        "10:00",
        "11:00",
        "14:00",
        "15:00",
        "16:00",
        "17:00"
      ],
    },
    {
      "date": "2023-05-03",
      "hours": [
        "09:00",
        "10:00",
        "11:00",
        "14:00",
        "15:00",
        "16:00",
        "17:00"
      ],
    },
    {
      "date": "2023-05-06",
      "hours": [
        "09:00",
        "10:00",
        "11:00",
        "14:00",
        "15:00",
        "16:00",
        "17:00"
      ],
    },
    {
      "date": "2023-05-07",
      "hours": [
        "09:00",
        "10:00",
        "11:00",
        "14:00",
        "15:00",
        "16:00",
        "17:00"
      ],
    },
  ]
  return listaDiasDisponiveis;
}
