using Microsoft.VisualStudio.TestTools.UnitTesting;
using ProjectManager.Controllers;
using ProjectManager.Data.Models.Custom;
using System;
using System.Web.Script.Serialization;

namespace ProjectManager.Tests
{
    [TestClass]
    public class TestProject
    {
        #region Task
        TaskController taskController;

        [TestMethod]
        public void GetAllTask()
        {
            taskController = new TaskController();
            var result = taskController.GetAllTask();
            Assert.IsTrue(result.Count > 0);
        }
        [TestMethod]

        public void GetParentTask()
        {
            taskController = new TaskController();
            var result = taskController.GetParentTask();
            Assert.IsTrue(result != null);
        }

        [TestMethod]
        public void AddTask()
        {
            taskController = new TaskController();
            TaskModel addTask = new TaskModel();
            addTask.Task = "Task New";
            addTask.StartDate = DateTime.Now;
            addTask.EndDate = DateTime.Now;
            addTask.Priority = 15;
            addTask.ParentId = 3;
            addTask.ProjectId = 2;
            JavaScriptSerializer objJavascript = new JavaScriptSerializer();
            var testModels = objJavascript.Serialize(addTask);
            var isAdded = taskController.AddorUpdateTask(testModels);
            Assert.AreEqual("ADD", isAdded);
        }

        [TestMethod]
        public void UpdateTask()
        {
            taskController = new TaskController();
            TaskModel updateTask = new TaskModel();
            updateTask.TaskId = 5;
            updateTask.Task = "Task from Test";
            updateTask.StartDate = DateTime.Now;
            updateTask.EndDate = DateTime.Now;
            updateTask.Priority = 30;
            updateTask.ParentId = 2;
            updateTask.ProjectId = 2;
            JavaScriptSerializer objJavascript = new JavaScriptSerializer();
            var testModels = objJavascript.Serialize(updateTask);
            var isUpdated = taskController.AddorUpdateTask(testModels);
            Assert.AreEqual("UPDATE", isUpdated);
        }

        [TestMethod]
        public void EndTask()
        {
            taskController = new TaskController();
            TaskModel endTask = new TaskModel();
            endTask.TaskId = 5;
            endTask.Task = "Task from Test";
            endTask.StartDate = DateTime.Now;
            endTask.EndDate = DateTime.Now;
            endTask.Priority = 30;
            endTask.ParentId = 2;
            endTask.ProjectId = 2;
            JavaScriptSerializer objJavascript = new JavaScriptSerializer();
            var testModels = objJavascript.Serialize(endTask);
            var isSuccess = taskController.EndTask(testModels);
            Assert.AreEqual(true, isSuccess);
        }
        #endregion

        #region User
        UserController userController;

        [TestMethod]
        public void GetActiveUserList()
        {
            userController = new UserController();
            var result = userController.GetActiveUserList();
            Assert.IsTrue(result.Count > 0);
        }

        [TestMethod]
        public void AddOrUpdateUser()
        {
            userController = new UserController();
            UserModel user = new UserModel();
            user.FirstName = "Test FName";
            user.LastName = "Test LName";
            user.EmployeeId = "EMP0004";
            JavaScriptSerializer objJavascript = new JavaScriptSerializer();
            var testModels = objJavascript.Serialize(user);
            var isAdded = userController.AddOrUpdateUser(testModels);
            Assert.AreEqual("ADD", isAdded);
        }

        [TestMethod]
        public void DeleteUser()
        {
            userController = new UserController();
            UserModel user = new UserModel();
            user.FirstName = "Test FName";
            user.LastName = "Test LName";
            user.EmployeeId = "EMP0001";
            user.UserId = 1;
            JavaScriptSerializer objJavascript = new JavaScriptSerializer();
            var testModels = objJavascript.Serialize(user);
            var isSuccess = userController.DeleteUser(testModels);
            Assert.AreEqual(true, isSuccess);
        }
        #endregion

        #region Project
        ProjectController projectController;

        [TestMethod]
        public void GetAllProject()
        {
            projectController = new ProjectController();
            var result = projectController.GetAllProject();
            Assert.IsTrue(result.Count > 0);
        }

        [TestMethod]
        public void AddOrUpdateProject()
        {
            projectController = new ProjectController();
            ProjectModel project = new ProjectModel();
            project.Project = "PROJECT TEST 2";
            project.StartDate = DateTime.Now;
            project.EndDate = DateTime.Now.AddMonths(2);
            project.Priority = 25;
            JavaScriptSerializer objJavascript = new JavaScriptSerializer();
            var testModels = objJavascript.Serialize(project);
            var isAdded = projectController.AddOrUpdateProject(testModels);
            Assert.AreEqual("ADD", isAdded);
        }

        [TestMethod]
        public void SuspendProject()
        {
            projectController = new ProjectController();
            ProjectModel project = new ProjectModel();
            project.Project = "PROJECT TEST";
            project.StartDate = DateTime.Now;
            project.EndDate = DateTime.Now.AddMonths(2);
            project.Priority = 25;
            project.ProjectId = 1002;
            JavaScriptSerializer objJavascript = new JavaScriptSerializer();
            var testModels = objJavascript.Serialize(project);
            var isSuccess = projectController.SuspendProject(testModels);
            Assert.AreEqual(true, isSuccess);
        }
        #endregion
    }
}
