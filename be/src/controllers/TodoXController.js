const { Task, taskSchema } = require("../models/taskSchema");

class TodoXController {
  //[GET] /api/todox
  getAll = async (req, res) => {
    const now = new Date();
    const { filterDate = "all" } = req.query;
    let startDate = new Date();
    switch (filterDate) {
      case "today":
        startDate.setHours(0, 0, 0, 0);
        break;
      case "week":
        startDate.setDate(now.getDate() - ((now.getDay() + 6) % 7));
        startDate.setHours(0, 0, 0, 0);
        break;
      case "month":
        startDate.setDate(1);
        startDate.setHours(0, 0, 0, 0);
        break;
      case "all":
      default:
        startDate = null;
    }
    const query = startDate ? { createdAt: { $gte: startDate } } : {};

    try {
      const resQuery = await Task.aggregate([
        {
          $match: query,
        },
        {
          $facet: {
            tasks: [{ $sort: { createdAt: 1 } }],
            completeCount: [
              { $match: { status: "complete" } },
              { $count: "count" },
            ],
            activeCount: [
              { $match: { status: "active" } },
              { $count: "count" },
            ],
          },
        },
      ]);
      const tasks = resQuery[0].tasks;
      const activeCount = resQuery[0].activeCount[0]?.count || 0;
      const completeCount = resQuery[0].completeCount[0]?.count || 0;
      res.status(200).json({ tasks, activeCount, completeCount });
    } catch (error) {
      console.log("lỗi khi gọi getAll");
      res.status(500).json("không lấy được dữ liệu");
    }
  };

  //[POST] /api/todox/add
  add = async (req, res) => {
    try {
      const task = new Task(req.body);
      task.save();
      res.status(200).json("thêm thành công");
    } catch (error) {
      res.status(500).json("lỗi khi thêm");
    }
  };

  //[POST] /api/todox/:id/update
  update = async (req, res) => {
    const id = req.params.id;
    try {
      await Task.findOneAndUpdate({ _id: id }, req.body);
      res.status(200).json("sửa thành công");
    } catch (error) {
      res.status(500).json("lỗi update: ");
    }
  };

  //[POST] /api/todox/:id/delete
  delete = async (req, res) => {
    const id = req.params.id;
    try {
      await Task.deleteOne({ _id: id });
      res.status(200).json("xóa thành công");
    } catch (error) {
      res.status(500).json("lỗi xóa");
    }
  };
}

module.exports = new TodoXController();
