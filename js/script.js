const BASE_URL = 'https://6276b8ad2f94a1d70606802c.mockapi.io/'
const queryId = (id) => document.getElementById(id)
let editId = 0


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

queryId("btn-home").addEventListener('click', getJobs)

const showFormNewJob = () => {
    queryId("search-form").style.display = "none"
    queryId("container-cards").innerHTML = ""
    queryId("job-form").style.display = "block"
    queryId("btn-save-new").classList.remove('d-none')
    queryId("btn-cancel-new").classList.remove('d-none')
    queryId("btn-save-edit").classList.add('d-none')
    queryId("btn-cancel-edit").classList.add('d-none')
    queryId("job-name").value = ""
    queryId("job-category").value = ""
    queryId("job-description").value = ""
    queryId("job-location").value = ""
    queryId("job-seniority").value = ""
}

queryId("btn-create").addEventListener('click', showFormNewJob)

const showSuccessConfirmation = () => {
    queryId("container-cards").innerHTML = ""
    queryId("job-form").style.display = "none"
    queryId("success-confirmation").style.display = "flex"
}
queryId("btn-back-success").addEventListener('click', () => {
    queryId("success-confirmation").style.display = "none"
    queryId("search-form").style.display = "flex"
    getJobs()
})

const showWarningAlert = () => {
    queryId("container-cards").innerHTML = ""
    queryId("job-form").style.display = "none"
    queryId("warning-alert").style.display = "flex"
}
queryId("btn-back-warning").addEventListener('click', () => {
    queryId("warning-alert").style.display = "none"
    queryId("search-form").style.display = "flex"
    getJobs()
})

const saveJobData = () => {
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
        body: JSON.stringify(saveJobData())
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

queryId("btn-save-new").addEventListener('click', (e) => {
    e.preventDefault()
    createJob()
})

queryId("btn-cancel-new").addEventListener('click', () => {
    queryId("search-form").style.display = "flex"
    queryId("job-form").style.display = "none"
    getJobs()
})

const getJob = (id) => {
    getData(id)
        .then(res => createJobDetail(res))
        .catch(err => showWarningAlert(err))
}

const createJobDetail = (job) => {
    handleLoader()
    setTimeout(() => {
    const { id, name, category, description, location, seniority, technologies } = job
    queryId("search-form").style.display = "none"
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
            <button id="btn-cancel" class="btn-cancel" onclick=goBack()>Volver</button>
        </div>
        `
    }, 2000)
}

const goBack = () => {
    queryId("container-cards").innerHTML = ""
    getJobs()
    queryId("search-form").style.display = "flex"
}

const showDeleteConfirmation = (id) => {
    queryId("container-cards").innerHTML = `
    <div class="delete-confirmation">
        <div class="alert-container">
            <i class="fa-solid fa-circle-exclamation"></i>
            <p>Está seguro que desea eliminar esta oferta de empleo?</p>
        </div>
        <div class="btn-container">
            <button id="btn-confirm-delete" class="btn-delete" onclick=deleteJob(${id})>Eliminar</button>
            <button id="btn-cancel" class="btn-back" onclick=getJob(${id})>Cancelar</button>
        </div>
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
}

const showEditForm = (id) => {
    editId = id
    queryId("job-form").style.display = "block"
    queryId("btn-save-edit").classList.remove('d-none')
    queryId("btn-cancel-edit").classList.remove('d-none')
    queryId("btn-save-new").classList.add('d-none')
    queryId("btn-cancel-new").classList.add('d-none')
    getJobInfo(id)
}

const getJobInfo = (id) => {
    getData(id)
        .then(res => prepopulateEditForm(res))
        .catch(err => console.log(err))
}

const prepopulateEditForm = (data) => {
    const { name, category, description, location, seniority } = data 
    queryId("job-name").value = name
    queryId("job-category").value = category
    queryId("job-description").value = description
    queryId("job-location").value = location
    queryId("job-seniority").value = seniority
}

queryId('btn-save-edit').addEventListener('click', (e) => {
    e.preventDefault()
      fetch(`${BASE_URL}jobs/${editId}`, {
        method: 'PUT',
        headers: {
          "Content-Type": "Application/json",
        },
        body: JSON.stringify(saveJobData())
      })
      .then(res => {
        if (res.ok){
            queryId("job-form").style.display = "none"
            showSuccessConfirmation()
        } else {
            queryId("job-form").style.display = "none"
            showWarningAlert()
        }
    })
})

queryId('btn-cancel-edit').addEventListener('click', (e) => {
    e.preventDefault()
    queryId("job-form").style.display = "none"
})

const searchResults = () => {
    let searchData = {
        location: queryId("location-search").value,
        seniority: queryId("seniority-search").value,
        category: queryId("category-search").value
    }
    getData()
        .then((res) => createJobCards(res.filter(
            ({ location, seniority, category }) =>
                location === searchData.location || 
                seniority === searchData.seniority || 
                category === searchData.category
        )))
        .catch(err => console.log(err))
}

queryId("btn-search").addEventListener('click', (e) => {
    e.preventDefault()
    searchResults()
})

queryId("btn-clean").addEventListener('click', (e) => {
    e.preventDefault()
    queryId("location-search").value = ""
    queryId("seniority-search").value = ""
    queryId("category-search").value = ""
    getJobs()
})
