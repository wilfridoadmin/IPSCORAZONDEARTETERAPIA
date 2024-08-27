document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const dashboard = document.getElementById('dashboard');
    const loginContainer = document.getElementById('login');
    const logoutButton = document.getElementById('logout');
    const patientList = document.getElementById('patientList').getElementsByTagName('tbody')[0];
    const patientForm = document.getElementById('patientForm');
    const editIndex = document.getElementById('editIndex');

    let patients = [];

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if ((username === 'admin' && password === '221099') || (username === 'psicologa' && password === 'michell2210')) {
            loginContainer.style.display = 'none';
            dashboard.style.display = 'block';
        } else {
            alert('Usuario o contraseña incorrectos');
        }
    });

    logoutButton.addEventListener('click', () => {
        loginContainer.style.display = 'block';
        dashboard.style.display = 'none';
        document.getElementById('username').value = '';
        document.getElementById('password').value = '';
        editIndex.value = '';
    });

    document.getElementById('savePatient').addEventListener('click', () => {
        const id = document.getElementById('patientId').value;
        const fullName = document.getElementById(`fullName').value; const age = document.getElementById('age').value; const entryDate = document.getElementById('entryDate').value; const observations = document.getElementById('observations').value; const documentInput = document.getElementById('document');
    if (!id || !fullName || !age || !entryDate) {
        alert('Por favor, complete todos los campos obligatorios');
        return;
    }

    const patient = {
        id,
        fullName,
        age,
        entryDate,
        observations,
        documentName: documentInput.files[0] ? documentInput.files[0].name : '',
        documentUrl: documentInput.files[0] ? URL.createObjectURL(documentInput.files[0]) : ''
    };

    if (editIndex.value !== '') {
        const index = parseInt(editIndex.value, 10);
        patients[index] = patient;
    } else {
        patients.push(patient);
    }

    updatePatientList();
    patientForm.reset();
    editIndex.value = '';
});

document.getElementById('printPatient').addEventListener('click', () => {
    const id = document.getElementById('patientId').value;
    const fullName = document.getElementById('fullName').value;
    const age = document.getElementById('age').value;
    const entryDate = document.getElementById('entryDate').value;
    const observations = document.getElementById('observations').value;
    const documentInput = document.getElementById('document');

    if (!id || !fullName || !age || !entryDate) {
        alert('Por favor, complete todos los campos obligatorios');
        return;
    }

    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write('<html><head><title>Impresión de Paciente</title>');
    printWindow.document.write('<style>body { font-family: Arial, sans-serif; } table { width: 100%; border-collapse: collapse; } th, td { border: 1px solid #ddd; padding: 8px; } th { background-color: #009900; color: white; }</style>');
    printWindow.document.write('</head><body>');
    printWindow.document.write('<h1>Corazón de Arte Terapia</h1>');
    printWindow.document.write('<h2>Detalles del Paciente</h2>');
    printWindow.document.write('<table>');
    printWindow.document.write('<tr><th>Nombre Completo</th><td>' + fullName + '</td></tr>');
    printWindow.document.write('<tr><th>Fecha de Ingreso</th><td>' + entryDate + '</td></tr>');
    printWindow.document.write('<tr><th>Edad</th><td>' + age + '</td></tr>');
    printWindow.document.write('<tr><th>Observaciones</th><td>' + observations + '</td></tr>');
    if (documentInput.files[0]) {
        const fileName = documentInput.files[0].name;
        printWindow.document.write('<tr><th>Documento</th><td>' + fileName + '</td></tr>');
        printWindow.document.write('<tr><th>Vista Previa</th><td><img src="' + URL.createObjectURL(documentInput.files[0]) + '" alt="Documento" style="max-width: 100%; height: auto;"></td></tr>');
    }
    printWindow.document.write('</table>');
    printWindow.document.write('<footer><p>Atendido por: ' + document.getElementById('username').value + '</p>');
    printWindow.document.write('<p>IPS Corazón de Arte Terapia</p></footer>');
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
});

function updatePatientList() {
    patientList.innerHTML = '';
    patients.forEach((patient, index) => {
        const row = patientList.insertRow();
        row.insertCell(0).textContent = patient.id;
        row.insertCell(1).textContent = patient.fullName;
        row.insertCell(2).textContent = patient.age;
        row.insertCell(3).textContent = patient.entryDate;
        row.insertCell(4).textContent = patient.observations;
        row.insertCell(5).textContent = patient.documentName;

        const actionsCell = row.insertCell(6);
        const editButton = document.createElement('button');
        editButton.textContent = 'Editar';
        editButton.classList.add('edit');
        editButton.addEventListener('click', () => {
            document.getElementById('patientId').value = patient.id;
            document.getElementById('fullName').value = patient.fullName;
            document.getElementById('age').value = patient.age;
            document.getElementById('entryDate').value = patient.entryDate;
            document.getElementById('observations').value = patient.observations;
            editIndex.value = index;
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.classList.add('delete');
        deleteButton.addEventListener('click', () => {
            patients.splice(index, 1);
            updatePatientList();
        });

        actionsCell.appendChild(editButton);
        actionsCell.appendChild(deleteButton);
    });
}

