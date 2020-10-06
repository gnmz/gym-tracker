const express = require("express");
const app = express();
const mysql = require("mysql");
const dbConfig = require("./config/dbConfig");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const cors = require("cors");
const connection = mysql.createConnection(dbConfig);
let users = [];
//GET Созданные тренировки
let createdTrainingSessions = [
  {
    id: 0,
    date: "2020-09-30",
    title: "legs",
    train: [
      {
        id: 1,
        title: "Присед",
        numberOfRepetitions: "12",
        workingWeight: "50",
        factOfRepetitions: 0,
        factWeight: 0,
      },
      {
        id: 2,
        title: "становая тяга",
        numberOfRepetitions: "12",
        workingWeight: "50",
        factOfRepetitions: 0,
        factWeight: 0,
      },
    ],
    comment: "",
    isComplited: false,
  },
  {
    id: 1,
    date: "2020-10-01",
    title: "back",
    train: [
      {
        id: 1,
        title: "становая тяга",
        numberOfRepetitions: "12",
        workingWeight: "50",
        factOfRepetitions: 0,
        factWeight: 0,
      },
      {
        id: 2,
        title: "подтягивание",
        numberOfRepetitions: "12",
        workingWeight: "0",
        factOfRepetitions: 0,
        factWeight: 0,
      },
    ],
    comment: "",
    isComplited: false,
  },
];
//GET Категории упражнений и список
let exercises = {
  exercisesList: [
    {
      exercise: "legs",
      title: "Присед со штангой",
      definition:
        "Шаг 1. Прежде чем снять штангу со стоек, взявшись за гриф чуть шире плеч, удобно и устойчиво расположите ее у себя на трапеции. Шаг 2. Сняв штангу, сделайте шаг назад и поставьте ноги немного шире плеч носками наружу. Носок и колено должны быть направлены в одну сторону.      Шаг 3. Сделайте глубокий вдох и, задержав дыхание, плавно опуститесь вниз. Спину держите прямо, ни в коем случае не прогибайтесь назад, иначе штанга может соскользнуть на шею. Опускайтесь, пока линия от верха колена к середине тазобедренного сустава не будет параллельной полу.",
    },
    {
      exercise: "legs",
      title: "Выпады с гантелями/штангой",
      definition:
        "Шаг 1. Ноги слегка расставлены. Спина прямая.Гантели находятся в руках, которые опущены по бокам. Шаг 2. Сделайте вдох и широко шагните вперед, держа туловище максимально прямым. Когда выставляемое вперед бедро примет горизонтальное положение или чуть выше, энергичным усилием верните его в исходное положение.  Шаг 3. По окончании движения сделайте выдох. Техника выполнения упражнения отличается от выпадов со штангой наличием гантелей, что смещает центр тяжести вниз и упрощает движение.",
    },
    {
      exercise: "back",
      title: "Становая тяга",
      definition:
        "Постановка ног – на ширине плеч или чуть уже. Ноги согнуты в коленях. Положение позвоночника – строго вертикальное от начальной до конечной фазы, это обеспечивает амортизацию позвонков. Руки прямые, вытянутые.",
    },
    {
      exercise: "chest",
      title: "Жим штанги лежа на скамье",
      definition:
        "Ложимся на скамью, ноги расставляем чуть в стороны, примерно на ширине плеч. Основной упор делаем на пятки, как бы пытаясь продавить ими пол, однако стопа при этом полностью прилегает к полу. Максимально сводим вместе лопатки. Поначалу такое положение может показаться неудобным, однако оно необходимо, иначе вместо наших пекторальных мышц будут работать плечи. Плотно прижимаем к скамейке голову, плечи и ягодицы. Немного прогибаемся в пояснице (действительно немного, на мост не становимся) и проверяем, чтобы гриф штанги находился над нашими глазами. Беремся узким хватом за гриф для проработки малых пекторальных мышц или широким – для проработки больших пекторальных. Удерживаем штангу над грудью на вытянутых руках. Делаем вдох и опускаем штангу вниз таким образом, чтобы она слегка коснулась груди, ориентировочно в районе сосков, затем на выдохе снова поднимаем штангу вверх.",
    },
    {
      exercise: "press",
      title: "Подъем ног в висе",
      definition:
        "Шаг 1. Ухватитесь ладонями за перекладину и повисните на ней. Шаг 2. Сделайте вдох и подтяните колени к груди на выдохе. Шаг 3. Вернитесь в исходное положение. Во время движения не раскачивайтесь.",
    },
  ],
};

//POST создание тренировки
let createTrainingSession = [
  {
    date: "",
    title: "",
    train: [
      {
        id: "",
        title: "",
        numberOfRepetitions: "",
        workingWeight: "",
        factOfRepetitions: 0,
        factWeight: 0,
      },
    ],
    comment: "",
    isComplited: false,
  },
];
// GET История выполненых тренировок
let historyTrainList = [
  {
    id: 3,
    date: "2020-09-30",
    title: "legs",
    train: [
      {
        id: 1,
        title: "Присед",
        numberOfRepetitions: "12",
        workingWeight: "50",
        factOfRepetitions: 12,
        factWeight: 50,
      },
      {
        id: 2,
        title: "становая тяга",
        numberOfRepetitions: "12",
        workingWeight: "50",
        factOfRepetitions: 10,
        factWeight: 50,
      },
    ],
    comment: "blablabla",
    isComplited: true,
  },
];
app.use(cors());
app.all("/", function (req, res, next) {
  res.set("Access-Control-Allow-Origin", "http://localhost:3000");
  next();
});
app.post("/", (req, res) => {
  const { login, password } = req.body;
  if (login === "test" && password === "123") {
    res.send;
  }
});

app.get("/main", (req, res) => {
  res.status(200).json(createdTrainingSessions);
});

//Выбор тренировки
app.get("/train/:id", (req, res) => {
  const id = +req.params.id;
  const train = createdTrainingSessions.find((item) => {
    return item.id === id;
  });
  if (train) {
    res.status(200).send(train);
  } else {
    res.status(400).send();
  }
});

app.get("/train-history", (req, res) => {
  res.status(200).json(historyTrainList);
});

app.get("/train-history/:id", (req, res) => {
  const id = +req.params.id;
  const train = historyTrainList.find((item) => {
    return item.id === id;
  });
  if (train) {
    res.status(200).send(train);
  } else {
    res.status(400).send();
  }
});
//Создание тренировки
app.post("/create-trainig-session", (req, res) => {
  const newTrain = req.body;
  const id = createdTrainingSessions.length;

  if (newTrain) {
    createdTrainingSessions.push({ ...newTrain, id: id });
    res.status(200).send(createdTrainingSessions);
  } else {
    res.status(400).send(err);
  }
});
//Вsыполнение тренировки
app.post("/train-history", (req, res) => {
  const trainIsDone = req.body;
  const id = historyTrainList.length;

  if (trainIsDone) {
    historyTrainList.push({ ...trainIsDone, id: id });
    res.status(200).send(historyTrainList);
  } else {
    res.status(400).send(err);
  }
});

app.listen(3001, () => {
  console.log("Server is running on 3001 port");
});

app.get("/categories", (req, res) => {
  connection.query("SELECT * FROM excersise_categories;", (err, data) => {
    if (!err) {
      res.status(200).send(data);
    } else {
      res.send(err);
    }
  });
});

app.get("/excersise", (req, res) => {
  let categoryId = req.query.categoryId;
  let query = `SELECT excersises.id, excersises.title, excersises.description FROM excersises JOIN excersise_categories ON excersises.category_id = excersise_categories.id
  where excersises.category_id = ${categoryId};`;
  connection.query(query, (err, data) => {
    if (!err) {
      res.status(200).json(data);
    } else {
      console.log(err);
    }
  });
});

app.get("/trains", (req, res) => {
  let type = req.query.type;
  if (type === "plan") {
    let query = `SELECT * FROM trains WHERE is_completed = "false" ; `;
    connection.query(query, (err, data) => {
      if (!err) {
        res.status(200).json(data);
      } else {
        console.log(err);
      }
    });
  } else if (type === "hist") {
    let query = `SELECT * FROM trains WHERE is_completed = "true" ; `;
    connection.query(query, (err, data) => {
      if (!err) {
        res.status(200).json(data);
      } else {
        console.log(err);
      }
    });
  }
});

app.get("/trains/:id", (req, res) => {
  let id = req.params.id;
  let query = `SELECT * FROM trains WHERE id = ${id};`;
  connection.query(query, (err, data) => {
    if (!err) {
      res.status(200).json(data);
    } else {
      console.log(err);
    }
  });
});

app.put("/trains", (req, res) => {
  let id = req.body.id;
  let is_completed = req.body.is_completed;
  let excersises = req.body.excersises;
  let comment = req.body.comment;
  let query = `UPDATE trains SET excersises = '${excersises}', is_completed = '${is_completed}', comment = '${comment}' WHERE ( id = '${id}');`;
  connection.query(query, (err, data) => {
    if (!err) {
      res.status(200).json(data);
    } else {
      console.log(err);
    }
  });
});

app.post("/trains", (req, res) => {
  let title = req.body.title;
  let date = req.body.date;
  let excersises = req.body.excersises;
  let is_completed = req.body.is_completed;
  let query = `INSERT INTO trains(title, date, excersises, is_completed ) VALUES ('${title}', '${date}', '${excersises}', '${is_completed}') ;`;
  connection.query(query, (err, data) => {
    if (!err) {
      res.status(200).json(data);
    } else {
      console.log(err);
    }
  });
});

connection.connect((err) => {
  if (!err) {
    console.log("work!");
  }
});
