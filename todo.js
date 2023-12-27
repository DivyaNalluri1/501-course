const todoList = () => {
    all =[];
    const add = (todoItem) => {
        all.push(todoItem);
    }
    const markAsComplete = (index) => {
        all[index].completed = true;
    }
    const overdue = () => {
        return all.filter(item => !item.completed && new Date(item.dueDate) < new Date());
    }
    const dueToday = () => {
        return all.filter(item => !item.completed && new Date(item.dueDate).toDateString() === new Date().toDateString());
    }
    const dueLater = () => {
        return all.filter(item => !item.completed && new Date(item.dueDate) > new Date());
    }
    const toDisplayableList = (list) => {
        return list.map(item => {
            const checkbox = item.completed ? '[x]' : '[ ]';
            const title = item.title;
            const date = new Date(item.dueDate);
            const formattedDate = date.toDateString() === new Date().toDateString() ? '' : ` ${date.toISOString().split('T')[0]}`;
            return `${checkbox} ${title}${formattedDate}`;
        }).join('\n');
    }
    return {all, add, markAsComplete, overdue, dueToday, dueLater, toDisplayableList};
}

const todos = todoList();
const formattedDate = d => {
    return d.toISOString().split('T')[0];
}
const dateToday = new Date();
const today = formattedDate(dateToday);
const tomorrow = formattedDate(new Date(dateToday.setDate(dateToday.getDate() + 1)));
const yesterday = formattedDate(new Date(new Date().setDate(dateToday.getDate() - 1)));

todos.add({title: 'Submit assignment', dueDate: yesterday, completed: false});
todos.add({title: 'Pay rent', dueDate: today, completed: true});
todos.add({title: 'Service Vehicle', dueDate: today, completed: false});
todos.add({title: 'File taxes', dueDate: tomorrow, completed: false});
todos.add({title: 'Pay electric bill', dueDate: tomorrow, completed: false});

// Printing is done outside of the code, as per the instructions
console.log("My Todo-list\n\n");

console.log("Overdue");
var overdues = todos.overdue();
var formattedOverdues = todos.toDisplayableList(overdues);
console.log(formattedOverdues);
console.log("\n\n");

console.log("Due Today");
var itemsDueToday = todos.dueToday();
var formattedItemsdueToday = todos.toDisplayableList(itemsDueToday);
console.log(formattedItemsdueToday);
console.log("\n\n");

console.log("Due Later");
var itemsDueLater = todos.dueLater();
var formattedItemsdueLater = todos.toDisplayableList(itemsDueLater);
console.log(formattedItemsdueLater);
console.log("\n\n");
