const express = require("express");

const app = express();
const PORT = 3000;

// Middleware untuk membaca JSON
app.use(express.json());

// Penyimpanan data sementara tanpa database
let todos = [
{
id: 1,
title: "Belajar Node.js",
completed: false
},
{
id: 2,
title: "Membuat RESTful API",
completed: false
}
];

// Membuat ID otomatis
let nextId = 3;

// 1. GET: Mengambil semua todo
app.get("/api/todos", (req, res) => {
res.status(200).json({
message: "Berhasil mengambil semua todo",
data: todos
});
});

// 2. GET: Mengambil todo berdasarkan ID
app.get("/api/todos/:id", (req, res) => {
const id = Number(req.params.id);


const todo = todos.find(item => item.id === id);

if (!todo) {
    return res.status(404).json({
        message: "Todo tidak ditemukan"
    });
}

res.status(200).json({
    message: "Berhasil mengambil todo",
    data: todo
});


});

// 3. POST: Menambahkan todo baru
app.post("/api/todos", (req, res) => {
const { title } = req.body;


if (typeof title !== "string" || !title.trim()) {
    return res.status(400).json({
        message: "Title wajib diisi dan harus berupa teks"
    });
}

const newTodo = {
    id: nextId++,
    title: title.trim(),
    completed: false
};

todos.push(newTodo);

res.status(201).json({
    message: "Todo berhasil ditambahkan",
    data: newTodo
});


});

// 4. PUT: Memperbarui todo berdasarkan ID
app.put("/api/todos/:id", (req, res) => {
const id = Number(req.params.id);


const todo = todos.find(item => item.id === id);

if (!todo) {
    return res.status(404).json({
        message: "Todo tidak ditemukan"
    });
}

const { title, completed } = req.body;

if (typeof title !== "string" || !title.trim()) {
    return res.status(400).json({
        message: "Title wajib diisi dan harus berupa teks"
    });
}

if (typeof completed !== "boolean") {
    return res.status(400).json({
        message: "Completed wajib berupa boolean"
    });
}

todo.title = title.trim();
todo.completed = completed;

res.status(200).json({
    message: "Todo berhasil diperbarui",
    data: todo
});


});

// 5. PATCH: Mengubah sebagian data todo
app.patch("/api/todos/:id", (req, res) => {
const id = Number(req.params.id);


const todo = todos.find(item => item.id === id);

if (!todo) {
    return res.status(404).json({
        message: "Todo tidak ditemukan"
    });
}

const { title, completed } = req.body;

if (title !== undefined) {
    if (typeof title !== "string" || !title.trim()) {
        return res.status(400).json({
            message: "Title harus berupa teks yang tidak kosong"
        });
    }

    todo.title = title.trim();
}

if (completed !== undefined) {
    if (typeof completed !== "boolean") {
        return res.status(400).json({
            message: "Completed harus berupa boolean"
        });
    }

    todo.completed = completed;
}

res.status(200).json({
    message: "Todo berhasil diperbarui",
    data: todo
});


});

// 6. DELETE: Menghapus todo berdasarkan ID
app.delete("/api/todos/:id", (req, res) => {
const id = Number(req.params.id);

const index = todos.findIndex(item => item.id === id);

if (index === -1) {
    return res.status(404).json({
        message: "Todo tidak ditemukan"
    });
}

const deletedTodo = todos.splice(index, 1)[0];

res.status(200).json({
    message: "Todo berhasil dihapus",
    data: deletedTodo
});


});

// Route tidak ditemukan
app.use((req, res) => {
res.status(404).json({
message: "Endpoint tidak ditemukan"
});
});

// Menjalankan server
app.listen(PORT, () => {
console.log(`Server berjalan di http://localhost:${PORT}`);
});
