let form = document.getElementById('studentForm')
let tableBody = document.querySelector('#studentTable tbody')

// Get from LocalStorage
function getStudents() {
    let students = localStorage.getItem('students')
    if (students) {
        return JSON.parse(students)
    } else {
        return []
    }
}
// Save in LocalStorage
function saveStudents(students) {
    localStorage.setItem('students', JSON.stringify(students))
}

// Show Students in the table
function renderStudents() {
    let students = getStudents()
    tableBody.innerHTML = '' // Clean Table

    students.forEach((student, index) => {
        let row = document.createElement('tr')
        row.innerHTML = `
            <td>${student.firstName}</td>
            <td>${student.lastName}</td>
            <td>${student.age}</td>
            <td>${student.course}</td>
            <td>${student.faculty}</td>
            <td>${student.subjects.join(', ')}</td>
            <td>
                <button onclick="editStudent(${index})">Edit</button>
                <button onclick="deleteStudent(${index})">Delete</button>
            </td>
        `;
        tableBody.appendChild(row)
    });
}



// Add 
form.addEventListener('submit', function(event) {
    event.preventDefault()

    let firstName = document.getElementById('firstName').value
    let lastName = document.getElementById('lastName').value
    let age = document.getElementById('age').value
    let course = document.getElementById('course').value
    let faculty = document.getElementById('faculty').value
    let subjects = document.getElementById('subjects').value.split(',').map(sub => sub.trim())

    let students = getStudents()
    // Add new
    students.push({ firstName, lastName, age, course, faculty, subjects })
    saveStudents(students)
    renderStudents()
    // Reset
    form.reset()
})



// Delet
function deleteStudent(index) {
    let students = getStudents()
    students.splice(index, 1) // Delet fromn masiv
    saveStudents(students)
    renderStudents()
}

function editStudent(index) {
    let students = getStudents()
    let student = students[index]

    document.getElementById('firstName').value = student.firstName
    document.getElementById('lastName').value = student.lastName
    document.getElementById('age').value = student.age
    document.getElementById('course').value = student.course
    document.getElementById('faculty').value = student.faculty
    document.getElementById('subjects').value = student.subjects.join(', ')

    form.removeEventListener('submit', handleFormSubmit)
    form.addEventListener('submit', function updateStudent(event) {
        event.preventDefault()

        student.firstName = document.getElementById('firstName').value
        student.lastName = document.getElementById('lastName').value
        student.age = document.getElementById('age').value
        student.course = document.getElementById('course').value
        student.faculty = document.getElementById('faculty').value
        student.subjects = document.getElementById('subjects').value.split(',').map(sub => sub.trim())
        saveStudents(students)
        renderStudents()

        form.removeEventListener('submit', updateStudent)
        form.addEventListener('submit', handleFormSubmit)

        
        form.reset();
    })
}


function handleFormSubmit(event) {
    event.preventDefault()
}


renderStudents()