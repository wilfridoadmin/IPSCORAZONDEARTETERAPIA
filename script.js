document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const panelControl = document.getElementById('panelControl');
    const loginContainer = document.getElementById('login');
    const logoutButton = document.getElementById('logout');
    const patientList = document.getElementById('patientList').getElementsByTagName('tbody')[0];

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if ((username === 'admin' && password === '221099') || (username === 'psicologa' && password === 'michell2210')) {
            loginContainer.style.display = 'none';
            panelControl.style.display = 'block';
        } else {
            alert('Usuario o contraseña incorrectos');
        }
    });

    logoutButton.addEventListener('click', () => {
        loginContainer.style.display = 'block';
        panelControl.style.display = 'none';
        document.getElementById('username').value = '';
        document.getElementById('password').value = '';
    });

    document.getElementById('savePatient').addEventListener('click', () => {
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

        const row = patientList.insertRow();
        row.insertCell(0).textContent = id;
        row.insertCell(1).textContent = fullName;
        row.insertCell(2).textContent = age;
        row.insertCell(3).textContent = entryDate;
        row.insertCell(4).textContent = observations;
        row.insertCell(5).textContent = documentInput.files[0] ? documentInput.files[0].name : '';

        document.getElementById('patientForm').reset();
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

        let printWindow = window.open('', '', 'height=600,width=800');
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
            printWindow.document.write('<tr><th>Documento</th><td>' + documentInput.files[0].name + '</td></tr>');
        }
        printWindow.document.write('</table>');
        printWindow.document.write('<footer><p>Atendido por: ' + document.getElementById('username').value + '</p>');
        printWindow.document.write('<p>IPS Corazón de Arte Terapia</p></footer>');
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
    });
});
