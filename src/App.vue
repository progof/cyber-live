<script setup lang="ts">
import { ref, computed } from "vue";

type Todo = {
	title: string;
	done: boolean;
	score: number;
};

type CategoryName = "health" | "selfImprovement" | "habits";

type Category = {
	name: string;
	todos: Todo[];
};

const score = computed(() => {
	return Object.values(categories.value).reduce((score, category) => {
		const categoryScore = category.todos.reduce((score, todo) => {
			if (todo.done) {
				return score + todo.score;
			}
			return score;
		}, 0);

		return score + categoryScore;
	}, 0);
});

const newTask = ref('');

const addNewTask = (categoryName: CategoryName) => {
  const newTodo: Todo = {
    title: newTask.value,
    done: false,
    score: 0.25,
  };

  categories.value[categoryName].todos.push(newTodo);
  newTask.value = ''; 
};

const level = ref(1);

const completeTask = (categoryName: CategoryName, todo: Todo) => {
  todo.done = true;
  updateLevel();
};

const undoTask = (categoryName: CategoryName, todo: Todo) => {
  todo.done = false;
  updateLevel();
};

const updateLevel = () => {
  const completedTasks = Object.values(categories.value).reduce((count, category) => {
    return count + category.todos.filter((todo) => todo.done).length;
  }, 0);

  if (completedTasks >= level.value * 20) {
    level.value += 1;
  }
};


const player = {
	firstName: "Joe",
	lastName: "Lee",
	myLevel: level,
	myScore: score
};

const categories = ref<Record<CategoryName, Category>>({
	health: {
		name: "Health",
		todos: [{ title: "Warm-up", done: false, score: 0.25 }, 
				{ title: "Push-up", done: false, score: 0.25 },
				{ title: "Squats", done: false, score: 0.25 },
				{ title: "Press", done: false, score: 0.25 },
				{ title: "Dumbbells", done: false, score: 0.25 },
				{ title: "Glass of water", done: false, score: 0.25 },
				{ title: "Meditation", done: false, score: 0.25 },
				{ title: "Go for a walk", done: false, score: 0.25 }]
	},
	habits: {
		name: "Habits",
		todos: [{ title: "Programming", done: false, score: 0.25 },
				{ title: "Learning English", done: false, score: 0.25 },
				{ title: "Reading a book", done: false, score: 0.25 }],
	},
	selfImprovement: {
		name: "Self-Improvement",
		todos: [{ title: "Project DH", done: false, score: 0.25 },
				{ title: "Project PG", done: false, score: 0.25 },
				{ title: "Stock market", done: false, score: 0.25 },
				{ title: "Crypto market", done: false, score: 0.25 }],
	},
});
</script>

<template>
	<div>
		<h1>Hi, {{ player.firstName + " " + player.lastName + " " + "👋" }}</h1>
		<h2>My score: {{ player.myScore }} 💎</h2>
	  	<h2>My level: {{ player.myLevel }} 👻</h2>
	  	<ul v-for="(category, categoryName) in categories" :key="categoryName">
			<h1>{{ category.name }}</h1>
			<ul v-for="todo in category.todos" :key="todo.title">
			<li>
				{{ todo.title }} {{ todo.done ? "✅" : "❌" }}
				<button @click="completeTask(categoryName, todo)">Done</button>
				<button @click="undoTask(categoryName, todo)">!Done</button>
			</li>
		</ul>
		<div>
		  <input v-model="newTask" placeholder="New task...">
		  <button @click="addNewTask(categoryName)">Add Task</button>
		</div>
		</ul>
	</div>
</template>
