//seleção de elementos do DOM
const taskForm = document.getElementById('todo-form');
const taskContainer = document.getElementById('task-container');
const filterCategory = document.getElementById('filter-category');
const sortPriorityBtn = document.getElementById('sort-priority');

//array para armazenar as tarefas(objetos)
let tasks = [];

//1.função para adicionar tarefa
taskForm.addEventListener('submit', (e) => {
    e.preventDefault(); //impede o carregamento da página

    //captura dos valores
    const newTask = {
        id: Date.now(),
        name: document.getElementById('task-name').value,
        category: document.getElementById('task-category').value,
        priority: document.getElementById('task-priority').value,
        date: document.getElementById('task-date').value,
        completed: false
    };

    tasks.push(newTask);
    taskForm.reset(); //limpa o formulário
    renderTasks(); //atualiza a tela
});

//2.função para renderizar as tarefas na tela
function renderTasks(filteredTasks = tasks){
    taskContainer.innerHTML = ''; //limpa a lista antes de redesenhar

    //mensagem de lista vazia(bônus)
    if (filteredTasks.length === 0){
        taskContainer.innerHTML = '<p style="text-align:center; padding-top:20px;">Nenhuma tarefa encontrada.</p>';
        return;
    }

    filteredTasks.forEach(task => {
        const taskCard = document.createElement('div');

        //aplica a classe de prioridade para a cor lateral
        const priorityClass = `priority-${task.priority.toLowerCase()}`;

        taskCard.className = `task-card ${priorityClass} ${task.completed ? 'completed' : ''}`;

        taskCard.innerHTML = `
            <div>
                <strong>${task.name}</strong> [${task.category}]<br>
                <small>Prazo: ${task.date}</small>
            </div>
            <div>
            <button onclick="toggleTask(${task.id})">✔️</button>
            <button onclick="deleteTask(${task.id})">🗑️</button>
            </div>
        `;
        taskContainer.appendChild(taskCard);
    });
}

//3.marcar como concluída
function toggleTask(id){
    tasks = tasks.map(task =>
        task.id ===id ? {...task, completed: !task.completed} : task
    );
    renderTasks();
}

//4.excluir tarefa
function deleteTask(id){
    tasks = tasks.filter(task => task.id !== id);
    renderTasks();
}

//5.filtro por categoria
filterCategory.addEventListener('change', (e) =>{
    const selected = e.target.value; //pegando o valor do select do HTML
    if (selected === 'Todos') {
        renderTasks(); //passa a lista original coompleta
    } else {
        const filtered = tasks.filter(t => t.category === selected);
        renderTasks(filtered); //passa apenas as tarefas filtradas
    }
});

//6.ordenação por prioridade(bônus/requisito)
sortPriorityBtn.addEventListener('click', () => {
    const order = {'Alta': 1, 'Média': 2, 'Baixa': 3};
    tasks.sort((a, b) => order[a.priority] - order[b.priority]);
    renderTasks();
});
