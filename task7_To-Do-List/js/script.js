document.getElementById('add-task').addEventListener('click', function() {
    const taskText = document.getElementById('new-task').value;
    if (taskText.trim()) {
        const li = document.createElement('li');
        li.textContent = taskText;
        document.getElementById('task-list').appendChild(li);
        document.getElementById('new-task').value = '';
        addDragAndDropHandlers(li);
    }
});

function addDragAndDropHandlers(li) {
    li.setAttribute('draggable', true);

    li.addEventListener('dragstart', function (e) {
        e.dataTransfer.setData('text/plain', e.target.id);
        e.dataTransfer.effectAllowed = 'move';
    });

    li.addEventListener('dragover', function (e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    });

    li.addEventListener('drop', function (e) {
        e.preventDefault();
        const draggedId = e.dataTransfer.getData('text/plain');
        const draggedElement = document.getElementById(draggedId);
        const list = e.target.parentNode;
        const elementsArray = Array.from(list.children);
        const droppedIndex = elementsArray.indexOf(e.target);
        list.insertBefore(draggedElement, list.children[droppedIndex]);
    });

    li.addEventListener('dragend', function () {
        li.style.opacity = '1';
    });
}

document.querySelectorAll('#task-list li').forEach(addDragAndDropHandlers);
