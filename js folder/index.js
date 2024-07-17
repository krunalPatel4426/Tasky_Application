const state = {
    taskList: [],
  }
  
  const taskContent = document.querySelector(".taskContent")
  const taskModalBody = document.querySelector(".taskModalBody")
  
  const htmlTaskContent = ({ id, title, description, type, url }) => `
    <div class="col-md-6 col-lg-4 mt-3" id="${id}" key="${id}">
      <div class="card shadow-sm taskCard">
        <div class="card-header d-flex justify-content-end" taskCardHeader>
          <button type="button" class="btn btn-outline-primary mr-1.5" name="${id}">
            <i class="fa-solid fa-pencil" name="${id}"></i>
          </button>
          <button type="button" class="btn btn-outline-danger mr-1.5" name="${id}">
            <i class="fa-solid fa-trash" name="${id}"></i>
          </button>
        </div>
        <div class="card-body">
          ${
            url &&
            `<img src="${url}" width="100%" alt="Card Image" class="card-img-top md-3 rounded-lg"/>`
          }
          <h4 class="card-title cardTitle">${title}</h4>
          <p class="description trim-3-lines text-muted">${description}</p>
          <div class="tags text-white d-flex flex-wrap">
            <span class="badge bg-primary m-1"> ${type}</span>
          </div>
        </div>
        <div class="card-footer">
          <button type="button" class="btn btn-outline-primary float-right" data-bs-toggle="modal" data-bs-target="#OpenTaskModal">
            Open Task
          </button>
        </div>
      </div>
    </div>
  `;
  
  const htmlModalContent = ({ id, title, description, url }) => {
    const date = new Date(parseInt(id));
    return `
      <div id="${id}">
        ${
          url &&
          '<img src="${url}" width="100%" alt="card-Img" class="img-fluid placeHolderImage mb-3"/>'
        }
        <strong class="text-muted text-sm">${date.toDateString()}</strong>
        <h2 class="mb-3">${title}</h2>
        <p class="text-muted">${description}</p>
      </div>
    `;
  };
  
  const updateLocalStorage = () => {
    localStorage.setItem(
      "task",
      JSON.stringify({
        tasks: state.taskList,
      })
    );
  };
  
  const loadIntialData = () => {
    const localStorageCopy = JSON.parse(localStorage.task);
    if (localStorageCopy) state.taskList = localStorageCopy.tasks;
  
    state.taskList.map((cardData) => {
      taskContent.insertAdjacentHTML("beforeend", htmlTaskContent(cardData));
    });
  };
  
  const handleSubmit = (event) => {
    event.preventDefault(); // Add this to prevent form submission
    const id = `${Date.now()}`;
    const input = {
      url: document.getElementById("imageUrl").value,
      title: document.getElementById("enterTaskTitle").value,
      type: document.getElementById("taskType").value,
      description: document.getElementById("taskDescription").value,
    };
    taskContent.insertAdjacentHTML("beforeend", htmlTaskContent({...input, id }));
    state.taskList.push({...input, id });
    updateLocalStorage();
  };