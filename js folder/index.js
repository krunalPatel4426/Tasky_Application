const state = {
    taskList: [],
  }
  
  const taskContent = document.querySelector(".taskContent")
  const taskModalBody = document.querySelector(".taskModalBody")
  
  const htmlTaskContent = ({ id, title, description, type, url }) => `
    <div class="col-md-6 col-lg-4 mt-3" id="${id}" key="${id}">
      <div class="card shadow-sm taskCard">
        <div class="card-header d-flex justify-content-end gap-2" taskCardHeader>
          <button type="button" class="btn btn-outline-primary mr-1.5" name="${id}">
            <i class="fa-solid fa-pencil" name="${id}"></i>
          </button>
          <button type="button" class="btn btn-outline-danger mr-1.5" onClick="deleteTask.apply(this, arguments)"name="${id}">
            <i class="fa-solid fa-trash" name="${id}"></i>
          </button>
        </div>
        <div class="card-body">
          ${
            url ?
            `<img src="${url}" width="100%" alt="Card Image" class="card-img-top md-3 rounded-lg"/>` :
            `<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMsAAACUCAMAAAAK/S0jAAAAP1BMVEX///+8vb+5urzh4eLb3dzW2Ni4uLz///38/PzQ0dLf3+Lp6ena29y6vsH09PTFxsjJy8rLy865vLq0tbTAwsFCe1wfAAAEl0lEQVR4nO2da5uCIBCFldJwbTHb/v9vXfFSXhg6KNjYw/m86rwyZ8AR2ySJioqKioqKijqyLodSEy+NUp4Ppev1XEqKJfsTh1Ke3yiWy1Wkx5IoyHH5EpbLl7I0echfAmKpsyOoyAEWcaLsxEqlQFh+do5qnb6GpZnzv4YlAVnyI7CAORZZdldk4anIwlORhaciC09FFp6KLDwVWUJLqbJUZM+OEkOWMnvc20bW7eyGw41Flrc/ce9YhBCFcjiWGYss0kmjVFQO7SxeLKqet3yFOMNHs2KRN0P3WlzRwzmxyMLYiBcleDwnlpP5nYJIwXLGicVIoi+fYcczYjnTr3qwysyIpSJRUuz6fFgUjSJqyDF8WE40S3qDkowPi+3N6ONgLJmNBZpi+LCYJ8pjsnzTuHyTX8o7zULucZmegQ2LetAs2CKGD4vF/OBKmRGLolhEhZ2AEQs5MOgDDCcWwjF/BXg8J5YumMWoYEUsYcbSrC8XNKKC20q8WJpwxGoUVix6S66qxzQivTq0LvdgafcNQ3/XRlRXabenNa0ypyZseBYlUZZeUpXXoiiyU+nSgE12YFGPW+LGoiWlc5c/PItq8gV7Wt+uwCxKF1nL9mevCsuiqubw39+dRiYoS4vS1tZ6Q4iwQrKo1yy+y8gEZFHjRqS+hHM1c1Q4lmeC7ZZmwVg62+8KE4ql9crvmCXNQ3smEEuXYBOU8PNMGJaZV8ZpFrAABGGRy0eqYWRC1rIQLMSoBE+zACyLCjbWPeA8459FVosKNma5666K4xMNKO8spFdeBcD14QyVbxaLV0aeOQQLgKIv5y38ifyySJvtg8N4ZTEsXMg088gwyCeLceHiBwbyl0eW5eYvD2mm2tCwWuGPRSK2d4O56KGu4BH0xuKIgqWZzlqBbbrwyKLqFLTKU/e3I9MZkP51gTAs7e5CpIKNWe5vXqkOBhQ1NrX6YXm7cDEr1ysA0tevebfv4ryrAF5YoNneJJtnxift9invweJUjOcwCRHk9P5AaeaBxbmCTWAyM8v8/iBVbzuLRBcuBIx+OFuwLLMWKM2bWdQNXrgQMFlymVcAkwGHNi6dbFtZ5HqvTGEmKMaT5q1nLAVgK8sWr4xgJqJqyTvPbGPZZPt5kMMNpyu8qK2e2cTS3sANVnkFmb2SxzZZ2XvSW1har6yvYDOYnsU+WVmbhRtYPCXYE6ZDeXPSPlRjBVjPsmG2N8NIAOXpLa8sHorxPEjs/tAPcatZfCZYH+QZuz8kzEoWsHnkCAM+OVAvctexeKxgazTEOzPNKhbvXnGH6ZYzU5hVLJavbnbSdKWwnsX45eDeyg0hu7Mo2wcR+8kQszOL9LUG26pl0K4sEu8Zh9YiakeWj1ewseZrMzcW4ivbT6kvzevGhdOoaE2XMy4sbGz/0iRyB5Y2wT63cDFrPM9gLCd+XhnUp5kuANhvQp4YemVQ9xCHs/xwHRUtMeyUB8eFMUofPj4uBbsKNlaeXeBxacWtgk1UFY30a0aMhbX6j0zSb2B5KbLwlI0l/9i/DVgpmkX9nA4m9Fd+oqKioqKioqKidtI/Kx1mvlHB0RcAAAAASUVORK5CYII=" width="100%" height = "450px"alt="Card Image" class="img-fluid md-10 rounded-2"/>`
          }
          <h4 class="card-title cardTitle">${title}</h4>
          <p class="description trim-3-lines text-muted">${description}</p>
          <div class="tags text-white d-flex flex-wrap">
            <span class="badge bg-primary m-1"> ${type}</span>
          </div>
        </div>
        <div class="card-footer">
          <button type="button" class="btn btn-outline-primary float-right" onClick ="openTask.apply(this, arguments)" id="${id}"data-bs-toggle="modal" data-bs-target="#OpenTaskModal">
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
          url ?
          // '<img src=${url} width="100%" alt="card-Img" class="img-fluid placeHolderImage mb-3"/>'
          `<img src="${url}" width="100%" height = "450px"alt="Card Image" class="img-fluid md-10 rounded-2"/>` :
          `<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMsAAACUCAMAAAAK/S0jAAAAP1BMVEX///+8vb+5urzh4eLb3dzW2Ni4uLz///38/PzQ0dLf3+Lp6ena29y6vsH09PTFxsjJy8rLy865vLq0tbTAwsFCe1wfAAAEl0lEQVR4nO2da5uCIBCFldJwbTHb/v9vXfFSXhg6KNjYw/m86rwyZ8AR2ySJioqKioqKijqyLodSEy+NUp4Ppev1XEqKJfsTh1Ke3yiWy1Wkx5IoyHH5EpbLl7I0echfAmKpsyOoyAEWcaLsxEqlQFh+do5qnb6GpZnzv4YlAVnyI7CAORZZdldk4anIwlORhaciC09FFp6KLDwVWUJLqbJUZM+OEkOWMnvc20bW7eyGw41Flrc/ce9YhBCFcjiWGYss0kmjVFQO7SxeLKqet3yFOMNHs2KRN0P3WlzRwzmxyMLYiBcleDwnlpP5nYJIwXLGicVIoi+fYcczYjnTr3qwysyIpSJRUuz6fFgUjSJqyDF8WE40S3qDkowPi+3N6ONgLJmNBZpi+LCYJ8pjsnzTuHyTX8o7zULucZmegQ2LetAs2CKGD4vF/OBKmRGLolhEhZ2AEQs5MOgDDCcWwjF/BXg8J5YumMWoYEUsYcbSrC8XNKKC20q8WJpwxGoUVix6S66qxzQivTq0LvdgafcNQ3/XRlRXabenNa0ypyZseBYlUZZeUpXXoiiyU+nSgE12YFGPW+LGoiWlc5c/PItq8gV7Wt+uwCxKF1nL9mevCsuiqubw39+dRiYoS4vS1tZ6Q4iwQrKo1yy+y8gEZFHjRqS+hHM1c1Q4lmeC7ZZmwVg62+8KE4ql9crvmCXNQ3smEEuXYBOU8PNMGJaZV8ZpFrAABGGRy0eqYWRC1rIQLMSoBE+zACyLCjbWPeA8459FVosKNma5666K4xMNKO8spFdeBcD14QyVbxaLV0aeOQQLgKIv5y38ifyySJvtg8N4ZTEsXMg088gwyCeLceHiBwbyl0eW5eYvD2mm2tCwWuGPRSK2d4O56KGu4BH0xuKIgqWZzlqBbbrwyKLqFLTKU/e3I9MZkP51gTAs7e5CpIKNWe5vXqkOBhQ1NrX6YXm7cDEr1ysA0tevebfv4ryrAF5YoNneJJtnxift9invweJUjOcwCRHk9P5AaeaBxbmCTWAyM8v8/iBVbzuLRBcuBIx+OFuwLLMWKM2bWdQNXrgQMFlymVcAkwGHNi6dbFtZ5HqvTGEmKMaT5q1nLAVgK8sWr4xgJqJqyTvPbGPZZPt5kMMNpyu8qK2e2cTS3sANVnkFmb2SxzZZ2XvSW1har6yvYDOYnsU+WVmbhRtYPCXYE6ZDeXPSPlRjBVjPsmG2N8NIAOXpLa8sHorxPEjs/tAPcatZfCZYH+QZuz8kzEoWsHnkCAM+OVAvctexeKxgazTEOzPNKhbvXnGH6ZYzU5hVLJavbnbSdKWwnsX45eDeyg0hu7Mo2wcR+8kQszOL9LUG26pl0K4sEu8Zh9YiakeWj1ewseZrMzcW4ivbT6kvzevGhdOoaE2XMy4sbGz/0iRyB5Y2wT63cDFrPM9gLCd+XhnUp5kuANhvQp4YemVQ9xCHs/xwHRUtMeyUB8eFMUofPj4uBbsKNlaeXeBxacWtgk1UFY30a0aMhbX6j0zSb2B5KbLwlI0l/9i/DVgpmkX9nA4m9Fd+oqKioqKioqKidtI/Kx1mvlHB0RcAAAAASUVORK5CYII=" width="100%" height = "450px"alt="Card Image" class="img-fluid md-10 rounded-2"/>`
        }
        <strong class="text-muted text-sm pd-5">${date.toDateString()}</strong>
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

  const openTask = (e) =>{
    if(!e) e = window.event;
    const getTask = state.taskList.find(({id}) => id === e.target.id);
    taskModalBody.innerHTML = htmlModalContent(getTask);
  }

  const deleteTask = (e) => {
    if(!e) e = window.event;

    const targetId = e.target.getAttribute("name");
    const type = e.target.tagName;
    const removeTask = state.taskList.filter(({id}) => id !== targetId);
    
    updateLocalStorage();
    if(type === "BUTTON"){
      return e.target.parentNode.parentNode.parentNode.parentNode.removeChild(
        e.target.parentNode.parentNode.parentNode
      );
    }else if(type === "I"){
      return e.target.parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(
        e.target.parentNode.parentNode.parentNode.parentNode
      );
    }
  }