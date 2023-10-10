function updateCounterAndSave() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    let completedTasks = 0;
    let gold = 0; // Rewards gold

    checkboxes.forEach(function(checkbox) {
        if (checkbox.checked) {
            completedTasks++;
            gold += 0.25;
        }
    });

    document.getElementById('point-task').textContent = completedTasks;
    document.getElementById('gold-info').textContent = gold;  // Rewards gold
    // Сохраняем значение счетчика и состояния checkbox в localStorage
    const tasksState = [];
    checkboxes.forEach(function(checkbox) {
        tasksState.push(checkbox.checked);
    });
    localStorage.setItem('taskCounter', completedTasks);
    localStorage.setItem('goldRewards', gold);
    localStorage.setItem('tasksState', JSON.stringify(tasksState));
}

function resetTasks() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(function(checkbox) {
        // Снимаем галочку с checkbox
        checkbox.checked = false;
    });

    // Обнуляем счетчик
    document.getElementById('point-task').textContent = 0;
    // Удаляем значения из localStorage
    localStorage.removeItem('taskCounter');
    localStorage.removeItem('tasksState');
}

// При загрузке страницы восстанавливаем значение счетчика и состояния checkbox из localStorage, если они есть
const savedCounter = localStorage.getItem('taskCounter');
if (savedCounter !== null) {
    document.getElementById('point-task').textContent = savedCounter;
}

const savedGold = localStorage.getItem('goldRewards');
if (savedGold !== null) {
    document.getElementById('gold-info').textContent = savedGold;
}

const savedTasksState = localStorage.getItem('tasksState');
if (savedTasksState !== null) {
    const tasksState = JSON.parse(savedTasksState);
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(function(checkbox, index) {
        checkbox.checked = tasksState[index];
    });
}