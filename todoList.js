// todoList.js

const todoList = () => {
    let all = [];
    const add = (todoItem) => {
      all.push(todoItem);
    };
    const markAsComplete = (index) => {
      all[index].completed = true;
    };
    const overdue = () => {
      return all.filter((item) => !item.completed && new Date(item.dueDate) < new Date());
    };
    const dueToday = () => {
      return all.filter((item) => !item.completed && new Date(item.dueDate).toDateString() === new Date().toDateString());
    };
    const dueLater = () => {
      return all.filter((item) => !item.completed && new Date(item.dueDate) > new Date());
    };
    const toDisplayableList = (list) => {
      return list
        .map((item) => {
          const checkbox = item.completed ? '[x]' : '[ ]';
          const title = item.title;
          const date = new Date(item.dueDate);
          const formattedDate = date.toDateString() === new Date().toDateString() ? '' : ` ${date.toISOString().split('T')[0]}`;
          return `${checkbox} ${title}${formattedDate}`;
        })
        .join('\n');
    };
    return { all, add, markAsComplete, overdue, dueToday, dueLater, toDisplayableList };
  };
  
  // Tests for Todo Application
  
  if (typeof describe === 'function') {
    const { test, expect, beforeEach } = require('jest');
  
    describe('Todo Application Tests', () => {
      let todos;
  
      beforeEach(() => {
        todos = todoList();
      });
  
      test('creates a new todo', () => {
        todos.add({ title: 'Test Todo', dueDate: '2023-12-27', completed: false });
        expect(todos.all.length).toBe(1);
      });
  
      test('marks a todo as completed', () => {
        todos.add({ title: 'Test Todo', dueDate: '2023-12-27', completed: false });
        todos.markAsComplete(0);
        expect(todos.all[0].completed).toBe(true);
      });
  
      test('retrieves overdue items', () => {
        todos.add({ title: 'Overdue Todo', dueDate: '2023-01-01', completed: false });
        const overdueItems = todos.overdue();
        expect(overdueItems.length).toBe(1);
      });
  
      test('retrieves due today items', () => {
        todos.add({ title: 'Due Today Todo', dueDate: '2023-12-27', completed: false });
        const dueTodayItems = todos.dueToday();
        expect(dueTodayItems.length).toBe(1);
      });
  
      test('retrieves due later items', () => {
        todos.add({ title: 'Due Later Todo', dueDate: '2023-12-28', completed: false });
        const dueLaterItems = todos.dueLater();
        expect(dueLaterItems.length).toBe(1);
      });
    });
  }
  // Assuming the rest of your todoList definition and tests are above this...

if (typeof describe !== 'function') {
  const todos = todoList();

  // Example usage of the todoList
  todos.add({ title: 'Submit assignment', dueDate: '2023-12-26', completed: false });
  todos.add({ title: 'Pay rent', dueDate: '2023-12-27', completed: true });
  todos.add({ title: 'Service Vehicle', dueDate: '2023-12-30', completed: false });

  console.log("All Todos:");
  console.log(todos.toDisplayableList(todos.all));

  console.log("\nOverdue:");
  console.log(todos.toDisplayableList(todos.overdue()));

  console.log("\nDue Today:");
  console.log(todos.toDisplayableList(todos.dueToday()));

  console.log("\nDue Later:");
  console.log(todos.toDisplayableList(todos.dueLater()));
}

// This part ensures that the code only runs when not in a testing environment.

  
  module.exports = { todoList };
  