export async function requestLogin(data) {
  const url = 'http://localhost:2035/login';

  const dataJson = JSON.stringify(data);

  const obj = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: dataJson
  }
  
  const response = await fetch(url, obj);
  const user = await response.json();
  return user;
};

export async function requestUserTasks(userId) {
  const url = 'http://localhost:2035/tasks';
  const obj = {
    method: 'GET',
    headers: {
      Authorization: userId
    }
  }
  const response = await fetch(url, obj);
  const user = await response.json();
  return user;
};

export async function reqCreateNewTask(data, userId) {
  const url = 'http://localhost:2035/tasks';

  const dataJson = JSON.stringify(data);
  const obj = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: userId
    },
    body: dataJson
  }
  
  const response = await fetch(url, obj);
  const user = await response.json();
  return user;
};