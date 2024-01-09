let x: number;
let y: number;
let r: number;

function setStateMessage(message: string) {
  const stateElement = document.querySelector('#state');
  if (stateElement) {
    stateElement.innerHTML = `<p style="color:#FFF;">${message}</p>`;
  }
}

function clearStateMessage() {
  const stateElement = document.querySelector('#state');
  if (stateElement) {
    stateElement.innerHTML = '';
  }
}

function setXValue(): boolean {
  let xValue: number;
  const inputX: HTMLSelectElement = document.querySelector('#x-input');

  inputX.reportValidity();
  xValue = inputX.selectedIndex - 4;
  if (xValue >= -4 && xValue <= 4) {
    x = xValue;
    return true;
  }

  setStateMessage('X выходит за диапазон!');
  return false;
}

function setYValue(): boolean {
  let yValue: number;
  const inputY: HTMLInputElement = document.querySelector('#y-input');

  if (inputY.value === '') {
    setStateMessage('Введите Y!');
    return false;
  }

  yValue = Number(inputY.value.replace(',', '.'));
  if (!isNaN(yValue) && yValue >= -3 && yValue <= 5) {
    y = yValue;
    return true;
  }

  setStateMessage('Y не является числом или выходит за диапазон!');
  return false;
}

function setRValue(): boolean {
  let rValue: number;
  const inputR: HTMLInputElement = document.querySelector('input[type="radio"]:checked');
  if (!inputR) {
    setStateMessage('Выберите R!');
    return false;
  }

  rValue = Number(inputR.value.replace(',', '.'));
  r = rValue;
  updateR();
  return true;
}

function createFormData(valX: number, valY: number, valR: number): FormData {
  const formData = new FormData();
  formData.append('x', valX.toString());
  formData.append('y', valY.toString());
  formData.append('r', valR.toString());
  return formData;
}

async function postDataToController(data: FormData) {
  try {
    return await fetch('controller', {
      method: 'POST',
      body: data,
    });
  } catch (error) {
    console.error(`ERROR: ${error}`);
    throw error;
  }
}

function handleFormSubmission(event: any) {
  if (setXValue() && setYValue() && setRValue()) {
    clearStateMessage();
    const formData = createFormData(x, y, r);
    postDataToController(formData)
      .then(() => {
        console.log('Запрос успешно отправлен!');
      })
      .catch(() => {
        console.error('Ошибка при отправке запроса!');
      });
  } else {
    event.preventDefault();
  }
}

document.querySelector('#form').addEventListener('submit', handleFormSubmission);
