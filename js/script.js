const BASE_URL = 'https://6276b8ad2f94a1d70606802c.mockapi.io/'
const queryId = (id) => document.getElementById(id)


const getData = async (id) => {
    const response = await fetch (`${BASE_URL}jobs/${id ? id : ""}`)
    const data = await response.json()
    return data
}

const getJobs = () => {
    getData()
        .then(res => createJobCards(res))
        .catch(err => console.log(err))
}
getJobs() 
    
const handleLoader = () => {
    queryId("container-cards").innerHTML = `
    <div class="dot-spinner">
        <div class="dot-spinner__dot"></div>
        <div class="dot-spinner__dot"></div>
        <div class="dot-spinner__dot"></div>
        <div class="dot-spinner__dot"></div>
        <div class="dot-spinner__dot"></div>
        <div class="dot-spinner__dot"></div>
        <div class="dot-spinner__dot"></div>
        <div class="dot-spinner__dot"></div>
    </div>
    `
}

const createJobCards = (jobs) => {
    handleLoader()
    setTimeout(() => {
        queryId("container-cards").innerHTML = ""
        for (const job of jobs) {
        const { id, name, category, description, location, seniority } = job
        queryId("container-cards").innerHTML += `
            <div class="card">
                <h3>${name}</h3>
                <div class="description-container">
                    <p>${description}</p>
                </div>
                <div class="search-options">
                    <p>${location}</p>
                    <p>${seniority}</p>
                    <p>${category}</p>
                </div>
                <button id="btn-detail" class="btn-detail" onclick=getJob(${id})>Ver Detalle</button>
            </div>
        `
        }
    }, 2000)
}

queryId("btn-home").addEventListener('click', getJobs) //VER DE SACARLO

const showFormNewJob = () => {
    queryId("container-cards").innerHTML = ""
    queryId("create-job-form").style.display = "block"
}

queryId("btn-create").addEventListener('click', showFormNewJob)

const showSuccessConfirmation = () => {
    queryId("container-cards").innerHTML = ""
    queryId("create-job-form").style.display = "none"
    queryId("success-confirmation").style.display = "block"
}

const showWarningAlert = () => {
    queryId("container-cards").innerHTML = ""
    queryId("create-job-form").style.display = "none"
    queryId("warning-alert").style.display = "block"
}

queryId("btn-back-success").addEventListener('click', () => {
    queryId("success-confirmation").style.display = "none"
    getJobs()
})
/*queryId("btn-back-warning").addEventListener('click', () => {
    queryId("warning-alert").style.display = "none"
    getJobs()
})*/

const saveNewJobData = () => {
    const colectionTechnologies = document.querySelectorAll('.technology')
    const selectedTechnologies = []
    for (const technology of colectionTechnologies){
      technology.selected ? selectedTechnologies.push(technology.value) : false
    } 
    return{
        name: queryId("job-name").value,
        category: queryId("job-category").value,
        description: queryId("job-description").value,
        location: queryId("job-location").value,
        seniority: queryId("job-seniority").value,
        technologies: selectedTechnologies
    }
}

const createJob = () => {
    fetch(`${BASE_URL}jobs`, {
        method: "POST",
        headers: {
            'Content-Type': 'Application/json'
        },
        body: JSON.stringify(saveNewJobData())
    })
        .then(res => {
            if (res.ok){
                showSuccessConfirmation()
            } else {
                showWarningAlert()
            }
        })
        .catch(err => console.log(err))
        //.finally(() => location.reload())
}

queryId("btn-save-new").addEventListener('click', (e) => {
    e.preventDefault()
    createJob()
})
queryId("btn-cancel-new").addEventListener('click', () => {
    queryId("create-job-form").style.display = "none"
    getJobs()
})

const getJob = (id) => {
    getData(id)
        .then(res => createJobDetail(res))
        .catch(err => console.log(err))
}

const createJobDetail = (job) => {
    handleLoader()
    setTimeout(() => {
    const { id, name, category, description, location, seniority, technologies } = job
    queryId("container-cards").innerHTML = `
        <div class="card-detail">
            <h3>${name}</h3>
            <p><span>Descripción del puesto:</span> ${description}</p>
            <div class="search-options">
                <p><span>Ubicación:</span> ${location}</p>
                <p><span>Nivel de experiencia:</span> ${seniority}</p>
                <p><span>Categoría:</span> ${category}</p>
            </div>
            <div class="detail-technologies"><span>Tecnologías requeridas:</span> ${technologies.join(', ')}</div>
            <button id="btn-edit" class="btn-edit" onclick=showEditForm(${id})>Editar</button>
            <button id="btn-delete" class="btn-delete" onclick=showDeleteConfirmation(${id})>Eliminar</button>
            <button id="btn-cancel" class="btn-cancel" onclick=getJobs()>Volver</button>
        </div>
        `
    }, 2000)
}

const showDeleteConfirmation = (id) => {
    queryId("container-cards").innerHTML = `
    <div class="delete-confirmation">
        <p>Está seguro que desea eliminar esta oferta de empleo?</p>
        <button id="btn-confirm-delete" class="btn-delete" onclick=deleteJob(${id})>Eliminar</button>
        <button id="btn-cancel" class="btn-cancel" onclick=getJob(${id})>Cancelar</button>
    </div>
    `
}

const deleteJob = (id) => {
    fetch(`${BASE_URL}jobs/${id}`, {
        method: "DELETE",
    })
        .then(res => {
            if (res.ok){
                showSuccessConfirmation()
            } else {
                showWarningAlert()
            }
        })
        .catch(err => console.log(err))
}

const showEditForm = (id) => {
    queryId("edit-job-form").style.display = "block"
    queryId("container-forms").innerHTML += `
    <div class="btn-container">
        <button id="btn-save-edit" class="btn-save-edit" onclick=editJob(${id})>Guardar</button>
        <button id="btn-cancel-edit" class="btn-cancel-edit" onclick=getJobs()>Cancelar</button>
    </div>
    `
    getJobInfo(id)
}

const getJobInfo = (id) => {
    getData(id)
        .then(res => prepopulateEditForm(res))
        .catch(err => console.log(err))
}

const prepopulateEditForm = (data) => {
    const { name, category, description, location, seniority } = data 
    queryId("edited-job-name").value = name
    queryId("edited-job-category").value = category
    queryId("edited-job-description").value = description
    queryId("edited-job-location").value = location
    queryId("edited-job-seniority").value = seniority
}

const saveEditedJobData = (id) => {
    const colectionTechnologies = document.querySelectorAll('.technology')
    const selectedTechnologies = []
    for (const technology of colectionTechnologies){
      technology.selected ? selectedTechnologies.push(technology.value) : false
    } 
    return{
        name: queryId("edited-job-name").value,
        category: queryId("edited-job-category").value,
        description: queryId("edited-job-description").value,
        location: queryId("edited-job-location").value,
        seniority: queryId("edited-job-seniority").value,
        technologies: selectedTechnologies
    }
}

const editJob = (id) => {
    fetch(`${BASE_URL}jobs/${id}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'Application/json'
        },
        body: JSON.stringify(saveEditedJobData(id))
    })
    .then(res => {
        if (res.ok){
            showSuccessConfirmation()
        } else {
            showWarningAlert()
        }
    })
    .catch(err => console.log(err))
    //.finally(() => location.reload())
}

