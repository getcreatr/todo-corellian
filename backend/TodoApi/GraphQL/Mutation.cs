using Microsoft.EntityFrameworkCore;
using TodoApi.Data;
using TodoApi.Models;

namespace TodoApi.GraphQL
{
    public class Mutation
    {
        public async Task<TaskItem> CreateTask(TodoContext context, CreateTaskInput input)
        {
            var task = new TaskItem
            {
                Title = input.Title,
                Description = input.Description,
                Status = Models.TaskStatus.Pending,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            context.Tasks.Add(task);
            await context.SaveChangesAsync();
            
            return task;
        }

        public async Task<TaskItem> UpdateTaskStatus(TodoContext context, UpdateTaskStatusInput input)
        {
            var task = await context.Tasks.FindAsync(input.Id);
            if (task == null)
            {
                throw new Exception($"Task with ID {input.Id} not found.");
            }

            task.Status = input.Status;
            task.UpdatedAt = DateTime.UtcNow;
            
            await context.SaveChangesAsync();
            
            return task;
        }

        public async Task<bool> DeleteTask(TodoContext context, int id)
        {
            var task = await context.Tasks.FindAsync(id);
            if (task == null)
            {
                return false;
            }

            context.Tasks.Remove(task);
            await context.SaveChangesAsync();
            
            return true;
        }
    }

    public record CreateTaskInput(string Title, string? Description);
    public record UpdateTaskStatusInput(int Id, Models.TaskStatus Status);
}