const state = {
    taskList: [],
}

const taskContent = document.querySelector(".taskContent")
const taskModalBody = document.querySelector(".taskModalBody")
console.log(taskContent);
console.log(taskModalBody);


const htmlTaskContent = ({id, title, description, type, url}) => `
    <div class="col-md-6 col-lg-4 mt-3" id=${id}>
        <div class="card shadow-sm taskCard">
            <div class="card-header d-flex justify-content-end taskCardHeader>
                <button type="button" class="btn btn-outline-primary" name=${id}>
                    <i class="fa-solid fa-pencil" name=${id}></i>
                </button>
                <button type="button" class="btn btn-outline-danger" name=${id}>
                    <i class="fa-solid fa-trash" name=${id}></i>
                </button>
            </div>
            <div class="card-body">
                ${
                    url &&
                        `<img src=${url} alt="Card Image" class = "card-img-top mb-3 rounded-2"/>`
                }
                <h4 class="card-title cardTitle">${title}</h4>
                <p class="description trim-3-lines text-muted">${description}</p>
                <div class="tags text-white d-flex flex-wrap">
                    <span class="badge bg-primary m-1"> ${type}</span>
                </div>
            </div>

            <div class="card-footer>
                <button type="button" class="btn btn-outline-primary float-right" data-bs-toggle="OPenModal" data-bs-target"#OpenTaskModal">
                    Open Task
                </button>
            </div>
        </div>
    </div>
`;

const htmlModalContent = ({id, title, discription, url}) => {
    const date = new date(parseInt(id));
    return `
        <div id=${id}> 
            ${
                url &&
                '<img src=${url} width="100%" alt="card-Img" class="img-fluid placeHolderImage mb-3"/>'
            }

            <strong class=text-muted text-sm>${date.toDateString()}</strong>
            <h2 class="mb=3">${title}</h2>
            <p class="text-muted">${discription}</p>
        </div>
    `;
};

const updateLocalStorage = () =>{
    localStorage.setItem(
        "task",
        JSON.stringify({
            tasks : state.taskList,
        })
    );
};
